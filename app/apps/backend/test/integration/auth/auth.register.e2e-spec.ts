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
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'NewUser1',
        email: 'newuser@test.com',
        password: 'Password1',
      })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.name).toBe('NewUser1');
  });

  it('should reject duplicate username', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'DupUser1',
        email: 'first@test.com',
        password: 'Password1',
      })
      .expect(200);

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'DupUser1',
        email: 'second@test.com',
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
