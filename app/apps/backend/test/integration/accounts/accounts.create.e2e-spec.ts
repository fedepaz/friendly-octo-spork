// apps/backend/test/integration/accounts/accounts.create.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';

describe('Accounts Create (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new account', async () => {
    const response = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Savings Account',
        type: 'BANK',
        currency: 'ARS',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Savings Account');
    expect(response.body.type).toBe('BANK');
    expect(response.body.currency).toBe('ARS');
  });

  it('should reject duplicate account name for same user', async () => {
    await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Dup Account',
        type: 'BANK',
        currency: 'ARS',
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Dup Account',
        type: 'WALLET',
        currency: 'ARS',
      });

    expect([400, 500]).toContain(response.status);
  });

  it('should reject unauthenticated request', async () => {
    await request(app.getHttpServer())
      .post('/accounts')
      .send({
        name: 'No Auth',
        type: 'BANK',
        currency: 'ARS',
      })
      .expect(401);
  });
});
