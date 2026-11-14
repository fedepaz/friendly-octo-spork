// apps/backend/test/integration/cards/cards.close.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

const STATEMENT_YEAR = 2026;
const STATEMENT_MONTH = 12; // one-timers window = November 2026
const EXPENSE_DATE = '2026-11-15T12:00:00.000Z';
const AMOUNT = 500;

describe('Cards Close (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;
  let cardAccountId: string;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    const accountRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Visa Close Test', type: 'CARD', currency: 'ARS' });
    cardAccountId = accountRes.body.id;

    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
        amount: AMOUNT,
        date: EXPENSE_DATE,
        description: 'Pending card purchase',
        sourceAccountId: cardAccountId,
        isCardExpense: true,
        cardType: 'VISA',
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });

  it('settles the paid one-timer in both statements after close', async () => {
    // Baseline: both statements show the pending one-timer as owed
    const payBefore = await request(app.getHttpServer())
      .get(`/cards/close/${STATEMENT_YEAR}/${STATEMENT_MONTH}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);
    expect(payBefore.body.summary.totalOneTimers).toBe(String(AMOUNT));

    const monthBefore = await request(app.getHttpServer())
      .get(`/cards/month/${STATEMENT_YEAR}/${STATEMENT_MONTH}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);
    expect(monthBefore.body.summary.totalOneTimers).toBe(String(AMOUNT));

    // Pay via the card-close flow
    const close = await request(app.getHttpServer())
      .post('/cards/close')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        cardAccountId,
        year: STATEMENT_YEAR,
        month: STATEMENT_MONTH,
        recurrencesTransactions: [],
      })
      .expect(200);
    expect(close.body.success).toBe(true);
    expect(close.body.closeBalance).toBe('-500');

    // Issue #61: the payment must be reflected in BOTH statements
    const payAfter = await request(app.getHttpServer())
      .get(`/cards/close/${STATEMENT_YEAR}/${STATEMENT_MONTH}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);
    expect(payAfter.body.summary.totalOneTimers).toBe('0');
    expect(payAfter.body.oneTimers).toHaveLength(0);

    const monthAfter = await request(app.getHttpServer())
      .get(`/cards/month/${STATEMENT_YEAR}/${STATEMENT_MONTH}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);
    expect(monthAfter.body.summary.totalOneTimers).toBe('0');
    expect(monthAfter.body.oneTimers).toHaveLength(0);
  });
});
