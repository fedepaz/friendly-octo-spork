// apps/backend/test/integration/investments/investments.returns.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Investments return attribution (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;
  let invId: string;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    const invRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Attribution Fund',
        type: 'INVESTMENT',
        currency: 'ARS',
        balance: '1000',
      })
      .expect(201);
    invId = invRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  const fetchInvestment = async () => {
    const res = await request(app.getHttpServer())
      .get('/investments')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);
    return (res.body as Array<Record<string, unknown>>).find(
      (inv) => inv.id === invId,
    )!;
  };

  it('reports the opening balance as principal with no earnings', async () => {
    const row = await fetchInvestment();
    expect(Number(row.principal)).toBe(1000);
    expect(Number(row.totalEarned)).toBe(0);
    expect(Number(row.totalValue)).toBe(1000);
    expect(Number(row.transactionCount)).toBe(0);
  });

  it('attributes a reinvested return to earned, not principal', async () => {
    // #65: the wizard's reinvest path credits RETURN to the investment's
    // targetAccountId — principal must not swallow it.
    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'RETURN',
        amount: '100',
        date: '2026-11-10T10:00:00.000Z',
        description: 'reinvested yield',
        targetAccountId: invId,
      })
      .expect(201);

    const row = await fetchInvestment();
    expect(Number(row.principal)).toBe(1000); // NOT 1100
    expect(Number(row.totalEarned)).toBe(100);
    expect(Number(row.transactionCount)).toBe(1);
    // total still equals the balance (1000 + 100 credited)
    expect(Number(row.totalValue)).toBe(1100);
  });

  it('still counts a cash-out return (source side)', async () => {
    const bankRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Yield Bank', type: 'BANK', currency: 'ARS' })
      .expect(201);

    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'RETURN',
        amount: '50',
        date: '2026-11-12T10:00:00.000Z',
        description: 'yield swept to bank',
        sourceAccountId: invId,
        targetAccountId: bankRes.body.id,
      })
      .expect(201);

    const row = await fetchInvestment();
    // cash-out does not credit the investment balance → principal unchanged
    expect(Number(row.principal)).toBe(1000);
    // but the earning still counts (either-side attribution)
    expect(Number(row.totalEarned)).toBe(150);
    expect(Number(row.transactionCount)).toBe(2);
  });
});
