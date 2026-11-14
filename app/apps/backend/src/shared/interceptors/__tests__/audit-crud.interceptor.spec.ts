import { CallHandler, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { AuditCrudInterceptor } from '../audit-crud.interceptor';

describe('AuditCrudInterceptor', () => {
  async function captureAuditChanges(
    body: Record<string, unknown> | undefined,
    query: Record<string, unknown> = {},
    params: Record<string, unknown> = {},
  ): Promise<Record<string, unknown>> {
    const captured: { changes?: Record<string, unknown> } = {};
    const prismaStub = {
      auditLog: {
        create: (args: { data: { changes: Record<string, unknown> } }) => {
          captured.changes = args.data.changes;
          return Promise.resolve();
        },
      },
    };
    const interceptor = new AuditCrudInterceptor(
      prismaStub as unknown as PrismaService,
    );
    const request = {
      method: 'POST',
      url: '/api/profiles',
      params,
      query,
      headers: {},
      body,
    };
    const context = {
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;

    return firstValueFrom(
      interceptor.intercept(context, {
        handle: () => of({ id: 1 }),
      } as CallHandler),
    ).then(() => captured.changes as Record<string, unknown>);
  }

  it('redacts sensitive fields nested inside objects', async () => {
    // Regression test for issue #73: sanitizeBody only matched sensitive
    // keys at depth 1, so nested values like profile.password were stored
    // verbatim in the audit trail's changes JSON.
    const changes = await captureAuditChanges({
      profile: { password: 'hunter2', name: 'Ana' },
    });
    const body = changes.body as Record<string, unknown>;
    const profile = body.profile as Record<string, unknown>;

    expect(profile.password).toBe('[REDACTED]');
    expect(profile.name).toBe('Ana');
  });

  it('redacts sensitive fields inside arrays of objects', async () => {
    const changes = await captureAuditChanges({
      members: [{ token: 't' }, { name: 'a' }],
    });
    const body = changes.body as Record<string, unknown>;
    const members = body.members as Array<Record<string, unknown>>;

    expect(members[0].token).toBe('[REDACTED]');
    expect(members[1].name).toBe('a');
  });

  it('keeps redacting top-level sensitive fields', async () => {
    const changes = await captureAuditChanges({ password: 'x', username: 'u' });
    const body = changes.body as Record<string, unknown>;

    expect(body.password).toBe('[REDACTED]');
    expect(body.username).toBe('u');
  });

  it('leaves non-sensitive keys and primitive values untouched', async () => {
    const changes = await captureAuditChanges({
      amount: 10,
      note: 'contains the word token in prose',
      meta: { attempts: 2, apiKey: 'k' },
    });
    const body = changes.body as Record<string, unknown>;
    const meta = body.meta as Record<string, unknown>;

    expect(body.amount).toBe(10);
    expect(body.note).toBe('contains the word token in prose');
    expect(meta.attempts).toBe(2);
    expect(meta.apiKey).toBe('[REDACTED]');
  });

  it('redacts sensitive keys in the query payload', async () => {
    // Regression test for issue #82: query was persisted verbatim, so
    // secrets like ?token=... landed in the audit trail in plaintext.
    const changes = await captureAuditChanges(undefined, {
      token: 'abc',
      q: 'search',
    });
    const query = changes.query as Record<string, unknown>;

    expect(query.token).toBe('[REDACTED]');
    expect(query.q).toBe('search');
  });

  it('redacts sensitive keys in route params', async () => {
    const changes = await captureAuditChanges(
      undefined,
      {},
      { secret: 's', id: '42' },
    );
    const params = changes.params as Record<string, unknown>;

    expect(params.secret).toBe('[REDACTED]');
    expect(params.id).toBe('42');
  });

  it('redacts sensitive fields nested inside query objects', async () => {
    // Express qs parses ?credentials[password]=x into a nested object —
    // top-level-only query redaction would miss it.
    const changes = await captureAuditChanges(undefined, {
      credentials: { password: 'x', user: 'u' },
    });
    const query = changes.query as Record<string, unknown>;
    const credentials = query.credentials as Record<string, unknown>;

    expect(credentials.password).toBe('[REDACTED]');
    expect(credentials.user).toBe('u');
  });
});
