# appFinance SistemaDemo Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sync critical architecture, security, and quality improvements from sistemaDemo to appFinance across backend and frontend.

**Architecture:** Two independent subsystems (backend + frontend) can be worked in parallel. Backend focuses on audit logging, exception hardening, repository colocation, and permissions. Frontend focuses on query key centralization, invalidation helpers, barrel exports, component tests, and EmptyState patterns.

**Tech Stack:** NestJS 11, Prisma 7, Next.js 16, React Query, TypeScript, Zod, nestjs-pino, MSW, Jest, Vitest

## Global Constraints

- All monetary fields use `@db.Decimal(19,4)` in Prisma schema
- Single-user app (no multi-tenancy) — skip tenantId scoping everywhere
- No PATCH/DELETE/PUT endpoints — only POST and GET (soft delete via User/Account)
- Categories are seeded/read-only
- `@repo/shared` must be built before other packages can use it
- Pre-commit hook runs `pnpm lint` — fix all errors before committing
- Conventional Commits enforced by commit-msg hook
- `main` branch is protected — always work on feature branches
- Shared package: `packages/shared/` — Zod schemas, DTOs, enums
- Frontend: `apps/frontend/` — Next.js 16 App Router
- Backend: `apps/backend/` — NestJS 11

---

## Phase 1: Backend — Security & Architecture

### Task 1: Create AuditLog Prisma Model

**Files:**
- Modify: `app/apps/backend/prisma/schema.prisma`

**Interfaces:**
- Produces: `AuditLog` model used by AuditCrudInterceptor and GlobalExceptionFilter

- [ ] **Step 1: Add AuditLog model to schema.prisma**

Add at the end of the schema file, before the closing `}`:

```prisma
model AuditLog {
  id             String   @id @default(cuid())
  userId         String?
  action         String   // CREATE, UPDATE, DELETE, LOGIN, ACCESS
  entityType     String   // USER, ACCOUNT, TRANSACTION, etc.
  entityId       String?
  changes        Json?    // structured audit data
  endpoint       String?
  method         String?
  ipAddress      String?
  userAgent      String?
  durationMs     Int?
  createdAt      DateTime @default(now())

  @@index([userId])
  @@index([entityType])
  @@index([createdAt])
}
```

- [ ] **Step 2: Run migration**

Run: `pnpm --filter backend db:migrate:dev --name add-audit-log`
Expected: Migration created successfully, schema.prisma updated

- [ ] **Step 3: Verify model exists**

Run: `pnpm --filter backend db:studio` — confirm AuditLog table appears
Expected: Table visible in Prisma Studio

- [ ] **Step 4: Commit**

```bash
git add app/apps/backend/prisma/schema.prisma
git commit -m "feat(backend): add AuditLog model to Prisma schema"
```

---

### Task 2: Create AuditCrudInterceptor

**Files:**
- Create: `app/apps/backend/src/shared/interceptors/audit-crud.interceptor.ts`
- Modify: `app/apps/backend/src/main.ts` (register interceptor)

**Interfaces:**
- Consumes: PrismaService (from `app/apps/backend/src/infra/prisma/prisma.service.ts`)
- Produces: `AuditCrudInterceptor` registered as `APP_INTERCEPTOR`

- [ ] **Step 1: Create interceptors directory**

Run: `mkdir -p app/apps/backend/src/shared/interceptors`
Expected: Directory created

- [ ] **Step 2: Create audit-crud.interceptor.ts**

Create file at `app/apps/backend/src/shared/interceptors/audit-crud.interceptor.ts`:

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaService } from '../../infra/prisma/prisma.service';

const METHOD_ACTION_MAP: Record<string, string> = {
  POST: 'CREATE',
  PUT: 'UPDATE',
  PATCH: 'UPDATE',
  DELETE: 'DELETE',
};

const SENSITIVE_FIELDS = ['password', 'secret', 'token', 'key', 'authorization', 'bearer'];

@Injectable()
export class AuditCrudInterceptor implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adapterHost: HttpAdapterHost,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url, params, body, user } = request;

    // Skip GET requests (read-only)
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
          this.saveAuditLog({
            userId: user?.id,
            action,
            entityType: this.resolveEntityType(url),
            entityId: this.resolveEntityId(responseBody, params, body),
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
              body: this.sanitizeBody(body),
            },
          }).catch(() => {
            // Fire-and-forget — never block response
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
    // Skip 'api' prefix if present
    const entitySegment = segments[0] === 'api' ? segments[1] : segments[0];
    if (!entitySegment) return 'UNKNOWN';
    return entitySegment.charAt(0).toUpperCase() + entitySegment.slice(1).toLowerCase();
  }

  private resolveEntityId(
    responseBody: Record<string, unknown> | null,
    params: Record<string, string>,
    body: Record<string, unknown>,
  ): string | null {
    // Prefer response body id
    if (responseBody && typeof responseBody === 'object' && 'id' in responseBody) {
      return String((responseBody as Record<string, unknown>).id);
    }
    // Then route params
    if (params?.id) return params.id;
    // Then body fields
    if (body?.id) return String(body.id);
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

  private getClientIp(request: Record<string, unknown>): string | null {
    const headers = request.headers as Record<string, string>;
    const forwarded = headers['x-forwarded-for'];
    if (forwarded) return forwarded.split(',')[0].trim();
    const socket = request.socket as { remoteAddress?: string };
    return socket?.remoteAddress || null;
  }

  private async saveAuditLog(data: {
    userId?: string;
    action: string;
    entityType: string;
    entityId: string | null;
    endpoint: string;
    method: string;
    ipAddress: string | null;
    userAgent: string | null;
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
          changes: data.changes,
        },
      });
    } catch {
      // Fire-and-forget — audit log failure should never break the app
    }
  }
}
```

- [ ] **Step 3: Register interceptor in main.ts**

In `app/apps/backend/src/main.ts`, add import and registration:

```typescript
import { AuditCrudInterceptor } from './shared/interceptors/audit-crud.interceptor';
```

After the existing `app.useGlobalFilters(...)` line, add:

```typescript
app.useGlobalInterceptors(
  new AuditCrudInterceptor(app.get(PrismaService), httpAdapterHost),
);
```

Make sure `PrismaService` is imported:
```typescript
import { PrismaService } from './infra/prisma/prisma.service';
```

- [ ] **Step 4: Verify compilation**

Run: `pnpm --filter backend build`
Expected: Build succeeds with no errors

- [ ] **Step 5: Run existing tests**

Run: `pnpm --filter backend test`
Expected: All existing tests pass

- [ ] **Step 6: Commit**

```bash
git add app/apps/backend/src/shared/interceptors/audit-crud.interceptor.ts app/apps/backend/src/main.ts
git commit -m "feat(backend): add AuditCrudInterceptor for CRUD audit logging"
```

---

### Task 3: Improve GlobalExceptionFilter

**Files:**
- Modify: `app/apps/backend/src/shared/filters/all-exceptions.filter.ts`

**Interfaces:**
- Consumes: PrismaService (optional, for audit logging)
- Produces: Enhanced `AllExceptionsFilter` with security hardening

- [ ] **Step 1: Read current filter**

Read: `app/apps/backend/src/shared/filters/all-exceptions.filter.ts` (133 lines)
Understand the existing flat response structure and error code mapping.

- [ ] **Step 2: Add database error detection patterns**

Add these constants at the top of the file:

```typescript
const DB_ERROR_PATTERNS = [
  'pool_timeout', 'econnrefused', 'etimedout', 'connection timeout',
  'P1001', 'P1008', 'P1017', 'ECONNRESET',
];

const SENSITIVE_MESSAGE_PATTERNS = [
  /password/gi, /secret/gi, /token/gi, /key/gi,
  /authorization/gi, /bearer/gi, /credential/gi,
];
```

- [ ] **Step 3: Add message sanitization**

Add a `sanitizeMessage` method to the class:

```typescript
private sanitizeMessage(message: string): string {
  for (const pattern of SENSITIVE_MESSAGE_PATTERNS) {
    if (pattern.test(message)) {
      return 'Invalid Request';
    }
  }
  return message;
}
```

- [ ] **Step 4: Add database error detection**

In the `catch()` method, before building the response, add database error detection:

```typescript
const message = exception instanceof HttpException
  ? exception.getResponse()?.['message'] || exception.message
  : String(exception);

const isDbError = DB_ERROR_PATTERNS.some(p =>
  message.toLowerCase().includes(p.toLowerCase())
);

if (isDbError) {
  status = 503;
  message = 'Service temporarily unavailable';
}
```

- [ ] **Step 5: Add production error hiding**

After building the response object, add:

```typescript
if (process.env.NODE_ENV === 'production' && status >= 500) {
  response.message = 'Internal Server Error';
  delete response.debug;
}
```

- [ ] **Step 6: Add dev stack trace exposure**

In the response object construction:

```typescript
const response = {
  statusCode: status,
  code: this.getErrorCode(status),
  message: this.sanitizeMessage(message),
  details,
  timestamp: new Date().toISOString(),
  path: request.url,
  ...(process.env.NODE_ENV !== 'production' && { debug: exception.stack }),
};
```

- [ ] **Step 7: Verify compilation**

Run: `pnpm --filter backend build`
Expected: Build succeeds with no errors

- [ ] **Step 8: Run existing tests**

Run: `pnpm --filter backend test`
Expected: All existing tests pass

- [ ] **Step 9: Commit**

```bash
git add app/apps/backend/src/shared/filters/all-exceptions.filter.ts
git commit -m "feat(backend): harden GlobalExceptionFilter with DB error detection, message sanitization, and production error hiding"
```

---

### Task 4: Colocate Repositories Inside Modules

**Files:**
- Move: `app/apps/backend/src/repositories/account.repository.ts` → `app/apps/backend/src/modules/accounts/repositories/`
- Move: `app/apps/backend/src/repositories/card.repository.ts` → `app/apps/backend/src/modules/card/repositories/`
- Move: `app/apps/backend/src/repositories/categories.repository.ts` → `app/apps/backend/src/modules/categories/repositories/`
- Move: `app/apps/backend/src/repositories/recurrence.repository.ts` → `app/apps/backend/src/modules/recurrences/repositories/`
- Move: `app/apps/backend/src/repositories/transaction.repository.ts` → `app/apps/backend/src/modules/transactions/repositories/`
- Move: `app/apps/backend/src/repositories/user.repository.ts` → `app/apps/backend/src/modules/users/repositories/`
- Modify: All module files that import from `../../repositories/` to use `./repositories/`
- Move: `app/apps/backend/src/repositories/__tests__/` → respective module `__tests__/` directories

**Interfaces:**
- Consumes: Existing repository imports in module files
- Produces: Colocated repositories within module boundaries

- [ ] **Step 1: Create repositories directories in each module**

Run:
```bash
mkdir -p app/apps/backend/src/modules/accounts/repositories
mkdir -p app/apps/backend/src/modules/card/repositories
mkdir -p app/apps/backend/src/modules/categories/repositories
mkdir -p app/apps/backend/src/modules/recurrences/repositories
mkdir -p app/apps/backend/src/modules/transactions/repositories
mkdir -p app/apps/backend/src/modules/users/repositories
```

- [ ] **Step 2: Move account.repository.ts**

Run: `mv app/apps/backend/src/repositories/account.repository.ts app/apps/backend/src/modules/accounts/repositories/`
Update import in `app/apps/backend/src/modules/accounts/accounts.module.ts`:
```typescript
// Before:
import { AccountRepository } from '../../repositories/account.repository';
// After:
import { AccountRepository } from './repositories/account.repository';
```

- [ ] **Step 3: Move card.repository.ts**

Run: `mv app/apps/backend/src/repositories/card.repository.ts app/apps/backend/src/modules/card/repositories/`
Update import in `app/apps/backend/src/modules/card/card.module.ts`:
```typescript
// Before:
import { CardRepository } from '../../repositories/card.repository';
// After:
import { CardRepository } from './repositories/card.repository';
```

- [ ] **Step 4: Move categories.repository.ts**

Run: `mv app/apps/backend/src/repositories/categories.repository.ts app/apps/backend/src/modules/categories/repositories/`
Update any imports referencing the old path.

- [ ] **Step 5: Move recurrence.repository.ts**

Run: `mv app/apps/backend/src/repositories/recurrence.repository.ts app/apps/backend/src/modules/recurrences/repositories/`
Update any imports referencing the old path.

- [ ] **Step 6: Move transaction.repository.ts**

Run: `mv app/apps/backend/src/repositories/transaction.repository.ts app/apps/backend/src/modules/transactions/repositories/`
Update any imports referencing the old path.

- [ ] **Step 7: Move user.repository.ts**

Run: `mv app/apps/backend/src/repositories/user.repository.ts app/apps/backend/src/modules/users/repositories/`
Update any imports referencing the old path.

- [ ] **Step 8: Move repository tests**

Move each test file to its respective module's `__tests__/` directory:
```bash
mkdir -p app/apps/backend/src/modules/accounts/__tests__
mkdir -p app/apps/backend/src/modules/categories/__tests__
mkdir -p app/apps/backend/src/modules/recurrences/__tests__
mkdir -p app/apps/backend/src/modules/transactions/__tests__
mkdir -p app/apps/backend/src/modules/users/__tests__
```

Move test files and update their imports.

- [ ] **Step 9: Remove empty repositories directory**

Run: `rm -rf app/apps/backend/src/repositories`
Expected: Old directory removed

- [ ] **Step 10: Verify compilation**

Run: `pnpm --filter backend build`
Expected: Build succeeds with no errors

- [ ] **Step 11: Run all tests**

Run: `pnpm --filter backend test`
Expected: All tests pass

- [ ] **Step 12: Commit**

```bash
git add -A app/apps/backend/src/modules/ app/apps/backend/src/repositories/
git commit -m "refactor(backend): colocate repositories inside their respective modules"
```

---

### Task 5: Create Permissions Module (Simplified for Single-User App)

**Files:**
- Create: `app/apps/backend/src/modules/permissions/permissions.module.ts`
- Create: `app/apps/backend/src/modules/permissions/permissions.service.ts`
- Create: `app/apps/backend/src/modules/permissions/permissions.guard.ts`
- Create: `app/apps/backend/src/modules/permissions/decorators/require-permission.decorator.ts`
- Create: `app/apps/backend/src/modules/permissions/repositories/permissions.repository.ts`
- Create: `app/apps/backend/src/modules/permissions/interfaces/permission.interface.ts`
- Modify: `app/apps/backend/src/main.ts` (register guard)
- Modify: `app/apps/backend/prisma/schema.prisma` (add Permission model)

**Interfaces:**
- Consumes: PrismaService, Reflector
- Produces: PermissionsGuard, @RequirePermission decorator, PermissionsService

- [ ] **Step 1: Add Permission model to schema.prisma**

```prisma
model Permission {
  id             String   @id @default(cuid())
  userId         String
  entityId       String
  entityName     String
  canCreate      Boolean  @default(false)
  canRead        Boolean  @default(true)
  canUpdate      Boolean  @default(false)
  canDelete      Boolean  @default(false)
  scope          String   @default("OWN") // NONE, OWN, ALL
  permissionType String   @default("CRUD") // CRUD, PROCESS, READ_ONLY
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  user User @relation(fields: [userId], references: [id])

  @@unique([userId, entityId])
  @@index([userId])
  @@index([entityId])
}
```

Also add to User model:
```prisma
  permissions Permission[]
```

- [ ] **Step 2: Run migration**

Run: `pnpm --filter backend db:migrate:dev --name add-permissions`
Expected: Migration created

- [ ] **Step 3: Create permission.interface.ts**

Create `app/apps/backend/src/modules/permissions/interfaces/permission.interface.ts`:

```typescript
export type PermissionScope = 'NONE' | 'OWN' | 'ALL';
export type PermissionType = 'CRUD' | 'PROCESS' | 'READ_ONLY';

export interface UserPermissionRecord {
  userId: string;
  entityId: string;
  entityName: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  scope: PermissionScope;
  permissionType: PermissionType;
}

export interface RequirePermissionMetadata {
  table: string;
  action: 'create' | 'read' | 'update' | 'delete';
  scope?: PermissionScope;
}
```

- [ ] **Step 4: Create require-permission.decorator.ts**

Create `app/apps/backend/src/modules/permissions/decorators/require-permission.decorator.ts`:

```typescript
import { SetMetadata } from '@nestjs/common';
import { RequirePermissionMetadata } from '../interfaces/permission.interface';

export const REQUIRE_PERMISSION_KEY = 'require_permission';
export const RequirePermission = (meta: RequirePermissionMetadata) =>
  SetMetadata(REQUIRE_PERMISSION_KEY, meta);
```

- [ ] **Step 5: Create permissions.repository.ts**

Create `app/apps/backend/src/modules/permissions/repositories/permissions.repository.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UserPermissionRecord } from '../interfaces/permission.interface';

@Injectable()
export class PermissionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<UserPermissionRecord[]> {
    return this.prisma.permission.findMany({
      where: { userId },
    }) as Promise<UserPermissionRecord[]>;
  }

  async findByEntityId(entityId: string): Promise<UserPermissionRecord[]> {
    return this.prisma.permission.findMany({
      where: { entityId },
    }) as Promise<UserPermissionRecord[]>;
  }

  async upsert(data: UserPermissionRecord): Promise<void> {
    await this.prisma.permission.upsert({
      where: {
        userId_entityId: { userId: data.userId, entityId: data.entityId },
      },
      update: data,
      create: data,
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.permission.deleteMany({ where: { userId } });
  }
}
```

- [ ] **Step 6: Create permissions.service.ts**

Create `app/apps/backend/src/modules/permissions/permissions.service.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from './repositories/permissions.repository';
import {
  UserPermissionRecord,
  RequirePermissionMetadata,
} from './interfaces/permission.interface';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepo: PermissionsRepository) {}

  async getUserPermissions(userId: string): Promise<UserPermissionRecord[]> {
    return this.permissionsRepo.findByUserId(userId);
  }

  async canPerform(
    userId: string,
    meta: RequirePermissionMetadata,
  ): Promise<boolean> {
    const permissions = await this.permissionsRepo.findByUserId(userId);
    const record = permissions.find((p) => p.entityName === meta.table);

    if (!record) return false;

    // Check permission type
    if (record.permissionType === 'READ_ONLY' && meta.action !== 'read') {
      return false;
    }

    // Check scope
    if (record.scope === 'NONE') return false;

    // Check action
    switch (meta.action) {
      case 'create': return record.canCreate;
      case 'read': return record.canRead;
      case 'update': return record.canUpdate;
      case 'delete': return record.canDelete;
      default: return false;
    }
  }

  async setPermissions(
    userId: string,
    permissions: UserPermissionRecord[],
  ): Promise<void> {
    for (const perm of permissions) {
      await this.permissionsRepo.upsert({ ...perm, userId });
    }
  }
}
```

- [ ] **Step 7: Create permissions.guard.ts**

Create `app/apps/backend/src/modules/permissions/guards/permissions.guard.ts`:

```typescript
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../../shared/decorators/public.decorator';
import { REQUIRE_PERMISSION_KEY } from '../decorators/require-permission.decorator';
import { PermissionsService } from '../permissions.service';
import { RequirePermissionMetadata } from '../interfaces/permission.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Skip public endpoints
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // Get permission metadata
    const permissionMeta = this.reflector.getAllAndOverride<RequirePermissionMetadata>(
      REQUIRE_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    // No @RequirePermission = allowed (backwards compatible)
    if (!permissionMeta) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.id) {
      throw new ForbiddenException('Authentication required');
    }

    const allowed = await this.permissionsService.canPerform(user.id, permissionMeta);

    if (!allowed) {
      throw new ForbiddenException(
        `Insufficient permissions: ${permissionMeta.action} on ${permissionMeta.table}`,
      );
    }

    return true;
  }
}
```

- [ ] **Step 8: Create permissions.module.ts**

Create `app/apps/backend/src/modules/permissions/permissions.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsRepository } from './repositories/permissions.repository';
import { PermissionsGuard } from './guards/permissions.guard';

@Module({
  providers: [PermissionsService, PermissionsRepository, PermissionsGuard],
  exports: [PermissionsService, PermissionsGuard],
})
export class PermissionsModule {}
```

- [ ] **Step 9: Register guard in app.module.ts**

In `app/apps/backend/src/app.module.ts`:

```typescript
import { PermissionsModule } from './modules/permissions/permissions.module';
import { PermissionsGuard } from './modules/permissions/guards/permissions.guard';
```

Add to imports array:
```typescript
PermissionsModule,
```

Add to providers array (after GlobalAuthGuard):
```typescript
{ provide: APP_GUARD, useClass: PermissionsGuard },
```

- [ ] **Step 10: Verify compilation**

Run: `pnpm --filter backend build`
Expected: Build succeeds with no errors

- [ ] **Step 11: Run tests**

Run: `pnpm --filter backend test`
Expected: All tests pass (guard is backwards compatible — no @RequirePermission = allowed)

- [ ] **Step 12: Commit**

```bash
git add app/apps/backend/src/modules/permissions/ app/apps/backend/prisma/schema.prisma app/apps/backend/src/app.module.ts
git commit -m "feat(backend): add PermissionsModule with RBAC guard and @RequirePermission decorator"
```

---

## Phase 2: Frontend — Query Keys & Architecture

### Task 6: Create Centralized queryKeys.ts

**Files:**
- Create: `app/apps/frontend/src/lib/queryKeys.ts`
- Modify: All 10 feature hook files to import from centralized file

**Interfaces:**
- Consumes: None (standalone)
- Produces: `authQueryKeys`, `authPermissionsQueryKeys`, `transactionProfileQueryKeys`, `accountProfileQueryKeys`, `cardProfileQueryKeys`, `recurrenceProfileQueryKeys`, `userProfileQueryKeys`, `dashboardQueryKeys`, `categoryProfileQueryKeys`, `updateCardProfileQueryKeys`

- [ ] **Step 1: Read all existing query key definitions**

Read each file listed in the exploration results to capture the exact current patterns.

- [ ] **Step 2: Create centralized queryKeys.ts**

Create `app/apps/frontend/src/lib/queryKeys.ts`:

```typescript
// Auth
export const authQueryKeys = {
  all: ['auth'] as const,
  me: () => [...authQueryKeys.all, 'me'] as const,
};

export const authPermissionsQueryKeys = {
  all: ['permissions'] as const,
  me: () => [...authPermissionsQueryKeys.all, 'me'] as const,
};

// Transactions
export const transactionProfileQueryKeys = {
  all: () => ['transactions'] as const,
  byId: (id: string) => [...transactionProfileQueryKeys.all(), 'byId', id] as const,
  byMonth: (month: number, year: number) =>
    [...transactionProfileQueryKeys.all(), 'byMonth', month, year] as const,
};

// Accounts
export const accountProfileQueryKeys = {
  all: () => ['accounts'] as const,
  byId: (id: string) => [...accountProfileQueryKeys.all(), 'byId', id] as const,
};

// Cards
export const cardProfileQueryKeys = {
  all: () => ['cards'] as const,
  byId: (id: string) => [...cardProfileQueryKeys.all(), 'byId', id] as const,
  byAccount: (accountId: string) =>
    [...cardProfileQueryKeys.all(), 'byAccount', accountId] as const,
  byMonth: (year: number, month: number) =>
    [...cardProfileQueryKeys.all(), 'byMonth', year, month] as const,
};

// Recurrences
export const recurrenceProfileQueryKeys = {
  all: () => ['recurrences'] as const,
  byId: (id: string) => [...recurrenceProfileQueryKeys.all(), 'byId', id] as const,
  byMonth: (month: number, year: number, type?: string) =>
    [...recurrenceProfileQueryKeys.all(), 'byMonth', month, year, type] as const,
};

// Users
export const userProfileQueryKeys = {
  all: () => ['users'] as const,
  byId: (id: string) => [...userProfileQueryKeys.all(), 'byId', id] as const,
  me: () => [...userProfileQueryKeys.all(), 'me'] as const,
};

// Dashboard
export const dashboardQueryKeys = {
  all: () => ['dashboard'] as const,
  budget: () => [...dashboardQueryKeys.all(), 'budget'] as const,
  recentAccounts: () => [...dashboardQueryKeys.all(), 'recentAccounts'] as const,
  incomeExpense: (months: number) =>
    [...dashboardQueryKeys.all(), 'incomeExpense', months] as const,
  toPay: () => [...dashboardQueryKeys.all(), 'toPay'] as const,
};

// Categories
export const categoryProfileQueryKeys = {
  all: () => ['categories'] as const,
  byId: (id: string) => [...categoryProfileQueryKeys.all(), 'byId', id] as const,
};

// Update Card Balance
export const updateCardProfileQueryKeys = {
  all: () => ['updateCard'] as const,
  byMonth: (year: number, month: number) =>
    [...updateCardProfileQueryKeys.all(), 'byMonth', year, month] as const,
};
```

- [ ] **Step 3: Update recurrences hook**

In `app/apps/frontend/src/features/recurrences/hooks/recurrenceHooks.ts`:
- Remove local `recurrenceProfileQueryKeys` definition (lines 7-16)
- Add import: `import { recurrenceProfileQueryKeys } from '@/lib/queryKeys';`

- [ ] **Step 4: Update transactions hook**

In `app/apps/frontend/src/features/transactions/hooks/transactionsHooks.ts`:
- Remove local `transactionProfileQueryKeys` definition
- Add import: `import { transactionProfileQueryKeys } from '@/lib/queryKeys';`

- [ ] **Step 5: Update users hook**

In `app/apps/frontend/src/features/users/hooks/usersHooks.ts`:
- Remove local `userProfileQueryKeys` definition
- Add import: `import { userProfileQueryKeys } from '@/lib/queryKeys';`
- Fix inline key usage on line 26 to use the centralized factory

- [ ] **Step 6: Update dashboard hook**

In `app/apps/frontend/src/features/dashboard/hooks/dashboardHooks.ts`:
- Remove local `dashboardQueryKeys` definition
- Add import: `import { dashboardQueryKeys } from '@/lib/queryKeys';`

- [ ] **Step 7: Update accounts hook**

In `app/apps/frontend/src/features/accounts/hooks/accountsHooks.ts`:
- Remove local `accountProfileQueryKeys` definition
- Add import: `import { accountProfileQueryKeys } from '@/lib/queryKeys';`

- [ ] **Step 8: Update cards hook**

In `app/apps/frontend/src/features/cards/hooks/cardHooks.ts`:
- Remove local `cardProfileQueryKeys` definition
- Add import: `import { cardProfileQueryKeys } from '@/lib/queryKeys';`

- [ ] **Step 9: Update auth hooks**

In `app/apps/frontend/src/features/auth/hooks/use-permissions.ts`:
- Remove local `permissionsQueryKeys` definition
- Add import: `import { authPermissionsQueryKeys } from '@/lib/queryKeys';`
- Update all references from `permissionsQueryKeys` to `authPermissionsQueryKeys`

In `app/apps/frontend/src/features/auth/hooks/use-authUser.ts`:
- Remove local `authQueryKeys` definition
- Add import: `import { authQueryKeys } from '@/lib/queryKeys';`

- [ ] **Step 10: Update updateCardBalance hook**

In `app/apps/frontend/src/features/updateCardBalance/hooks/updateCardHooks.ts`:
- Remove local `updateCardProfileQueryKeys` definition
- Add import: `import { updateCardProfileQueryKeys } from '@/lib/queryKeys';`

- [ ] **Step 11: Update createTransaction categories hook**

In `app/apps/frontend/src/features/createTransaction/hooks/useCategoriesHook.ts`:
- Remove local `categoryProfileQueryKeys` definition
- Add import: `import { categoryProfileQueryKeys } from '@/lib/queryKeys';`

- [ ] **Step 12: Verify compilation**

Run: `pnpm --filter frontend build`
Expected: Build succeeds with no errors

- [ ] **Step 13: Run tests**

Run: `pnpm --filter frontend test`
Expected: All existing tests pass

- [ ] **Step 14: Commit**

```bash
git add app/apps/frontend/src/lib/queryKeys.ts app/apps/frontend/src/features/
git commit -m "refactor(frontend): centralize query key factories into lib/queryKeys.ts"
```

---

### Task 7: Add invalidateQueries Helper

**Files:**
- Modify: `app/apps/frontend/src/lib/query-invalidation-map.ts`
- Modify: 3 mutation hook files to use helper

**Interfaces:**
- Consumes: QueryClient (from @tanstack/react-query)
- Produces: `invalidateQueries()` helper function

- [ ] **Step 1: Read current invalidation map**

Read: `app/apps/frontend/src/lib/query-invalidation-map.ts` (30 lines)

- [ ] **Step 2: Add helper function**

At the end of the file, add:

```typescript
import { QueryClient } from '@tanstack/react-query';

export type MutationName = keyof typeof mutationInvalidations;

export function invalidateQueries(
  queryClient: QueryClient,
  mutation: MutationName,
  variables?: Record<string, unknown>,
) {
  const entry = mutationInvalidations[mutation];
  if (!entry) return;
  const queryKeys = variables ? entry.queries(variables) : entry.queries();
  for (const key of queryKeys) {
    queryClient.invalidateQueries({ queryKey: key });
  }
}
```

- [ ] **Step 3: Update createAccountHook.ts**

In `app/apps/frontend/src/features/accounts/hooks/createAccountHook.ts`:
- Replace manual `forEach` with: `invalidateQueries(queryClient, 'createAccount');`
- Add import: `import { invalidateQueries } from '@/lib/query-invalidation-map';`

- [ ] **Step 4: Update updateCardMutationHooks.ts**

In `app/apps/frontend/src/features/updateCardBalance/hooks/updateCardMutationHooks.ts`:
- Replace manual `forEach` with: `invalidateQueries(queryClient, 'updateCardBalance');`

- [ ] **Step 5: Update createMutationHooks.ts**

In `app/apps/frontend/src/features/createTransaction/hooks/createMutationHooks.ts`:
- Replace manual `forEach` with: `invalidateQueries(queryClient, 'createTransaction');`

- [ ] **Step 6: Verify compilation**

Run: `pnpm --filter frontend build`
Expected: Build succeeds

- [ ] **Step 7: Run tests**

Run: `pnpm --filter frontend test`
Expected: All tests pass

- [ ] **Step 8: Commit**

```bash
git add app/apps/frontend/src/lib/query-invalidation-map.ts app/apps/frontend/src/features/
git commit -m "refactor(frontend): add invalidateQueries helper and simplify mutation hooks"
```

---

### Task 8: Improve Barrel Exports

**Files:**
- Modify: `app/apps/frontend/src/features/*/index.ts` (10 files)

**Interfaces:**
- Consumes: Existing feature components, hooks, services
- Produces: Comprehensive categorized barrel exports

- [ ] **Step 1: Update auth barrel**

In `app/apps/frontend/src/features/auth/index.ts`:

```typescript
// Components
export { AuthDashboard } from "./components/AuthDashboard";
export { AuthSkeleton } from "./components/auth-skeleton";

// Hooks
export { useAuth } from "./hooks/use-authUser";
export { useRegister } from "./hooks/useRegister";
export { usePermissions } from "./hooks/use-permissions";

// Services
export { authService } from "./api/authService";
```

- [ ] **Step 2: Update accounts barrel**

In `app/apps/frontend/src/features/accounts/index.ts`:

```typescript
// Components
export { AccountDashboard } from "./components/AccountDashboard";
export { AccountDashboardSkeleton } from "./components/account-dashboard-skeleton";

// Hooks
export { useAccounts, useCreateAccount } from "./hooks/accountsHooks";

// Services
export { accountService } from "./api/accountService";
```

- [ ] **Step 3: Update cards barrel**

In `app/apps/frontend/src/features/cards/index.ts`:

```typescript
// Components
export { CardsDashboard } from "./components/CardsDashboard";
export { CardsDashboardSkeleton } from "./components/cards-dashboard-skeleton";

// Hooks
export { useCards } from "./hooks/cardHooks";

// Services
export { cardService } from "./api/cardService";
```

- [ ] **Step 4: Update transactions barrel**

In `app/apps/frontend/src/features/transactions/index.ts`:

```typescript
// Components
export { TransactionsDashboard } from "./components/TransactionsDashboard";
export { TransactionsDashboardSkeleton } from "./components/transactions-dashboard-skeleton";

// Hooks
export { useTransactions, useTransactionsByMonth } from "./hooks/transactionsHooks";

// Services
export { transactionService } from "./api/transactionService";
```

- [ ] **Step 5: Update recurrences barrel**

In `app/apps/frontend/src/features/recurrences/index.ts`:

```typescript
// Components
export { RecurrencesDashboard } from "./components/RecurrencesDashboard";
export { RecurrencesDashboardSkeleton } from "./components/recurrences-dashboard-skeleton";

// Hooks
export { useRecurrences } from "./hooks/recurrenceHooks";

// Services
export { recurrenceService } from "./api/recurrenceService";
```

- [ ] **Step 6: Update dashboard barrel**

In `app/apps/frontend/src/features/dashboard/index.ts`:

```typescript
// Components
export { RootDashboard } from "./components/RootDashboard";

// Hooks
export { useBudget, useRecentAccounts, useIncomeExpense, useToPay } from "./hooks/dashboardHooks";

// Services
export { dashboardService } from "./api/dashboardService";
```

- [ ] **Step 7: Update users barrel**

In `app/apps/frontend/src/features/users/index.ts`:

```typescript
// Components
export { UsersDashboard } from "./components/UsersDashboard";
export { UsersDashboardSkeleton } from "./components/users-dashboard-skeleton";

// Hooks
export { useUsers, useUserById } from "./hooks/usersHooks";

// Services
export { userService } from "./api/userService";
```

- [ ] **Step 8: Update createTransaction barrel**

In `app/apps/frontend/src/features/createTransaction/index.ts`:

```typescript
// Components
export { FormContainer } from "./components/FormContainer";

// Hooks
export { useCreateTransaction } from "./hooks/createMutationHooks";

// Services
export { createTransactionService } from "./api/createTransactionService";
```

- [ ] **Step 9: Update updateCardBalance barrel**

In `app/apps/frontend/src/features/updateCardBalance/index.ts`:

```typescript
// Components
export { FormContainerCard } from "./components/FormContainerCard";

// Hooks
export { useUpdateCardBalance } from "./hooks/updateCardMutationHooks";

// Services
export { updateCardService } from "./api/updateCardService";
```

- [ ] **Step 10: Update updateRecurrence barrel**

In `app/apps/frontend/src/features/updateRecurrence/index.ts`:

```typescript
// Components
export { FormContainerRecurrence } from "./components/FormContainerRecurrence";
```

- [ ] **Step 11: Verify compilation**

Run: `pnpm --filter frontend build`
Expected: Build succeeds

- [ ] **Step 12: Run tests**

Run: `pnpm --filter frontend test`
Expected: All tests pass

- [ ] **Step 13: Commit**

```bash
git add app/apps/frontend/src/features/*/index.ts
git commit -m "refactor(frontend): improve barrel exports with categorized sections"
```

---

### Task 9: Add Feature-Level types.ts

**Files:**
- Create: `app/apps/frontend/src/features/cards/types.ts`
- Create: `app/apps/frontend/src/features/transactions/types.ts`
- Create: `app/apps/frontend/src/features/dashboard/types.ts`

**Interfaces:**
- Consumes: Types from `@repo/shared`
- Produces: Feature-specific type definitions

- [ ] **Step 1: Create cards types**

Create `app/apps/frontend/src/features/cards/types.ts`:

```typescript
import { type infer as zInfer } from 'zod';
import { cardSchema, cardStatementSchema } from '@repo/shared';

export type Card = zInfer<typeof cardSchema>;
export type CardStatement = zInfer<typeof cardStatementSchema>;

export type CardType = Card['type'];
export type CardCloseStatus = 'open' | 'closed';
```

- [ ] **Step 2: Create transactions types**

Create `app/apps/frontend/src/features/transactions/types.ts`:

```typescript
import { type infer as zInfer } from 'zod';
import { transactionSchema } from '@repo/shared';

export type Transaction = zInfer<typeof transactionSchema>;
export type TransactionType = Transaction['type'];

export interface TransactionFilter {
  month: number;
  year: number;
  type?: TransactionType;
}
```

- [ ] **Step 3: Create dashboard types**

Create `app/apps/frontend/src/features/dashboard/types.ts`:

```typescript
export interface DashboardMetrics {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  pendingPayments: number;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface IncomeExpenseData {
  month: string;
  income: number;
  expense: number;
}
```

- [ ] **Step 4: Update imports**

Update any files in these features that use inline types to import from the new types.ts files.

- [ ] **Step 5: Verify compilation**

Run: `pnpm --filter frontend build`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add app/apps/frontend/src/features/cards/types.ts app/apps/frontend/src/features/transactions/types.ts app/apps/frontend/src/features/dashboard/types.ts
git commit -m "feat(frontend): add feature-level type definitions"
```

---

### Task 10: Add EmptyState Component

**Files:**
- Create: `app/apps/frontend/src/components/common/empty-state.tsx`
- Modify: Data table components to use EmptyState

**Interfaces:**
- Consumes: shadcn/ui Button, Lucide icons
- Produces: Reusable `EmptyState` component

- [ ] **Step 1: Create EmptyState component**

Create `app/apps/frontend/src/components/common/empty-state.tsx`:

```typescript
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  title = "Sin datos disponibles",
  description = "No hay información disponible para mostrar",
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        {icon || <Inbox className="h-7 w-7 text-muted-foreground" />}
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-center text-xs text-muted-foreground max-w-[250px]">
          {description}
        </p>
      </div>
      {action && (
        <Button onClick={action.onClick} variant="outline" size="sm" className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Export from common**

In `app/apps/frontend/src/components/common/index.ts` (create if not exists):

```typescript
export { EmptyState } from "./empty-state";
```

- [ ] **Step 3: Integrate into TransactionsDataTable**

In `app/apps/frontend/src/features/transactions/components/TransactionsDataTable.tsx`, add before the DataTable:

```typescript
import { EmptyState } from "@/components/common/empty-state";

// In the component, before <DataTable>:
if (data.length === 0) {
  return (
    <EmptyState
      title="No hay transacciones"
      description="Agrega tu primera transacción para verla aquí"
    />
  );
}
```

- [ ] **Step 4: Integrate into other data tables**

Repeat step 3 for:
- `AccountDataTable`
- `CardsDataTable`
- `RecurrencesDataTable`
- `UsersDataTable`

- [ ] **Step 5: Verify compilation**

Run: `pnpm --filter frontend build`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add app/apps/frontend/src/components/common/empty-state.tsx app/apps/frontend/src/features/
git commit -m "feat(frontend): add EmptyState component and integrate into data tables"
```

---

### Task 11: Create Frontend Logger Utility

**Files:**
- Create: `app/apps/frontend/src/lib/logger.ts`
- Modify: 4 files to replace console.error/warn

**Interfaces:**
- Consumes: None (standalone)
- Produces: `logger` utility with environment-aware log levels

- [ ] **Step 1: Create logger utility**

Create `app/apps/frontend/src/lib/logger.ts`:

```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel: LogLevel = process.env.NODE_ENV === 'production' ? 'error' : 'debug';

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

export const logger = {
  debug(message: string, ...args: unknown[]) {
    if (shouldLog('debug')) console.debug(`[DEBUG] ${message}`, ...args);
  },
  info(message: string, ...args: unknown[]) {
    if (shouldLog('info')) console.info(`[INFO] ${message}`, ...args);
  },
  warn(message: string, ...args: unknown[]) {
    if (shouldLog('warn')) console.warn(`[WARN] ${message}`, ...args);
  },
  error(message: string, ...args: unknown[]) {
    if (shouldLog('error')) console.error(`[ERROR] ${message}`, ...args);
  },
};
```

- [ ] **Step 2: Replace console.error in error-provider.tsx**

In `app/apps/frontend/src/providers/error-provider.tsx`:
- Add import: `import { logger } from '@/lib/logger';`
- Replace `console.error(...)` with `logger.error(...)`
- Replace `console.log(...)` with `logger.debug(...)`

- [ ] **Step 3: Replace console.error in error-boundary.tsx**

In `app/apps/frontend/src/components/error/error-boundary.tsx`:
- Add import: `import { logger } from '@/lib/logger';`
- Replace `console.error(...)` with `logger.error(...)`

- [ ] **Step 4: Replace console.error in route-error.tsx**

In `app/apps/frontend/src/components/error/route-error.tsx`:
- Add import: `import { logger } from '@/lib/logger';`
- Replace `console.error(...)` with `logger.error(...)`

- [ ] **Step 5: Replace console.warn in client-fetch.ts**

In `app/apps/frontend/src/lib/api/client-fetch.ts`:
- Add import: `import { logger } from '@/lib/logger';`
- Replace `console.warn(...)` with `logger.warn(...)`

- [ ] **Step 6: Replace console.error in useDataTable.ts**

In `app/apps/frontend/src/hooks/useDataTable.ts`:
- Add import: `import { logger } from '@/lib/logger';`
- Replace `console.error(...)` with `logger.error(...)`

- [ ] **Step 7: Verify compilation**

Run: `pnpm --filter frontend build`
Expected: Build succeeds

- [ ] **Step 8: Run tests**

Run: `pnpm --filter frontend test`
Expected: All tests pass

- [ ] **Step 9: Commit**

```bash
git add app/apps/frontend/src/lib/logger.ts app/apps/frontend/src/
git commit -m "feat(frontend): add structured logger utility and replace console calls"
```

---

### Task 12: Add MSW-Based Component Tests

**Files:**
- Create: `app/apps/frontend/src/__tests__/components/data-table.test.tsx`
- Create: `app/apps/frontend/src/__tests__/components/kpi-card.test.tsx`
- Create: `app/apps/frontend/src/__tests__/components/empty-state.test.tsx`

**Interfaces:**
- Consumes: MSW, React Testing Library, existing components
- Produces: Component test files

**Required Sub-Skill:** Use superpowers:test-driven-development for each test

- [ ] **Step 1: Write failing test for DataTable empty state**

Create `app/apps/frontend/src/__tests__/components/empty-state.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/common/empty-state';

describe('EmptyState', () => {
  it('renders default title and description', () => {
    render(<EmptyState />);
    expect(screen.getByText('Sin datos disponibles')).toBeInTheDocument();
    expect(screen.getByText(/No hay información disponible/)).toBeInTheDocument();
  });

  it('renders custom title and description', () => {
    render(
      <EmptyState
        title="No transactions"
        description="Add your first transaction"
      />
    );
    expect(screen.getByText('No transactions')).toBeInTheDocument();
    expect(screen.getByText('Add your first transaction')).toBeInTheDocument();
  });

  it('renders action button when provided', () => {
    const onClick = jest.fn();
    render(
      <EmptyState
        title="Empty"
        action={{ label: 'Add Item', onClick }}
      />
    );
    const button = screen.getByText('Add Item');
    expect(button).toBeInTheDocument();
    button.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not render action button when not provided', () => {
    render(<EmptyState title="Empty" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter frontend test -- --testPathPattern="empty-state"`
Expected: FAIL (component doesn't exist yet or test path wrong)

- [ ] **Step 3: Implement EmptyState (if not already done)**

If Task 10 is complete, this test should pass. If not, create the component.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm --filter frontend test -- --testPathPattern="empty-state"`
Expected: PASS

- [ ] **Step 5: Write test for KPI card**

Create `app/apps/frontend/src/__tests__/components/kpi-card.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { KpiCard } from '@/components/data-display/kpi-card';

describe('KpiCard', () => {
  it('renders title and value', () => {
    render(<KpiCard title="Total Balance" value="$1,234" />);
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
    expect(screen.getByText('$1,234')).toBeInTheDocument();
  });

  it('renders change indicator when provided', () => {
    render(
      <KpiCard title="Income" value="$500" change={12.5} />
    );
    expect(screen.getByText('12.5%')).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `pnpm --filter frontend test -- --testPathPattern="kpi-card"`
Expected: FAIL

- [ ] **Step 7: Write minimal implementation or fix test**

Adjust test based on actual KpiCard component API.

- [ ] **Step 8: Run test to verify it passes**

Run: `pnpm --filter frontend test -- --testPathPattern="kpi-card"`
Expected: PASS

- [ ] **Step 9: Write test for DataTable**

Create `app/apps/frontend/src/__tests__/components/data-table.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { DataTable } from '@/components/data-display/data-table/data-table';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'amount', header: 'Amount' },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    const data = [
      { name: 'Transaction 1', amount: 100 },
      { name: 'Transaction 2', amount: 200 },
    ];
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText('Transaction 1')).toBeInTheDocument();
    expect(screen.getByText('Transaction 2')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText(/noResults/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 10: Run tests to verify they pass**

Run: `pnpm --filter frontend test -- --testPathPattern="data-table"`
Expected: PASS

- [ ] **Step 11: Run all frontend tests**

Run: `pnpm --filter frontend test`
Expected: All tests pass

- [ ] **Step 12: Commit**

```bash
git add app/apps/frontend/src/__tests__/components/
git commit -m "test(frontend): add MSW-based component tests for EmptyState, KpiCard, DataTable"
```

---

## Phase 3: Low Priority (Optional)

### Task 13: Add Scheduled Tasks Infrastructure

**Files:**
- Create: `app/apps/backend/src/modules/scheduler/scheduler.module.ts`
- Modify: `app/apps/backend/src/app.module.ts`
- Modify: `app/apps/backend/package.json`

**Interfaces:**
- Consumes: @nestjs/schedule
- Produces: SchedulerModule with example cron job

- [ ] **Step 1: Install @nestjs/schedule**

Run: `pnpm --filter backend add @nestjs/schedule`
Expected: Package installed

- [ ] **Step 2: Create SchedulerModule**

Create `app/apps/backend/src/modules/scheduler/scheduler.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
})
export class SchedulerModule {}
```

- [ ] **Step 3: Register in app.module.ts**

Add `SchedulerModule` to imports in `app/apps/backend/src/app.module.ts`.

- [ ] **Step 4: Verify compilation**

Run: `pnpm --filter backend build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add app/apps/backend/src/modules/scheduler/ app/apps/backend/src/app.module.ts app/apps/backend/package.json
git commit -m "feat(backend): add SchedulerModule infrastructure with @nestjs/schedule"
```

---

## Phase 4: Verification & Documentation

### Task 14: Final Verification

- [ ] **Step 1: Run all backend tests**

Run: `pnpm --filter backend test`
Expected: All tests pass

- [ ] **Step 2: Run all frontend tests**

Run: `pnpm --filter frontend test`
Expected: All tests pass

- [ ] **Step 3: Run lint**

Run: `pnpm lint`
Expected: No errors

- [ ] **Step 4: Run type check**

Run: `pnpm type-check`
Expected: No errors

- [ ] **Step 5: Build all**

Run: `pnpm build`
Expected: Build succeeds

---

## Execution Notes

**Parallel Execution:** Tasks 1-5 (backend) and 6-12 (frontend) can run in parallel via `dispatching-parallel-agents`.

**Dependency Order:**
- Task 1 (AuditLog model) must complete before Task 2 (AuditCrudInterceptor)
- Task 6 (queryKeys) should complete before Task 7 (invalidateQueries)
- Task 10 (EmptyState) should complete before Task 12 (component tests)
- Task 9 (types.ts) is independent

**Estimated Effort:**
- Phase 1 (Backend): ~2-3 hours
- Phase 2 (Frontend): ~2-3 hours
- Phase 3 (Low priority): ~30 minutes
- Phase 4 (Verification): ~15 minutes
