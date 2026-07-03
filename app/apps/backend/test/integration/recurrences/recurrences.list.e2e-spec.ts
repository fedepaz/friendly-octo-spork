// apps/backend/test/integration/recurrences/recurrences.list.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Recurrences List (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    // Create an account to use as source
    const accountRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Rec Account', type: 'BANK', currency: 'ARS' });
    const accountId = accountRes.body.id;

    // Create a recurring transaction
    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
        amount: 5000,
        date: new Date().toISOString(),
        description: 'Monthly subscription',
        sourceAccountId: accountId,
        isRecurrence: true,
        recurrenceName: 'Netflix',
        frequency: 'MONTHLY',
        isFirstPayment: true,
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return recurrences list', async () => {
    const response = await request(app.getHttpServer())
      .get('/recurrences')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should return recurrences by month and type', async () => {
    const now = new Date();
    const response = await request(app.getHttpServer())
      .get(
        `/recurrences/month/${now.getMonth() + 1}/${now.getFullYear()}/EXPENSE`,
      )
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should reject unauthenticated request', async () => {
    await request(app.getHttpServer()).get('/recurrences').expect(401);
  });
});
