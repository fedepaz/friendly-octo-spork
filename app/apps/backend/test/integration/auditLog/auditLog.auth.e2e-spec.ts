// apps/backend/test/integration/auditLog/auditLog.auth.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { prisma } from '../setup';

async function waitForCount(
  read: () => Promise<number>,
  min: number,
  timeoutMs = 3000,
): Promise<number> {
  const deadline = Date.now() + timeoutMs;
  let last = await read();
  while (last < min && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    last = await read();
  }
  return last;
}

describe('AuditLog auth events (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('persists register and login to the audit trail', async () => {
    const before = await prisma.auditLog.count();

    const ts = Date.now().toString().slice(-6);
    const user = {
      name: `Ausr${ts}`,
      email: `a_${ts}@test.com`,
      password: 'Testpass1',
    };

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(200);
    const afterRegister = await waitForCount(
      () => prisma.auditLog.count(),
      before + 1,
    );
    expect(afterRegister).toBeGreaterThanOrEqual(before + 1);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ name: user.name, password: user.password })
      .expect(200);
    const afterLogin = await waitForCount(
      () => prisma.auditLog.count(),
      afterRegister + 1,
    );
    expect(afterLogin).toBeGreaterThanOrEqual(afterRegister + 1);
  });

  it('lists auth entries in GET /audit-logs', async () => {
    const response = await request(app.getHttpServer())
      .get('/audit-logs')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    const endpoints = response.body.map(
      (entry: { endpoint: string | null }) => entry.endpoint,
    );
    expect(endpoints).toContain('/auth/login');
    expect(endpoints).toContain('/auth/register');
  });
});
