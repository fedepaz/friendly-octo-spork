// apps/backend/test/integration/transactions/transactions.create.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Transactions Create (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;
  let accountId: string;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    const accountRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Tx Account', type: 'BANK', currency: 'ARS' });
    accountId = accountRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new transaction', async () => {
    const response = await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
        amount: 1500,
        date: new Date().toISOString(),
        description: 'Test expense',
        sourceAccountId: accountId,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.type).toBe('EXPENSE');
    expect(response.body.amount).toBeDefined();
  });

  it('should reject unauthenticated request', async () => {
    await request(app.getHttpServer())
      .post('/transactions')
      .send({
        type: 'EXPENSE',
        amount: 100,
        date: new Date().toISOString(),
      })
      .expect(401);
  });
});
