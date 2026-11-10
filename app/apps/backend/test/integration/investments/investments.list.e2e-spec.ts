// apps/backend/test/integration/investments/investments.list.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Investments List (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    // Create a bank account to source investment from
    const bankRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Banco Nación', type: 'BANK', currency: 'ARS' });
    const bankId = bankRes.body.id;

    // Create an INVESTMENT account
    const invRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'FCI RyC',
        type: 'INVESTMENT',
        currency: 'ARS',
        balance: '10000',
      });
    const invId = invRes.body.id;

    // Record an INVESTMENT transaction (deposit into investment)
    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'INVESTMENT',
        amount: '5000',
        date: '2026-08-15',
        description: 'Depósito en FCI',
        sourceAccountId: bankId,
        targetAccountId: invId,
      });

    // Record a RETURN transaction (earning from investment)
    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'RETURN',
        amount: '500',
        date: '2026-08-20',
        description: 'Rendimiento FCI',
        sourceAccountId: invId,
        targetAccountId: bankId,
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 401 without auth token', async () => {
    await request(app.getHttpServer()).get('/investments').expect(401);
  });

  it('should return 200 with investment accounts', async () => {
    const response = await request(app.getHttpServer())
      .get('/investments')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should return correct investment data with totalEarned', async () => {
    const response = await request(app.getHttpServer())
      .get('/investments')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    const fci = response.body.find((inv: any) => inv.name === 'FCI RyC');
    expect(fci).toBeDefined();
    expect(fci.currency).toBe('ARS');
    expect(fci.principal).toBeDefined();
    expect(fci.totalEarned).toBeDefined();
    expect(fci.totalValue).toBeDefined();
    expect(typeof fci.transactionCount).toBe('number');
    expect(fci.transactionCount).toBeGreaterThanOrEqual(1);
  });

  it('should not return other users investments', async () => {
    const otherAuth = await registerAndLogin(app);

    const response = await request(app.getHttpServer())
      .get('/investments')
      .set('Authorization', `Bearer ${otherAuth.accessToken}`)
      .expect(200);

    expect(response.body.length).toBe(0);
  });
});
