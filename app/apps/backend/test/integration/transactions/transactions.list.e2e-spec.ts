// apps/backend/test/integration/transactions/transactions.list.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Transactions List (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    const accountRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'List Account', type: 'BANK', currency: 'ARS' });
    const accountId = accountRes.body.id;

    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
        amount: 500,
        date: new Date().toISOString(),
        description: 'List tx 1',
        sourceAccountId: accountId,
      });

    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'INCOME',
        amount: 1000,
        date: new Date().toISOString(),
        description: 'List tx 2',
        targetAccountId: accountId,
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return paginated transactions', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions?page=1&limit=10')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThanOrEqual(2);
  });

  it('should return transactions by month', async () => {
    const now = new Date();
    const response = await request(app.getHttpServer())
      .get(`/transactions/month/${now.getMonth() + 1}/${now.getFullYear()}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  it('should reject unauthenticated request', async () => {
    await request(app.getHttpServer()).get('/transactions').expect(401);
  });
});
