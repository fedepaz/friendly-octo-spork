// apps/backend/test/integration/accounts/accounts.get-by-id.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Accounts Get By Id (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;
  let accountId: string;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    const response = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Get By Id Account', type: 'BANK', currency: 'ARS' });

    accountId = response.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return account by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/accounts/${accountId}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body.id).toBe(accountId);
    expect(response.body.name).toBe('Get By Id Account');
  });

  it('should return empty for non-existent account', async () => {
    const response = await request(app.getHttpServer())
      .get('/accounts/non-existent-id')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Object.keys(response.body).length).toBe(0);
  });
});
