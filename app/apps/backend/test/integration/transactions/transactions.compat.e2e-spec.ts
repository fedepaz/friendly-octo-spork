// apps/backend/test/integration/transactions/transactions.compat.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Transactions account-type compatibility (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;
  let bankId: string;
  let cardId: string;
  let investmentId: string;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    const createAccount = async (name: string, type: string) => {
      const res = await request(app.getHttpServer())
        .post('/accounts')
        .set('Authorization', `Bearer ${auth.accessToken}`)
        .send({ name, type, currency: 'ARS' })
        .expect(201);
      return res.body.id as string;
    };

    bankId = await createAccount('Compat Bank', 'BANK');
    cardId = await createAccount('Compat Card', 'CARD');
    investmentId = await createAccount('Compat Invest', 'INVESTMENT');
  });

  afterAll(async () => {
    await app.close();
  });

  const probe = (body: Record<string, unknown>) =>
    request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        amount: 11,
        date: new Date().toISOString(),
        description: 'compat probe',
        ...body,
      });

  // ── Frontend allowed → backend rejected (#55) ──────────────────────────
  it('allows EXPENSE from an INVESTMENT source (wizard offers it)', async () => {
    await probe({ type: 'EXPENSE', sourceAccountId: investmentId }).expect(201);
  });

  it('allows PAYMENT from an INVESTMENT source (wizard offers it)', async () => {
    await probe({ type: 'PAYMENT', sourceAccountId: investmentId }).expect(201);
  });

  it('allows INCOME to an INVESTMENT target (wizard offers it)', async () => {
    await probe({ type: 'INCOME', targetAccountId: investmentId }).expect(201);
  });

  // ── Backend allowed → frontend blocks (#55) ────────────────────────────
  it('rejects TRANSFER from a CARD source (design forbids it)', async () => {
    const res = await probe({
      type: 'TRANSFER',
      sourceAccountId: cardId,
      targetAccountId: bankId,
    }).expect(400);
    expect(res.body.code).toBe('ACCOUNT_TYPE_RESTRICTION');
  });

  it('rejects INVESTMENT from a CARD source (design forbids it)', async () => {
    const res = await probe({
      type: 'INVESTMENT',
      sourceAccountId: cardId,
      targetAccountId: investmentId,
    }).expect(400);
    expect(res.body.code).toBe('ACCOUNT_TYPE_RESTRICTION');
  });

  it('rejects RETURN to a CARD target (design forbids it)', async () => {
    const res = await probe({
      type: 'RETURN',
      sourceAccountId: investmentId,
      targetAccountId: cardId,
    }).expect(400);
    expect(res.body.code).toBe('ACCOUNT_TYPE_RESTRICTION');
  });

  // ── Control: a normal transfer still works ─────────────────────────────
  it('still allows TRANSFER from BANK to BANK', async () => {
    await probe({
      type: 'TRANSFER',
      sourceAccountId: bankId,
      targetAccountId: bankId,
    }).expect(201);
  });
});
