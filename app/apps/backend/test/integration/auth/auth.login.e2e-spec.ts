// apps/backend/test/integration/auth/auth.login.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin } from '../helpers';

describe('Auth Login (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should login with valid credentials', async () => {
    const user = await registerAndLogin(app);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ name: user.userName, password: 'Testpass1' })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should reject invalid password', async () => {
    await registerAndLogin(app, {
      name: `Wp${Date.now()}`,
      email: `wrongpass_${Date.now()}@test.com`,
      password: 'Correct1pass',
    });

    const user = await registerAndLogin(app);
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ name: user.userName, password: 'Wrongpass1' })
      .expect(401);
  });

  it('should reject non-existent user', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ name: 'nonexistent', password: 'password' })
      .expect(401);
  });
});
