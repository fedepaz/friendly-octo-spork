// apps/backend/test/integration/users/users.management.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { prisma } from '../setup';

describe('Users management (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;
  // unique per run — the test database persists between runs
  const ts = Date.now().toString().slice(-6);
  const secondName = `Second${ts}`;
  const secondEmail = `second_${ts}@test.com`;
  const createdName = `Created${ts}`;
  const createdEmail = `created_${ts}@test.com`;
  const dupName = `DupEmail${ts}`;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    // Mirror the seeded admin's grants for the entities under test —
    // registerAndLogin users get the default permission set (no delete,
    // users read-only), which is correct RBAC, not the bug.
    const grant = async (entityName: string) => {
      const entity = await prisma.entity.findUniqueOrThrow({
        where: { name: entityName },
      });
      await prisma.userPermission.upsert({
        where: {
          userId_entityId: { userId: auth.userId, entityId: entity.id },
        },
        update: {
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
          scope: 'ALL',
          permissionType: 'CRUD',
        },
        create: {
          userId: auth.userId,
          entityId: entity.id,
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
          scope: 'ALL',
          permissionType: 'CRUD',
        },
      });
    };

    await grant('users');

    // a second, independently registered user
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: secondName,
        email: secondEmail,
        password: 'Testpass1',
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });

  const listUsers = async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);
    return res.body as Array<{ id: string; name: string; email: string }>;
  };

  it('lists ALL active users, not only the caller', async () => {
    // #66.1: GET /users used to return [self] only — which also broke the
    // permissions user selector
    const users = await listUsers();
    expect(users.length).toBeGreaterThanOrEqual(2);
    expect(users.map((u) => u.name)).toContain(secondName);
    expect(users.map((u) => u.name)).toContain(auth.userName);
  });

  it('creates a user with default permissions', async () => {
    // #66.2: no create flow existed
    const created = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: createdName,
        email: createdEmail,
        password: 'Testpass1',
      })
      .expect(201);
    expect(created.body.name).toBe(createdName);

    const users = await listUsers();
    expect(users.map((u) => u.name)).toContain(createdName);

    // default permission grants were applied (same as self-registration)
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ name: createdName, password: 'Testpass1' })
      .expect(200);
    const perms = await request(app.getHttpServer())
      .get('/permissions/me')
      .set('Authorization', `Bearer ${login.body.accessToken}`)
      .expect(200);
    expect(Object.keys(perms.body).length).toBeGreaterThan(0);
  });

  it('rejects a duplicate email', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: dupName,
        email: createdEmail,
        password: 'Testpass1',
      })
      .expect(400);
  });

  it('soft-deletes a user without destroying the row', async () => {
    // #66.3: no soft-delete existed
    const users = await listUsers();
    const target = users.find((u) => u.name === secondName)!;

    await request(app.getHttpServer())
      .post(`/users/${target.id}/delete`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    // gone from the list
    const after = await listUsers();
    expect(after.map((u) => u.name)).not.toContain(secondName);

    // row remains, soft-deleted
    const row = await prisma.user.findUnique({ where: { id: target.id } });
    expect(row).not.toBeNull();
    expect(row!.deletedAt).not.toBeNull();
    expect(row!.deletedByUserId).toBe(auth.userId);

    // deleted user can no longer log in
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ name: secondName, password: 'Testpass1' })
      .expect(401);
  });

  it('refuses to soft-delete yourself', async () => {
    await request(app.getHttpServer())
      .post(`/users/${auth.userId}/delete`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(400);
  });

  it('returns 404 when deleting an unknown user', async () => {
    await request(app.getHttpServer())
      .post('/users/nonexistent-id/delete')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(404);
  });
});
