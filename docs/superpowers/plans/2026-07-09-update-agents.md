# Update docs/agents Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update all 8 agent profiles in `docs/agents/` to reflect the current project state, including permissions system, audit logs, frontend navigation restructuring, and fix factual errors.

**Architecture:** Documentation-only updates to 8 markdown files. Each agent file gets new sections added for the three missing systems (permissions, audit logs, sidebar restructuring) plus the BCRYPT_ROUNDS fix. No code changes.

**Tech Stack:** Markdown documentation only

## Global Constraints

- Documentation only — no code changes
- Follow existing markdown structure and formatting conventions in each agent file
- Preserve all existing content — only add new sections and fix errors
- Each agent file is independent — tasks can be done in any order

---

### Task 1: Update architect_agent_finance.md

**Files:**
- Modify: `docs/agents/architect_agent_finance.md`

**Interfaces:**
- Consumes: Current Prisma schema (Entity, UserPermission, DevAccount, AuditLog models)
- Produces: Updated architect agent with complete schema and architecture sections

- [ ] **Step 1: Read current agent file**

Read `docs/agents/architect_agent_finance.md` to understand current structure.

- [ ] **Step 2: Add missing Prisma models to schema section**

Add these models after the existing Account model in the Prisma schema section:

```prisma
model Entity {
  id        String   @id @default(cuid())
  name      String   @unique
  label     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  permissions UserPermission[]
}

model UserPermission {
  id         String         @id @default(cuid())
  userId     Int
  entityId   String
  canCreate  Boolean        @default(false)
  canRead    Boolean        @default(false)
  canUpdate  Boolean        @default(false)
  canDelete  Boolean        @default(false)
  scope      PermissionScope @default(OWN)
  createdAt  DateTime       @default(now())
  updatedAt  DateTime       @updatedAt

  user   User   @relation(fields: [userId], references: [id])
  entity Entity @relation(fields: [entityId], references: [id])

  @@unique([userId, entityId])
}

model DevAccount {
  id     String @id @default(cuid())
  userId Int    @unique
  token  String @unique

  user User @relation(fields: [userId], references: [id])
}

model AuditLog {
  id         String   @id @default(cuid())
  userId     Int
  tableName  String
  recordId   String
  action     AuditAction
  oldData    Json?
  newData    Json?
  ipAddress  String?
  userAgent  String?
  createdAt  DateTime @default(now())

  user User @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([tableName])
  @@index([createdAt])
}
```

Add these enums:

```prisma
enum PermissionScope {
  OWN
  NONE
}

enum PermissionType {
  CRUD
  READ_ONLY
  NONE
}

enum AuditAction {
  CREATE
  UPDATE
  DELETE
}
```

- [ ] **Step 3: Add permissions system architecture section**

Add a new section after the "Auth & Security" section:

```markdown
## Permissions System (RBAC)

**Deny-by-default**: Every non-public route MUST have `@RequirePermission()` or it's automatically denied.

**Architecture:**
- `Entity` model — devadmin registry of manageable entities (accounts, transactions, etc.)
- `UserPermission` — per-user CRUD permissions per entity, scoped to OWN or NONE
- `PermissionsGuard` — global NestJS guard applied via `APP_GUARD`
- `RequirePermission` decorator — marks routes with required entity + action
- Auto-assigned on registration — all new users get default permissions

**Key files:**
- `src/modules/permissions/` — controller, service, repository, guards, decorators
- `src/modules/entities/` — Entity CRUD endpoints
```

- [ ] **Step 4: Add audit logging architecture section**

Add a new section after the permissions section:

```markdown
## Audit Logging

**Architecture:**
- `AuditLog` model — stores user/entity/record/action/old+new data
- `AuditCrudInterceptor` — NestJS interceptor on all non-health/auth routes
- Fire-and-forget — doesn't block the request
- Sensitive fields redacted (password, token, secret)

**Key files:**
- `src/modules/audit/` — interceptor, service, repository, controller
```

- [ ] **Step 5: Commit**

```bash
git add docs/agents/architect_agent_finance.md
git commit -m "docs(agents): update architect agent with permissions, audit logs, and missing models"
```

---

### Task 2: Update backend_agent_finance.md

**Files:**
- Modify: `docs/agents/backend_agent_finance.md`

**Interfaces:**
- Consumes: Permissions module structure, AuditCrudInterceptor, auto-permissions flow
- Produces: Updated backend agent with complete module documentation

- [ ] **Step 1: Read current agent file**

Read `docs/agents/backend_agent_finance.md` to understand current structure.

- [ ] **Step 2: Fix BCRYPT_ROUNDS**

Find `BCRYPT_ROUNDS = 10` and change to `BCRYPT_ROUNDS = 12`.

- [ ] **Step 3: Add permissions module section**

Add a new section after the existing modules section:

```markdown
## Permissions Module (`src/modules/permissions/`)

**Files:**
- `permissions.module.ts` — imports PrismaModule, exports PermissionsService
- `permissions.controller.ts` — GET /permissions/me, GET /permissions/tables, GET /permissions/user/:userId, GET /permissions/entity/:entityId, PATCH /permissions/user/:userId
- `permissions.service.ts` — business logic for CRUD operations on UserPermission
- `permissions.repository.ts` — Prisma queries for UserPermission and Entity
- `guards/permissions.guard.ts` — deny-by-default global guard
- `decorators/require-permission.decorator.ts` — @RequirePermission({ tableName, action })
- `decorators/current-user.decorator.ts` — @CurrentUser() parameter decorator
- `interfaces/permission.interface.ts` — PermissionRequirement, UserPermissions types

**Key patterns:**
- Global guard via `APP_GUARD` in AppModule — controllers don't need explicit `@UseGuards`
- `@RequirePermission({ tableName: 'accounts', action: 'read' })` on every non-public route
- `scope: 'OWN'` is metadata only — stored in DB and UI labels, NOT enforced in guard
- Only `scope: 'NONE'` actually denies access
```

- [ ] **Step 4: Add auto-permissions on registration**

Add after the permissions module section:

```markdown
## Auto-Permissions on Registration

When a user registers via `POST /auth/register`, the auth service automatically:
1. Creates the user with hashed password
2. Finds all Entity records in the database
3. Creates UserPermission records for each entity with default permissions:
   - Financial entities (accounts, transactions, recurrences, cards): CRUD, scope OWN
   - Reference entities (categories, currencies, payment-methods, recurrence-types, card-issuers, user-profile): READ_ONLY, scope OWN
```

- [ ] **Step 5: Add AuditCrudInterceptor section**

Add after the auto-permissions section:

```markdown
## AuditCrudInterceptor (`src/modules/audit/`)

**Files:**
- `audit.module.ts` — imports PrismaModule, exports AuditService
- `audit.interceptor.ts` — NestJS interceptor on all non-health/auth routes
- `audit.service.ts` — creates AuditLog records
- `audit.repository.ts` — Prisma queries for AuditLog
- `audit.controller.ts` — GET /audit-logs, GET /audit-logs/:id

**Key patterns:**
- Applied globally via `APP_INTERCEPTOR` in AppModule
- Captures old/new data for UPDATE actions
- Sensitive fields redacted (password, token, secret)
- Fire-and-forget — doesn't block the request
```

- [ ] **Step 6: Commit**

```bash
git add docs/agents/backend_agent_finance.md
git commit -m "docs(agents): update backend agent with permissions, audit logs, and fix BCRYPT_ROUNDS"
```

---

### Task 3: Update devops_agent_finance.md

**Files:**
- Modify: `docs/agents/devops_agent_finance.md`

**Interfaces:**
- Consumes: Docker Compose structure, entrypoint.sh, GHCR images
- Produces: Updated devops agent with deployment documentation

- [ ] **Step 1: Read current agent file**

Read `docs/agents/devops_agent_finance.md` to understand current structure.

- [ ] **Step 2: Add deployment flow section**

Add a new section for deployment:

```markdown
## Deployment Flow

**Entrypoint (`apps/backend/scripts/entrypoint.sh`):**
1. Run `npx prisma migrate deploy` — applies pending migrations
2. Start the NestJS server

**Docker Compose (`docker/docker-compose.deploy.yml`):**
- `db` — PostgreSQL with named volume `postgres_data`
- `api` — Backend from `ghcr.io/fedepaz/appfinance-backend:main`
- `nextjs` — Frontend from `ghcr.io/fedepaz/appfinance-frontend:main`
- `nginx` — Reverse proxy, strips `/api` prefix

**CI/CD:**
- `pr-checks.yml` — runs on PR to dev or main (lint + unit + integration tests)
- `deploy.yml` — runs on push to main (tests → Docker build → push to GHCR)
- Images tagged as `main-<sha>` + `latest`
```

- [ ] **Step 3: Commit**

```bash
git add docs/agents/devops_agent_finance.md
git commit -m "docs(agents): update devops agent with deployment flow and Docker structure"
```

---

### Task 4: Update frontend_agent_finance.md

**Files:**
- Modify: `docs/agents/frontend_agent_finance.md`

**Interfaces:**
- Consumes: Permissions feature, audit logs feature, sidebar restructuring
- Produces: Updated frontend agent with complete feature documentation

- [ ] **Step 1: Read current agent file**

Read `docs/agents/frontend_agent_finance.md` to understand current structure.

- [ ] **Step 2: Add permissions feature section**

Add a new section:

```markdown
## Permissions Feature (`src/features/permissions/`)

**Files:**
- `api/permissions.api.ts` — usePermissions(), useTables(), useUserPermissions(), useEntityPermissions(), useUpdateUserPermissions()
- `components/permissions-dashboard.tsx` — Main dashboard with user selector and permission matrix
- `components/permissions-user-manager.tsx` — CRUD toggle switches per entity per user
- `hooks/use-permissions.ts` — React Query hooks wrapping API calls
- `types/permission.types.ts` — UserPermissions, PermissionTable, PermissionEntity types
```

- [ ] **Step 3: Add audit logs feature section**

Add after permissions:

```markdown
## Audit Logs Feature (`src/features/auditLogs/`)

**Files:**
- `api/auditLog.api.ts` — useAuditLogs(), useAuditLog()
- `components/auditLog-dashboard.tsx` — Main dashboard with data table
- `components/auditLog-form.tsx` — Detail view for individual audit log entries
- `hooks/use-auditLog.ts` — React Query hooks wrapping API calls
- `types/auditLog.types.ts` — AuditLog, AuditLogListResponse types
```

- [ ] **Step 4: Add sidebar restructuring section**

Add after audit logs:

```markdown
## Sidebar Navigation Restructuring

**Types (`src/lib/config/navigation.types.ts`):**
- `NavigationItem` — standalone nav item (e.g., Home)
- `NavigationNestedGroup` — group with subGroups (e.g., Operaciones, Administración)
- `NavigationSubGroup` — sub-group within a nestedGroup (e.g., Usuarios under Administración)
- `requiredPermission` — `{ tableName: string, action: string }` on each nav item

**Structure:**
- Home — standalone at top
- Operaciones — nestedGroup (Transacciones, Cuentas, Recurrencias, Tarjeta)
- Administración — nestedGroup with subGroup "Usuarios" (Lista, Permisos)
- Desarrollo — nestedGroup (Auditoría)

**Key pattern:** `requiredPermission.tableName` on nav items controls visibility based on user permissions.
```

- [ ] **Step 5: Commit**

```bash
git add docs/agents/frontend_agent_finance.md
git commit -m "docs(agents): update frontend agent with permissions, audit logs, and sidebar restructuring"
```

---

### Task 5: Update pm_agent_finance.md

**Files:**
- Modify: `docs/agents/pm_agent_finance.md`

**Interfaces:**
- Consumes: Permissions system, audit logs as features
- Produces: Updated PM agent with feature requirements

- [ ] **Step 1: Read current agent file**

Read `docs/agents/pm_agent_finance.md` to understand current structure.

- [ ] **Step 2: Add permissions system as P0 feature**

Add a new feature section:

```markdown
## Permissions System (RBAC) — P0

**User story:** As an admin, I want to control what each user can see and do in the app.

**Acceptance criteria:**
- Each user has per-entity CRUD permissions (create, read, update, delete)
- Permissions are scoped to OWN (own data only) or NONE (no access)
- New users get default permissions on registration
- Admin can manage permissions via /user-permissions page
- Deny-by-default: routes without explicit permission are blocked

**Entities:** accounts, transactions, recurrences, cards, categories, currencies, payment-methods, recurrence-types, card-issuers, user-profile
```

- [ ] **Step 3: Add audit logging as P1 feature**

Add after permissions:

```markdown
## Audit Logging — P1

**User story:** As an admin, I want to see who changed what and when.

**Acceptance criteria:**
- All CRUD operations on protected entities are logged
- Log includes: user, entity, record, action, old/new data, timestamp
- Sensitive fields (password, token) are redacted
- Admin can view audit logs via /audit-logs page
- Logs are searchable and filterable
```

- [ ] **Step 4: Commit**

```bash
git add docs/agents/pm_agent_finance.md
git commit -m "docs(agents): update PM agent with permissions and audit log features"
```

---

### Task 6: Update qa_agent_finance.md

**Files:**
- Modify: `docs/agents/qa_agent_finance.md`

**Interfaces:**
- Consumes: Integration test patterns, permissions test patterns
- Produces: Updated QA agent with test documentation

- [ ] **Step 1: Read current agent file**

Read `docs/agents/qa_agent_finance.md` to understand current structure.

- [ ] **Step 2: Add integration test patterns**

Add a new section:

```markdown
## Integration Test Patterns

**Structure:**
- `test/integration/` — all integration tests
- `test/integration/setup.ts` — global beforeAll/afterAll (seeds entities, cleans DB)
- `test/integration/helpers/db.helper.ts` — cleanDatabase() truncates all tables in order
- `test/integration/helpers/auth.helper.ts` — registerAndLogin() helper

**Entity seeding:** `test/integration/setup.ts` seeds all 10 entities in `beforeAll` so tests can create permissions.

**Database cleanup:** `cleanDatabase()` truncates tables in dependency order: AuditLog → UserPermission → Transaction → Recurrence → Account → Category → User.
```

- [ ] **Step 3: Add permissions test patterns**

Add after integration tests:

```markdown
## Permissions Test Patterns

**Key scenarios:**
- User with no permissions gets 403 on protected routes
- User with READ_ONLY permissions can read but not create/update/delete
- User with CRUD permissions can perform all actions
- Scope OWN allows access to own data only
- Scope NONE denies all access
- Default permissions assigned on registration
```

- [ ] **Step 4: Commit**

```bash
git add docs/agents/qa_agent_finance.md
git commit -m "docs(agents): update QA agent with integration and permissions test patterns"
```

---

### Task 7: Update security_agent_finance.md

**Files:**
- Modify: `docs/agents/security_agent_finance.md`

**Interfaces:**
- Consumes: PermissionsGuard, AuditCrudInterceptor, frontend requiredPermission
- Produces: Updated security agent with security architecture

- [ ] **Step 1: Read current agent file**

Read `docs/agents/security_agent_finance.md` to understand current structure.

- [ ] **Step 2: Add PermissionsGuard section**

Add a new section:

```markdown
## PermissionsGuard (Deny-by-Default)

**Mechanism:** Global NestJS guard applied via `APP_GUARD` in AppModule.

**Behavior:**
- Every non-public route MUST have `@RequirePermission()` decorator
- Routes without the decorator are automatically denied (403)
- Public routes (health, auth register/login) use `@Public()` to bypass

**Key file:** `src/modules/permissions/guards/permissions.guard.ts`
```

- [ ] **Step 3: Add AuditCrudInterceptor section**

Add after PermissionsGuard:

```markdown
## AuditCrudInterceptor

**Mechanism:** Global NestJS interceptor applied via `APP_INTERCEPTOR` in AppModule.

**Behavior:**
- Captures request/response for all non-health/auth routes
- Logs user, entity, record, action, old/new data
- Redacts sensitive fields (password, token, secret)
- Fire-and-forget — doesn't block the request

**Key file:** `src/modules/audit/audit.interceptor.ts`
```

- [ ] **Step 4: Add frontend requiredPermission section**

Add after interceptor:

```markdown
## Frontend Navigation Security

**Mechanism:** `requiredPermission` property on navigation items.

**Behavior:**
- Each nav item can specify `{ tableName: string, action: string }`
- Navigation components check user permissions before rendering
- Users without permission don't see the nav item

**Key file:** `src/lib/config/navigation.types.ts`
```

- [ ] **Step 5: Commit**

```bash
git add docs/agents/security_agent_finance.md
git commit -m "docs(agents): update security agent with PermissionsGuard, AuditCrudInterceptor, and frontend security"
```

---

### Task 8: Update ux_agent_finance.md

**Files:**
- Modify: `docs/agents/ux_agent_finance.md`

**Interfaces:**
- Consumes: Permissions UI, audit logs UI, sidebar restructuring
- Produces: Updated UX agent with UI documentation

- [ ] **Step 1: Read current agent file**

Read `docs/agents/ux_agent_finance.md` to understand current structure.

- [ ] **Step 2: Add permissions UI section**

Add a new section:

```markdown
## Permissions UI (`/user-permissions`)

**Components:**
- `PermissionsDashboard` — main layout with user selector dropdown
- `PermissionsUserManager` — CRUD toggle switches per entity per user
- `PendingPermissionsPage` — loading state while permissions are being fetched

**Key patterns:**
- User selector at top to switch between users
- Permission matrix: entities as rows, CRUD actions as columns
- Toggle switches for each permission
- Save button to persist changes
```

- [ ] **Step 3: Add audit logs UI section**

Add after permissions:

```markdown
## Audit Logs UI (`/audit-logs`)

**Components:**
- `AuditLogDashboard` — main layout with data table
- `AuditLogForm` — detail view for individual entries

**Key patterns:**
- Data table with columns: timestamp, user, entity, action, record
- Click row to see full details (old/new data)
- Filterable by entity, action, user, date range
```

- [ ] **Step 4: Add sidebar restructuring section**

Add after audit logs:

```markdown
## Sidebar Navigation

**Structure:**
- Home — standalone at top (not nested)
- Operaciones — nestedGroup with 4 items (Transacciones, Cuentas, Recurrencias, Tarjeta)
- Administración — nestedGroup with subGroup "Usuarios" (Lista, Permisos)
- Desarrollo — nestedGroup with 1 item (Auditoría)

**Key pattern:** SubGroups allow grouping items within a nestedGroup (e.g., Usuarios under Administración).
```

- [ ] **Step 5: Commit**

```bash
git add docs/agents/ux_agent_finance.md
git commit -m "docs(agents): update UX agent with permissions UI, audit logs UI, and sidebar restructuring"
```
