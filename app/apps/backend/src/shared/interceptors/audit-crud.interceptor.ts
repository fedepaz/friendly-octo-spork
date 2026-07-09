import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { Prisma } from '@prisma/client';

const METHOD_ACTION_MAP: Record<string, string> = {
  POST: 'CREATE',
  PUT: 'UPDATE',
  PATCH: 'UPDATE',
  DELETE: 'DELETE',
};

const SENSITIVE_FIELDS = [
  'password',
  'secret',
  'token',
  'key',
  'authorization',
  'bearer',
];

interface AuthUser {
  id?: string;
}

@Injectable()
export class AuditCrudInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: AuthUser }>();
    const method = request.method;
    const url = request.url;
    const params = request.params;
    const body = request.body as Record<string, unknown> | undefined;
    const user = request.user;

    if (method === 'GET') {
      return next.handle();
    }

    const action = METHOD_ACTION_MAP[method];
    if (!action) {
      return next.handle();
    }

    const startedAt = Date.now();

    return next.handle().pipe(
      tap({
        next: (responseBody) => {
          const durationMs = Date.now() - startedAt;
          void this.saveAuditLog({
            userId: user?.id ?? null,
            action,
            entityType: this.resolveEntityType(url),
            entityId: this.resolveEntityId(
              responseBody as Record<string, unknown> | null,
              params as Record<string, string>,
              body ?? {},
            ),
            endpoint: url,
            method,
            ipAddress: this.getClientIp(request),
            userAgent: request.headers['user-agent'],
            durationMs,
            changes: {
              endpoint: url,
              method,
              params,
              query: request.query,
              body: this.sanitizeBody(body ?? {}),
            },
          });
        },
        error: () => {
          // Errors handled by GlobalExceptionFilter
        },
      }),
    );
  }

  private resolveEntityType(url: string): string {
    const segments = url.split('/').filter(Boolean);
    const entitySegment = segments[0] === 'api' ? segments[1] : segments[0];
    if (!entitySegment) return 'UNKNOWN';
    return (
      entitySegment.charAt(0).toUpperCase() +
      entitySegment.slice(1).toLowerCase()
    );
  }

  private resolveEntityId(
    responseBody: Record<string, unknown> | null,
    params: Record<string, string>,
    body: Record<string, unknown>,
  ): string | null {
    if (
      responseBody &&
      typeof responseBody === 'object' &&
      'id' in responseBody
    ) {
      return String(responseBody.id);
    }
    if (params?.id) return params.id;
    if (body?.id != null) {
      const idValue = body.id;
      return typeof idValue === 'string' || typeof idValue === 'number'
        ? String(idValue)
        : null;
    }
    return null;
  }

  private sanitizeBody(body: Record<string, unknown>): Record<string, unknown> {
    if (!body || typeof body !== 'object') return body;
    const sanitized = { ...body };
    for (const key of Object.keys(sanitized)) {
      if (SENSITIVE_FIELDS.some((f) => key.toLowerCase().includes(f))) {
        sanitized[key] = '[REDACTED]';
      }
    }
    return sanitized;
  }

  private getClientIp(request: Request): string | null {
    const forwarded = request.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
    return request.socket?.remoteAddress ?? null;
  }

  private async saveAuditLog(data: {
    userId: string | null | undefined;
    action: string;
    entityType: string;
    entityId: string | null;
    endpoint: string;
    method: string;
    ipAddress: string | null;
    userAgent: string | undefined;
    durationMs: number;
    changes: Record<string, unknown>;
  }): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          entityType: data.entityType,
          entityId: data.entityId,
          endpoint: data.endpoint,
          method: data.method,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          durationMs: data.durationMs,
          changes: data.changes as unknown as Prisma.InputJsonValue,
        },
      });
    } catch {
      // Fire-and-forget — audit log failure should never break the app
    }
  }
}
