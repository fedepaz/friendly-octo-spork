// apps/backend/test/integration/dashboard/dashboard.summary.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Dashboard Summary (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return budget summary', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard/budget')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return recent accounts', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard/recentAccounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return income-expense data', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard/income-expense/6')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return recurrences to pay', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard/toPay')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should reject unauthenticated request', async () => {
    await request(app.getHttpServer()).get('/dashboard/budget').expect(401);
  });
});
