# Permissions System Activation — Design Spec

> **Date:** 2026-07-07
> **Status:** Approved
> **Reference:** sistemaDemo permissions system (working implementation)

## Problem

appFinance has a fully built but completely inactive permissions system:

- `PermissionsGuard` is registered globally but no controller uses `@RequirePermission()` — it's a no-op
- Frontend `authService.getPermissionsMe()` is hardcoded to `{ isAdmin: true, permissions: [] }` — no API call
- The `Permission` model has `entityId` as a plain string with no `Entity` relation
- Two incompatible permission models coexist: DB booleans vs. frontend flat string array
- No seed data for entities or permissions
- No `GET /permissions/me` endpoint

## Goal

Activate the permissions system by aligning with sistemaDemo's working implementation. Deny-by-default guard, Entity model as devadmin registry, structured permission objects on the frontend.

## Approach: Clean Break

Drop the current `Permission` table, create `Entity` + `UserPermission` + `DevAccount` matching sistemaDemo exactly. No production data to preserve.

---

## 1. Database Schema

### Entity model (NEW)

```prisma
model Entity {
  id             String         @id @default(cuid()) @db.VarChar(36)
  name           String         @unique @db.VarChar(50)
  label          String         @db.VarChar(50)
  permissionType PermissionType @default(CRUD)
  isActive       Boolean        @default(true)
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt
  @@map("entities")
}
```

**Devadmin workflow:** When creating a new feature (e.g., "purchases"), the dev manually inserts a row into `entities` with `name: "purchases"`, `label: "Compras"`, `permissionType: "CRUD"`. Then uses `@RequirePermission({ tableName: 'purchases', action: 'read' })` on the routes.

### UserPermission model (renamed from Permission)

```prisma
model UserPermission {
  id             String         @id @default(cuid()) @db.VarChar(36)
  userId         String         @db.VarChar(36)
  user           User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  entityId       String         @db.VarChar(36)
  entity         Entity         @relation(fields: [entityId], references: [id])
  canCreate      Boolean        @default(false)
  canRead        Boolean        @default(false)
  canUpdate      Boolean        @default(false)
  canDelete      Boolean        @default(false)
  scope          PermissionScope @default(ALL)
  permissionType PermissionType @default(CRUD)
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt
  @@unique([userId, entityId])
  @@index([userId])
  @@index([entityId])
  @@map("user_permissions")
}
```

**Key changes from current `Permission`:**
- Renamed to `UserPermission`, table `user_permissions`
- `entityId` is now a foreign key to `Entity.id` (UUID, not string name)
- Removed `entityName` column (derived from `entity.name` via relation)
- `canRead` default: `true` → `false` (deny by default)
- `scope` default: `OWN` → `ALL`

### DevAccount model (NEW)

```prisma
model DevAccount {
  id        String   @id @default(cuid()) @db.VarChar(36)
  userId    String   @unique @db.VarChar(36)
  createdAt DateTime @default(now())
  @@map("dev_account")
}
```

**Purpose:** Super-admin bypass at the data layer. Model exists in schema for future use. No BaseRepository integration or soft-delete bypass needed now — appFinance doesn't have those patterns. When dev accounts are needed, the dev manually creates the row and the `DevAccountRepository.isDevAccount(userId)` check will be available.

### Enums

```prisma
enum PermissionScope {
  NONE
  OWN
  ALL
}

enum PermissionType {
  CRUD
  PROCESS
  READ_ONLY
}
```

### User model update

Add relation:

```prisma
model User {
  // ... existing fields ...
  permissions UserPermission[]
  devAccount  DevAccount?
}
```

### Seed data

- **Entities:** All 10 managed entities (users, user_permissions, accounts, transactions, recurrences, cards, categories, dashboard, audit_logs, user_profile)
- **Admin user** (from existing seed): full CRUD+ALL on all entities
- **DevAccount row** for the admin user

---

## 2. Backend Guard & Route Decoration

### PermissionsGuard (deny-by-default)

```typescript
async canActivate(context: ExecutionContext): Promise<boolean> {
  // 1. Skip if @Public()
  const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [...]);
  if (isPublic) return true;

  // 2. Deny if NO @RequirePermission() — CHANGED from return true
  const permissionMeta = this.reflector.getAllAndOverride<RequirePermissionMetadata>(
    REQUIRE_PERMISSION_KEY, [...]
  );
  if (!permissionMeta) {
    throw new ForbiddenException('No permission metadata configured for this route');
  }

  // 3. Check permission via service
  const { user } = request;
  if (!user?.id) throw new ForbiddenException('Authentication required');

  const allowed = await this.permissionsService.canPerform(user.id, permissionMeta);
  if (!allowed) throw new ForbiddenException(...);
  return true;
}
```

### RequirePermission metadata (renamed field)

```typescript
export interface RequirePermissionMetadata {
  tableName: string;     // was "table", now "tableName" to match sistemaDemo
  action: 'create' | 'read' | 'update' | 'delete';
  scope?: PermissionScope;
}
```

### Route decoration map

Every controller method gets `@RequirePermission()`:

| Controller | Route | Decorator |
|---|---|---|
| **Auth** | | |
| | `POST /auth/login` | `@Public()` |
| | `POST /auth/register` | `@Public()` |
| | `POST /auth/refresh` | `@RequirePermission({ tableName: 'user_profile', action: 'read', scope: 'OWN' })` |
| | `POST /auth/logout` | `@RequirePermission({ tableName: 'user_profile', action: 'read', scope: 'OWN' })` |
| | `PATCH /auth/password` | `@RequirePermission({ tableName: 'user_profile', action: 'read', scope: 'OWN' })` |
| **Users** | | |
| | `GET /users` | `@RequirePermission({ tableName: 'users', action: 'read' })` |
| | `GET /users/me` | `@RequirePermission({ tableName: 'user_profile', action: 'read' })` |
| **Accounts** | | |
| | `GET /accounts` | `@RequirePermission({ tableName: 'accounts', action: 'read' })` |
| | `GET /accounts/:id` | `@RequirePermission({ tableName: 'accounts', action: 'read' })` |
| | `POST /accounts` | `@RequirePermission({ tableName: 'accounts', action: 'create' })` |
| **Transactions** | | |
| | `GET /transactions` | `@RequirePermission({ tableName: 'transactions', action: 'read' })` |
| | `GET /transactions/:id` | `@RequirePermission({ tableName: 'transactions', action: 'read' })` |
| | `GET /transactions/month/:month/:year` | `@RequirePermission({ tableName: 'transactions', action: 'read' })` |
| | `POST /transactions` | `@RequirePermission({ tableName: 'transactions', action: 'create' })` |
| **Recurrences** | | |
| | `GET /recurrences` | `@RequirePermission({ tableName: 'recurrences', action: 'read' })` |
| | `GET /recurrences/:id` | `@RequirePermission({ tableName: 'recurrences', action: 'read' })` |
| | `GET /recurrences/month/:month/:year/:type` | `@RequirePermission({ tableName: 'recurrences', action: 'read' })` |
| **Cards** | | |
| | `GET /cards` | `@RequirePermission({ tableName: 'cards', action: 'read' })` |
| | `GET /cards/account/:accountId` | `@RequirePermission({ tableName: 'cards', action: 'read' })` |
| | `GET /cards/month/:year/:month` | `@RequirePermission({ tableName: 'cards', action: 'read' })` |
| | `GET /cards/close/:year/:month` | `@RequirePermission({ tableName: 'cards', action: 'read' })` |
| | `POST /cards/close` | `@RequirePermission({ tableName: 'cards', action: 'create' })` |
| **Categories** | | |
| | `GET /categories` | `@RequirePermission({ tableName: 'categories', action: 'read' })` |
| | `GET /categories/:id` | `@RequirePermission({ tableName: 'categories', action: 'read' })` |
| **Dashboard** | | |
| | `GET /dashboard/budget` | `@RequirePermission({ tableName: 'dashboard', action: 'read' })` |
| | `GET /dashboard/recentAccounts` | `@RequirePermission({ tableName: 'dashboard', action: 'read' })` |
| | `GET /dashboard/income-expense/:months` | `@RequirePermission({ tableName: 'dashboard', action: 'read' })` |
| | `GET /dashboard/toPay` | `@RequirePermission({ tableName: 'dashboard', action: 'read' })` |
| **AuditLog** | | |
| | `GET /audit-logs` | `@RequirePermission({ tableName: 'audit_logs', action: 'read', scope: 'ALL' })` |
| **Permissions** | | |
| | `GET /permissions/me` | `@RequirePermission({ tableName: 'user_profile', action: 'read', scope: 'OWN' })` |
| | `GET /permissions/tables` | `@RequirePermission({ tableName: 'user_permissions', action: 'read', scope: 'ALL' })` |
| | `GET /permissions/user/:userId` | `@RequirePermission({ tableName: 'user_permissions', action: 'read' })` |
| | `GET /permissions/entity/:entityId` | `@RequirePermission({ tableName: 'user_permissions', action: 'read' })` |
| | `PATCH /permissions/user/:userId` | `@RequirePermission({ tableName: 'user_permissions', action: 'update', scope: 'ALL' })` |

### New endpoint: `GET /permissions/me`

```typescript
@Get('me')
@RequirePermission({ tableName: 'user_profile', action: 'read', scope: 'OWN' })
async getMyPermissions(@CurrentUser() user: AuthUser): Promise<UserPermissions> {
  const perms = await this.permissionsService.getUserPermissionsByUserId(user.id);
  return perms;  // Record<string, TablePermission>
}
```

---

## 3. Backend Service & Repository

### PermissionsService changes

**`getUserPermissionsByUserId(userId)`** — join with Entity table:

```typescript
async getUserPermissionsByUserId(userId: string): Promise<UserPermissions> {
  const records = await this.permissionsRepo.findManyByUserId(userId);
  const map: UserPermissions = {};
  for (const r of records) {
    map[r.entity.name] = {
      canCreate: r.canCreate,
      canRead: r.canRead,
      canUpdate: r.canUpdate,
      canDelete: r.canDelete,
      scope: r.scope,
      permissionType: r.permissionType,
    };
  }
  return map;
}
```

**`canPerform(userId, { tableName, action, scope })`** — same logic as sistemaDemo:
1. Load user permissions map
2. Find record for `tableName`
3. No record → deny
4. `READ_ONLY` type → only read allowed
5. `PROCESS` type → only create/read allowed
6. Check specific CRUD boolean
7. Check scope hierarchy (OWN < ALL)

**`setPermissionsForUser(userId, permissions)`** — delete all + re-insert, validate against Entity table (not constants).

### PermissionsRepository changes

`findManyByUserId()` joins with Entity:

```typescript
async findManyByUserId(userId: string) {
  return this.prisma.userPermission.findMany({
    where: { userId },
    select: {
      userId: true,
      entityId: true,
      entity: { select: { name: true } },
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
      scope: true,
      permissionType: true,
    },
  });
}
```

### DevAccountRepository (NEW)

Simple utility for future use:

```typescript
async isDevAccount(userId: string): Promise<boolean> {
  const count = await this.prisma.devAccount.count({ where: { userId } });
  return count > 0;
}
```

No BaseRepository integration or soft-delete bypass — appFinance doesn't have those patterns.

---


## 3b. EntitiesModule (NEW)

### EntitiesController

| Route | Decorator | Description |
|---|---|---|
| `GET /entities/tables` | `@RequirePermission({ tableName: 'entities', action: 'read', scope: 'ALL' })` | List all entities |
| `GET /entities/table/:tableName` | `@RequirePermission({ tableName: 'entities', action: 'read', scope: 'ALL' })` | Get entity by name |
| `POST /entities/entity` | `@RequirePermission({ tableName: 'entities', action: 'create', scope: 'ALL' })` | Create new entity |
| `DELETE /entities/:id` | `@RequirePermission({ tableName: 'entities', action: 'delete', scope: 'ALL' })` | Soft delete entity |

### EntitiesService.createEntity()

- Creates entity in DB
- Auto-grants full CRUD+ALL permissions to the creator (devadmin)
- Validates `name` format: `^[a-zA-Z0-9_]+$`, auto-lowercased, 1-50 chars

### CreateEntityDto (in @repo/shared)

```typescript
CreateEntityDto = z.object({
  name: z.string().min(1).max(50).regex(/^[a-zA-Z0-9_]+$/).transform(s => s.toLowerCase()),
  label: z.string().min(1).max(50),
  permissionType: z.enum(["CRUD", "PROCESS", "READ_ONLY"]),
});
```

### EntitiesRepository

Standard Prisma CRUD:
- `findAll()` — list all active entities
- `findByName(name)` — lookup by name column
- `create(data)` — insert new entity
- `softDelete(id)` — set `isActive: false`

---

## 4. Frontend — Auth & Permissions

### Replace AuthUserPermissions with UserPermissions

Remove `AuthUserPermissionsSchema` from `auth.schema.ts`. Use `UserPermissions` from `permissions.schema.ts` everywhere:

```typescript
// permissions.schema.ts (already exists)
UserPermissionsSchema = z.record(z.string(), TablePermissionSchema)
// TablePermission = { canCreate, canRead, canUpdate, canDelete, scope, permissionType }
```

### authService.getPermissionsMe (real API call)

```typescript
getPermissionsMe: () => {
  return clientFetch<UserPermissions>("permissions/me", { method: "GET" });
}
```

### usePermissions hook

```typescript
export const usePermissions = () => {
  const { isSignedIn } = useAuth();
  return useQuery<UserPermissions>({
    queryKey: authPermissionsQueryKeys.me(),
    queryFn: authService.getPermissionsMe,
    enabled: isSignedIn,
    staleTime: 5 * 60 * 1000,
  });
};
```

### AuthProvider context

Exposes `permissions: UserPermissions` (Record<string, TablePermission>).

`isPendingPermissions` check: `signedIn && permissions object is empty {}`.

### usePermission hook (CRUD check)

```typescript
export function usePermission(tableName?: string) {
  const { permissions } = useAuthContext();
  const tablePermissions = permissions[tableName];
  return {
    canRead:    tablePermissions?.canRead || false,
    canCreate:  tablePermissions?.canCreate || false,
    canUpdate:  tablePermissions?.canUpdate || false,
    canDelete:  tablePermissions?.canDelete || false,
    scope:      tablePermissions?.scope || "NONE",
    permissionType: tablePermissions?.permissionType || "READ_ONLY",
  };
}
```

### Navigation filtering

Pure function `filterNavigation(config, permissions)` called via `useMemo` in sidebar components. Checks `permissions[table].canRead` for each item's `requiredPermission`.

### PendingPermissionsPage

NEW component — when user signs in but permissions object is empty `{}`, show waiting screen instead of empty dashboard.

---

## 5. Entity Management & Constants

### MANAGED_ENTITIES — REMOVED (dead code)

The `MANAGED_ENTITIES` constant in `@repo/shared` is dead code. Remove it entirely. The only constant that stays is `SYSTEM_ENTITIES` (used internally for reference).

### Seed script update

1. Create Entity rows for all 10 managed entities
2. Grant admin user full CRUD+ALL on all entities
3. Create DevAccount row for admin user

### Devadmin workflow for new features

When adding a new feature (e.g., "purchases"):

1. **Register entity:** `POST /entities/entity` with `{ name: "purchases", label: "Compras", permissionType: "CRUD" }`
2. **Add navigation item:** Add to `navigations.ts` with `requiredPermission: { table: "purchases", action: "read" }`
3. **Decorate routes:** `@RequirePermission({ tableName: 'purchases', action: 'read' })` on GET routes
4. **Grant permissions:** Via admin UI (Permisos page), grant user permissions on "purchases"

## 6. Migration Strategy

Since there's no production data:

1. Drop the `Permission` table
2. Create `entities`, `user_permissions`, `dev_account` tables
3. Create `PermissionScope` and `PermissionType` enums
4. Run seed to populate entities + admin permissions
5. Verify: admin can access all routes, guard denies unauthorized access

---

## 7. Testing Plan

- **Backend unit tests:** Update existing permission tests for new schema
- **Backend integration tests:** Test guard enforcement (deny unauthorized, allow authorized)
- **Frontend tests:** Update mock data for new `UserPermissions` format
- **Manual verification:** Login → permissions fetched → sidebar filtered → routes enforced

---

## 8. Files to Modify/Create

### Backend (modify)
- `prisma/schema.prisma` — rename Permission → UserPermission, add Entity, DevAccount, enums
- `prisma/seed.ts` — add entity seeding + admin permissions + dev account
- `src/modules/permissions/guards/permissions.guard.ts` — deny-by-default
- `src/modules/permissions/decorators/require-permission.decorator.ts` — rename field
- `src/modules/permissions/interfaces/permission.interface.ts` — update types
- `src/modules/permissions/permissions.service.ts` — join Entity, update canPerform
- `src/modules/permissions/permissions.controller.ts` — add GET /permissions/me, add decorators
- `src/modules/permissions/repositories/permissions.repository.ts` — join Entity
- `src/modules/permissions/permissions.module.ts` — add DevAccountRepository
- `src/modules/auth/auth.controller.ts` — add decorators
- `src/modules/users/users.controller.ts` — add decorators
- `src/modules/accounts/account.controller.ts` — add decorators
- `src/modules/transactions/transaction.controller.ts` — add decorators
- `src/modules/recurrences/recurrence.controller.ts` — add decorators
- `src/modules/cards/card.controller.ts` — add decorators
- `src/modules/categories/categories.controller.ts` — add decorators
- `src/modules/dashboard/dashboard.controller.ts` — add decorators
- `src/modules/auditLog/auditLog.controller.ts` — add decorators
- `src/app.module.ts` — add EntitiesModule import, verify guard registration order

### Backend (create)
- `src/modules/entities/entities.controller.ts`
- `src/modules/entities/entities.service.ts`
- `src/modules/entities/repositories/entities.repository.ts`
- `src/modules/entities/entities.module.ts`
- `src/modules/permissions/repositories/dev-account.repository.ts`

### Frontend (modify)
- `src/features/auth/api/authService.ts` — real API call
- `src/features/auth/providers/AuthProvider.tsx` — use UserPermissions type
- `src/features/auth/hooks/use-permissions.ts` — return UserPermissions
- `src/hooks/usePermission.ts` — structured object check + filterNavigation
- `src/components/layout/desktop-sidebar.tsx` — use filterNavigation
- `src/components/layout/mobile-navigation.tsx` — use filterNavigation
- `messages/en.json` — add pending permissions translations
- `messages/es.json` — add pending permissions translations

### Frontend (create)
- `src/components/common/pending-permissions.tsx`

### Shared (modify)
- `packages/shared/src/schemas/auth.schema.ts` — remove AuthUserPermissionsSchema
- `packages/shared/src/constants/managed-entities.ts` — remove MANAGED_ENTITIES (dead code)
