// apps/backend/test/integration/accounts/accounts.list.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Accounts List (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    // Create some accounts
    await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Account 1', type: 'BANK', currency: 'ARS' });

    await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Account 2', type: 'WALLET', currency: 'ARS' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return user accounts', async () => {
    const response = await request(app.getHttpServer())
      .get('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  it('should not return other users accounts', async () => {
    const otherAuth = await registerAndLogin(app);

    const response = await request(app.getHttpServer())
      .get('/accounts')
      .set('Authorization', `Bearer ${otherAuth.accessToken}`)
      .expect(200);

    expect(response.body.length).toBe(0);
  });
});
