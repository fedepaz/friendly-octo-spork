// apps/backend/test/integration/auditLog/auditLog.month.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { prisma } from '../setup';

describe('AuditLog month & filters (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;
  let novCreateId: string;
  let novDeleteId: string;
  let decUpdateId: string;
  let decSystemId: string;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    const base = { userId: auth.userId, durationMs: 10, changes: {} };

    novCreateId = (
      await prisma.auditLog.create({
        data: {
          ...base,
          action: 'CREATE',
          entityType: 'Account',
          endpoint: '/test/nov-create',
          method: 'POST',
          createdAt: new Date('2026-11-05T10:00:00.000Z'),
        },
      })
    ).id;

    novDeleteId = (
      await prisma.auditLog.create({
        data: {
          ...base,
          action: 'DELETE',
          entityType: 'Card',
          endpoint: '/test/nov-delete',
          method: 'DELETE',
          createdAt: new Date('2026-11-20T10:00:00.000Z'),
        },
      })
    ).id;

    decUpdateId = (
      await prisma.auditLog.create({
        data: {
          ...base,
          action: 'UPDATE',
          entityType: 'Account',
          endpoint: '/test/dec-update',
          method: 'PATCH',
          createdAt: new Date('2026-12-05T10:00:00.000Z'),
        },
      })
    ).id;

    // System entry (userId null) in December — must respect the month filter too
    decSystemId = (
      await prisma.auditLog.create({
        data: {
          userId: null,
          action: 'CREATE',
          entityType: 'Auth',
          endpoint: '/test/dec-system',
          method: 'POST',
          createdAt: new Date('2026-12-10T10:00:00.000Z'),
        },
      })
    ).id;
  });

  afterAll(async () => {
    await app.close();
  });

  const list = (query: string) =>
    request(app.getHttpServer())
      .get(`/audit-logs${query}`)
      .set('Authorization', `Bearer ${auth.accessToken}`);

  const endpointsOf = (body: { endpoint: string | null }[]) =>
    body.map((entry) => entry.endpoint);

  it('scopes rows to the requested month', async () => {
    const nov = await list('?month=11&year=2026').expect(200);
    const novEndpoints = endpointsOf(nov.body);
    expect(novEndpoints).toContain('/test/nov-create');
    expect(novEndpoints).toContain('/test/nov-delete');
    expect(novEndpoints).not.toContain('/test/dec-update');
    expect(novEndpoints).not.toContain('/test/dec-system');

    const dec = await list('?month=12&year=2026').expect(200);
    const decEndpoints = endpointsOf(dec.body);
    expect(decEndpoints).toContain('/test/dec-update');
    expect(decEndpoints).toContain('/test/dec-system');
    expect(decEndpoints).not.toContain('/test/nov-create');
    expect(decEndpoints).not.toContain('/test/nov-delete');
  });

  it('returns all rows when no month is given (back-compat)', async () => {
    const all = await list('').expect(200);
    const endpoints = endpointsOf(all.body);
    expect(endpoints).toContain('/test/nov-create');
    expect(endpoints).toContain('/test/dec-update');
    expect(endpoints).toContain('/test/dec-system');
  });

  it('filters by action', async () => {
    const deleted = await list('?month=11&year=2026&action=DELETE').expect(200);
    const endpoints = endpointsOf(deleted.body);
    expect(endpoints).toContain('/test/nov-delete');
    expect(endpoints).not.toContain('/test/nov-create');
    expect(endpoints).not.toContain('/test/dec-update');
  });

  it('filters by entityType', async () => {
    const cards = await list('?month=11&year=2026&entityType=Card').expect(200);
    const endpoints = endpointsOf(cards.body);
    expect(endpoints).toContain('/test/nov-delete');
    expect(endpoints).not.toContain('/test/nov-create');
  });

  it('rejects an out-of-range month', async () => {
    await list('?month=13&year=2026').expect(400);
    await list('?month=0&year=2026').expect(400);
  });

  it('still attaches the user relation on filtered rows', async () => {
    const nov = await list('?month=11&year=2026').expect(200);
    const owned = nov.body.find(
      (entry: { id: string }) => entry.id === novCreateId,
    );
    expect(owned.user?.name).toBe(auth.userName);
    // ensure the other controlled ids exist so the query is meaningful
    expect(owned).toBeDefined();
    expect([novDeleteId, decUpdateId, decSystemId].length).toBe(3);
  });
});
