import { CallHandler, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { AuditCrudInterceptor } from '../audit-crud.interceptor';

describe('AuditCrudInterceptor', () => {
  async function captureAuditChanges(
    body: Record<string, unknown> | undefined,
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
      params: {},
      query: {},
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
});
