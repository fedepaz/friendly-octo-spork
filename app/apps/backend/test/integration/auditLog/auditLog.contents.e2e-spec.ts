// apps/backend/test/integration/auditLog/auditLog.contents.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('AuditLog entry contents (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    // An authenticated POST — produces an audit row owned by auth.userId
    await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Audit Content Account', type: 'BANK', currency: 'ARS' })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });

  it('populates the user relation on owned entries without leaking secrets', async () => {
    const response = await request(app.getHttpServer())
      .get('/audit-logs')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    const owned = response.body.find(
      (entry: { endpoint: string | null; userId: string | null }) =>
        entry.endpoint === '/accounts' && entry.userId === auth.userId,
    );
    expect(owned).toBeDefined();
    expect(owned.user).toBeDefined();
    expect(owned.user.name).toBe(auth.userName);
    expect(owned.user).not.toHaveProperty('passwordHash');
    expect(typeof owned.user.email).toBe('string');
  });

  it('returns durationMs on entries', async () => {
    const response = await request(app.getHttpServer())
      .get('/audit-logs')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    const owned = response.body.find(
      (entry: { endpoint: string | null }) => entry.endpoint === '/accounts',
    );
    expect(owned).toBeDefined();
    expect(typeof owned.durationMs).toBe('number');
    expect(owned.durationMs).toBeGreaterThanOrEqual(0);
  });
});
