// apps/backend/test/integration/dashboard/dashboard.income-expense.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Dashboard income-expense window (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;
  let bankId: string;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    const accountRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'IE Bank', type: 'BANK', currency: 'ARS' })
      .expect(201);
    bankId = accountRes.body.id;

    // income in September 2026 — inside a window ending October 2026
    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'INCOME',
        amount: 777,
        date: '2026-09-15T10:00:00.000Z',
        description: 'september income',
        targetAccountId: bankId,
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });

  const fetchIE = (query = '') =>
    request(app.getHttpServer())
      .get(`/dashboard/income-expense/6${query}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

  it('anchors the window at the requested end month', async () => {
    // #64: the window must end at endMonth/endYear so month navigation
    // can show a past period (6 months ending October = May..Oct)
    const res = await fetchIE('?endMonth=10&endYear=2026');
    const months = (res.body as Array<{ month: string }>).map((e) => e.month);
    expect(months[months.length - 1]).toBe('Oct');
    expect(months).toContain('Sep');
  });

  it('includes income from months inside the anchored window', async () => {
    const res = await fetchIE('?endMonth=10&endYear=2026');
    const sep = (res.body as Array<{ month: string; income: number }>).find(
      (e) => e.month === 'Sep',
    );
    expect(Number(sep?.income)).toBe(777);
  });

  it('defaults to the current month when no anchor is given', async () => {
    const res = await fetchIE();
    const months = (res.body as Array<{ month: string }>).map((e) => e.month);
    const currentAbbrev = new Date()
      .toLocaleString('en-US', { month: 'short' })
      .slice(0, 3);
    expect(months[months.length - 1]).toBe(currentAbbrev);
  });

  it('rejects an out-of-range endMonth', async () => {
    await request(app.getHttpServer())
      .get('/dashboard/income-expense/6?endMonth=13&endYear=2026')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(400);
  });

  it('rejects endMonth without endYear', async () => {
    await request(app.getHttpServer())
      .get('/dashboard/income-expense/6?endMonth=10')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(400);
  });
});
