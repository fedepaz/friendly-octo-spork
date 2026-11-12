// apps/backend/test/integration/permissions/permissions.update.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { prisma } from '../setup';

describe('Permissions Update (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    // Registered users receive user_permissions as read-only; grant update so
    // the acting user can save (the seeded admin holds this grant in production).
    const entity = await prisma.entity.findUnique({
      where: { name: 'user_permissions' },
    });
    await prisma.userPermission.update({
      where: {
        userId_entityId: { userId: auth.userId, entityId: entity!.id },
      },
      data: { canCreate: true, canUpdate: true, scope: 'ALL' },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('keeps permissions that are not part of the submitted payload', async () => {
    const before = await request(app.getHttpServer())
      .get(`/permissions/user/${auth.userId}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    const beforeEntities = Object.keys(before.body);
    expect(beforeEntities.length).toBeGreaterThan(1);

    // The UI saves only the entities the user toggled (partial payload).
    await request(app.getHttpServer())
      .patch(`/permissions/user/${auth.userId}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        permissions: [
          {
            tableName: 'accounts',
            canCreate: false,
            canRead: true,
            canUpdate: true,
            canDelete: false,
            scope: 'OWN',
            permissionType: 'CRUD',
          },
        ],
      })
      .expect(200);

    const after = await request(app.getHttpServer())
      .get(`/permissions/user/${auth.userId}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    // Every entity granted before the save must still exist afterwards...
    expect(Object.keys(after.body)).toEqual(
      expect.arrayContaining(beforeEntities),
    );
    // ...the submitted change must be applied...
    expect(after.body.accounts.canCreate).toBe(false);
    expect(after.body.accounts.scope).toBe('OWN');
    // ...and untouched entities must keep their values.
    expect(after.body.transactions.canRead).toBe(true);
    expect(after.body.transactions.canCreate).toBe(true);
  });
});
