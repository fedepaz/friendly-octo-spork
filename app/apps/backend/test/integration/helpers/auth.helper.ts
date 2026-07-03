// apps/backend/test/integration/helpers/auth.helper.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
}

export async function registerAndLogin(
  app: INestApplication,
  userData?: { name: string; password: string; email: string },
): Promise<AuthTokens> {
  const ts = Date.now().toString().slice(-6);
  const user = userData ?? {
    name: `Tusr${ts}`,
    email: `t_${ts}@test.com`,
    password: 'Testpass1',
  };

  // Register
  const registerResponse = await request(app.getHttpServer())
    .post('/auth/register')
    .send(user)
    .expect(200);

  // Login
  const loginResponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ name: user.name, password: user.password })
    .expect(200);

  return {
    accessToken: loginResponse.body.accessToken,
    refreshToken: loginResponse.body.refreshToken,
    userId: registerResponse.body.user.id,
    userName: user.name,
  };
}
