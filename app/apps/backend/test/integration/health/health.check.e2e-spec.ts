// apps/backend/test/integration/health/health.check.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin } from '../helpers';

describe('Health Check (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return health status (public)', async () => {
    const response = await request(app.getHttpServer())
      .get('/health')
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('should return auth check with valid token', async () => {
    const user = await registerAndLogin(app);

    const response = await request(app.getHttpServer())
      .get('/health/auth')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .expect(200);

    expect(response.body.status).toBe('ok');
  });

  it('should reject unauthenticated request for auth check', async () => {
    await request(app.getHttpServer()).get('/health/auth').expect(401);
  });
});
