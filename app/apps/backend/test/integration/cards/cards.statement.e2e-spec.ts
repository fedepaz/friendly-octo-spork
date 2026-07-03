// apps/backend/test/integration/cards/cards.statement.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Cards Statement (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;
  let cardAccountId: string;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    // Create a card account
    const accountRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Visa Card', type: 'CARD', currency: 'ARS' });
    cardAccountId = accountRes.body.id;

    // Create a transaction on the card (expense, card type)
    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
        amount: 2500,
        date: new Date().toISOString(),
        description: 'Card purchase',
        sourceAccountId: cardAccountId,
        isCardExpense: true,
        cardType: 'VISA',
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return card transactions', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return card statement by month', async () => {
    const now = new Date();
    const response = await request(app.getHttpServer())
      .get(`/cards/month/${now.getFullYear()}/${now.getMonth() + 1}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('recurrences');
    expect(response.body).toHaveProperty('oneTimers');
    expect(response.body).toHaveProperty('payments');
    expect(response.body).toHaveProperty('summary');
    expect(Array.isArray(response.body.recurrences)).toBe(true);
    expect(Array.isArray(response.body.oneTimers)).toBe(true);
    expect(Array.isArray(response.body.payments)).toBe(true);
    expect(response.body.summary).toHaveProperty('totalRecurrences');
    expect(response.body.summary).toHaveProperty('balance');
  });

  it('should return card close/pay statement by month', async () => {
    const now = new Date();
    const response = await request(app.getHttpServer())
      .get(`/cards/close/${now.getFullYear()}/${now.getMonth() + 1}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('recurrences');
    expect(response.body).toHaveProperty('oneTimers');
    expect(response.body).toHaveProperty('payments');
    expect(response.body).toHaveProperty('summary');
  });

  it('should return card transactions by account id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/cards/account/${cardAccountId}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('amount');
    expect(response.body.cardType).toBe('VISA');
  });

  it('should reject unauthenticated request', async () => {
    await request(app.getHttpServer()).get('/cards').expect(401);
  });
});
