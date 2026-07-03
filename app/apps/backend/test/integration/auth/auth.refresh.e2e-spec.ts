// apps/backend/test/integration/auth/auth.refresh.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin } from '../helpers';

describe('Auth Refresh (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should refresh tokens with valid refresh token', async () => {
    const user = await registerAndLogin(app);

    const response = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: user.refreshToken })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should reject invalid refresh token', async () => {
    await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: 'invalid-token' })
      .expect(401);
  });
});
