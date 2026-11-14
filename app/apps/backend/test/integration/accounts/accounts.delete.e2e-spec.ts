// apps/backend/test/integration/accounts/accounts.delete.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { prisma } from '../setup';

describe('Accounts soft-delete (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;
  let accountId: string;

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

    await grant('accounts');

    const res = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Doomed Account', type: 'BANK', currency: 'ARS' })
      .expect(201);
    accountId = res.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('soft-deletes an account: hidden from lists, row remains', async () => {
    // #52: schema columns existed but no endpoint/UI ever wrote them
    await request(app.getHttpServer())
      .post(`/accounts/${accountId}/delete`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    const list = await request(app.getHttpServer())
      .get('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);
    expect(
      (list.body as Array<{ id: string }>).some((a) => a.id === accountId),
    ).toBe(false);

    const row = await prisma.account.findUnique({ where: { id: accountId } });
    expect(row).not.toBeNull();
    expect(row!.deletedAt).not.toBeNull();
    expect(row!.deletedByUserId).toBe(auth.userId);
  });

  it('returns 404 when deleting the same account twice', async () => {
    await request(app.getHttpServer())
      .post(`/accounts/${accountId}/delete`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(404);
  });

  it('returns 404 when deleting another user’s account', async () => {
    const other = await registerAndLogin(app);
    const otherAccount = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${other.accessToken}`)
      .send({ name: 'Not Yours', type: 'CASH', currency: 'ARS' })
      .expect(201);

    await request(app.getHttpServer())
      .post(`/accounts/${otherAccount.body.id}/delete`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(404);
  });
});
