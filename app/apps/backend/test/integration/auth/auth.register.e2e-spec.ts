// apps/backend/test/integration/auth/auth.register.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from '../helpers';

describe('Auth Register (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a new user', async () => {
    const ts = Date.now().toString().slice(-6);
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: `Nusr${ts}`,
        email: `n_${ts}@test.com`,
        password: 'Password1',
      })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.name).toBe(`Nusr${ts}`);
  });

  it('should reject duplicate username', async () => {
    const ts = Date.now().toString().slice(-6);
    const name = `Dusr${ts}`;

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name,
        email: `d1_${ts}@test.com`,
        password: 'Password1',
      })
      .expect(200);

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name,
        email: `d2_${ts}@test.com`,
        password: 'Password1',
      })
      .expect(400);
  });

  it('should reject missing fields', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'incomplete',
      })
      .expect(400);
  });
});
