// apps/backend/test/integration/auditLog/auditLog.list.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('AuditLog List (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return audit logs for authenticated user', async () => {
    const response = await request(app.getHttpServer())
      .get('/audit-logs')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return 401 without auth token', async () => {
    await request(app.getHttpServer()).get('/audit-logs').expect(401);
  });
});
