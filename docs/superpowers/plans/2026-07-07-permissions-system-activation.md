# Permissions System Activation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Activate the permissions system by aligning with sistemaDemo's working implementation — deny-by-default guard, Entity model as devadmin registry, structured permission objects on the frontend.

**Architecture:** Clean break — drop current `Permission` table, create `Entity` + `UserPermission` + `DevAccount` matching sistemaDemo. Add EntitiesModule for CRUD on entities. Update PermissionsGuard to deny-by-default. Replace frontend's hardcoded `isAdmin: true` with real API call to `GET /permissions/me`.

**Tech Stack:** NestJS 11, Prisma ORM, PostgreSQL, Next.js 16 (App Router), @repo/shared (Zod schemas), next-intl, React Query

## Global Constraints

- Branch: `feat/sistemaDemo-sync` (current branch)
- Deny-by-default guard: every non-public route MUST have `@RequirePermission()`
- Entity creation via `POST /entities/entity` endpoint (devadmin workflow)
- `MANAGED_ENTITIES` constant is dead code — remove it
- No production data — clean break migration is safe
- Pre-commit hook runs `pnpm lint` — fix all errors before committing
- Conventional Commits enforced (header max 100 chars)
- All monetary fields use `@db.Decimal(19,4)` in Prisma schema
- `@repo/shared` must be built before other packages can use it

---

### Task 1: Update Spec File

**Files:**
- Modify: `docs/superpowers/specs/2026-07-07-permissions-system-activation-design.md`

**Interfaces:**
- Consumes: Approved design from brainstorming session
- Produces: Updated spec with EntitiesModule and MANAGED_ENTITIES removal

- [ ] **Step 1: Add EntitiesModule section to spec**

Add the following sections to the spec file after Section 3 (Backend Service & Repository):

```markdown
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

\```typescript
CreateEntityDto = z.object({
  name: z.string().min(1).max(50).regex(/^[a-zA-Z0-9_]+$/).transform(s => s.toLowerCase()),
  label: z.string().min(1).max(50),
  permissionType: z.enum(["CRUD", "PROCESS", "READ_ONLY"]),
});
\```

### EntitiesRepository

Standard Prisma CRUD:
- `findAll()` — list all active entities
- `findByName(name)` — lookup by name column
- `create(data)` — insert new entity
- `softDelete(id)` — set `isActive: false`
```

- [ ] **Step 2: Update MANAGED_ENTITIES section**

Replace the MANAGED_ENTITIES section with:

```markdown
## 5. Entity Management & Constants

### MANAGED_ENTITIES — REMOVED (dead code)

The `MANAGED_ENTITIES` constant in `@repo/shared` is dead code. Remove it entirely. The only constant that stays is `SYSTEM_ENTITIES` (used by `entities.service.ts` and `permissions.service.ts` for internal reference).

### Updated Devadmin Workflow

When adding a new feature (e.g., "purchases"):

1. **Register entity:** `POST /entities/entity` with `{ name: "purchases", label: "Compras", permissionType: "CRUD" }`
2. **Add navigation item:** Add to `navigations.ts` with `requiredPermission: { table: "purchases", action: "read" }`
3. **Decorate routes:** `@RequirePermission({ tableName: 'purchases', action: 'read' })` on GET routes
4. **Grant permissions:** Via admin UI (Permisos page), grant user permissions on "purchases"
```

- [ ] **Step 3: Add EntitiesModule to Files section**

Add to the "Backend (modify)" list:
- `src/modules/entities/entities.controller.ts` (NEW)
- `src/modules/entities/entities.service.ts` (NEW)
- `src/modules/entities/repositories/entities.repository.ts` (NEW)
- `src/modules/entities/entities.module.ts` (NEW)
- `src/app.module.ts` — add EntitiesModule import

Add to the "Shared (modify)" list:
- `packages/shared/src/schemas/permissions.schema.ts` — add CreateEntityDto

- [ ] **Step 4: Commit spec update**

```bash
git add docs/superpowers/specs/2026-07-07-permissions-system-activation-design.md
git commit -m "docs: update permissions spec with EntitiesModule and remove MANAGED_ENTITIES"
```

---

### Task 2: Update Prisma Schema

**Files:**
- Modify: `apps/backend/prisma/schema.prisma`

**Interfaces:**
- Consumes: Current Permission model and User model
- Produces: Entity, UserPermission, DevAccount models with relations

- [ ] **Step 1: Add PermissionScope and PermissionType enums**

Add after the existing enums in schema.prisma:

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

- [ ] **Step 2: Add Entity model**

Add after the enums:

```prisma
model Entity {
  id             String         @id @default(cuid()) @db.VarChar(36)
  name           String         @unique @db.VarChar(50)
  label          String         @db.VarChar(50)
  permissionType PermissionType @default(CRUD)
  isActive       Boolean        @default(true)
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt

  permissions UserPermission[]

  @@map("entities")
}
```

- [ ] **Step 3: Replace Permission model with UserPermission**

Replace the entire `model Permission { ... }` block with:

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

- [ ] **Step 4: Add DevAccount model**

Add after UserPermission:

```prisma
model DevAccount {
  id        String   @id @default(cuid()) @db.VarChar(36)
  userId    String   @unique @db.VarChar(36)
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id])

  @@map("dev_account")
}
```

- [ ] **Step 5: Update User model relations**

Update the User model to reference the new models:

```prisma
model User {
  id           String        @id @default(cuid()) @db.VarChar(36)
  name         String        @db.VarChar(100)
  email        String       @unique @db.VarChar(150)
  passwordHash String        @db.VarChar(255)

  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @default(now()) @updatedAt

  deletedByUserId String? @db.VarChar(36)
  deletedAt DateTime? @db.Timestamp(0)

  accounts     Account[]
  categories   Category[]
  recurrences  Recurrence[]
  transactions Transaction[]
  permissions  UserPermission[]
  devAccount   DevAccount?
}
```

- [ ] **Step 6: Verify schema compiles**

Run: `cd apps/backend && npx prisma validate`
Expected: Valid schema

- [ ] **Step 7: Commit**

```bash
git add apps/backend/prisma/schema.prisma
git commit -m "feat(db): add Entity, UserPermission, DevAccount models with enums"
```

---

### Task 3: Create Migration and Update Seed

**Files:**
- Create: `apps/backend/prisma/migrations/YYYYMMDDHHMMSS-add-permissions-system/`
- Modify: `apps/backend/prisma/seed.ts`

**Interfaces:**
- Consumes: Updated Prisma schema from Task 2
- Produces: Migration SQL, seeded entities + admin permissions

- [ ] **Step 1: Create migration**

Run: `cd apps/backend && npx prisma migrate dev --name add-permissions-system`
Expected: Migration created, Prisma client regenerated

- [ ] **Step 2: Update seed.ts — add entity seeding**

Add entity seeding after the existing category seeding. Add these imports at the top:

```typescript
import { v4 as uuidv4 } from 'uuid';
```

Add entity seeding after categories:

```typescript
// Seed Entities
const entities = [
  { name: 'users', label: 'Usuarios', permissionType: 'CRUD' },
  { name: 'user_permissions', label: 'Permisos', permissionType: 'CRUD' },
  { name: 'accounts', label: 'Cuentas', permissionType: 'CRUD' },
  { name: 'transactions', label: 'Transacciones', permissionType: 'CRUD' },
  { name: 'recurrences', label: 'Recurrencias', permissionType: 'CRUD' },
  { name: 'cards', label: 'Tarjetas', permissionType: 'CRUD' },
  { name: 'categories', label: 'Categorías', permissionType: 'READ_ONLY' },
  { name: 'dashboard', label: 'Dashboard', permissionType: 'READ_ONLY' },
  { name: 'audit_logs', label: 'Auditoría', permissionType: 'READ_ONLY' },
  { name: 'user_profile', label: 'Perfil', permissionType: 'READ_ONLY' },
];

const createdEntities = await Promise.all(
  entities.map((e) =>
    prisma.entity.upsert({
      where: { name: e.name },
      update: {},
      create: {
        id: uuidv4(),
        name: e.name,
        label: e.label,
        permissionType: e.permissionType as any,
      },
    })
  )
);

console.log(`Seeded ${createdEntities.length} entities`);
```

- [ ] **Step 3: Update seed.ts — add admin permissions**

Add after entity seeding:

```typescript
// Seed admin permissions (full CRUD+ALL on all entities)
const adminUser = await prisma.user.findUnique({ where: { email: 'user@admin.com' } });
if (adminUser) {
  for (const entity of createdEntities) {
    await prisma.userPermission.upsert({
      where: {
        userId_entityId: { userId: adminUser.id, entityId: entity.id },
      },
      update: {},
      create: {
        id: uuidv4(),
        userId: adminUser.id,
        entityId: entity.id,
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
        scope: 'ALL',
        permissionType: entity.permissionType as any,
      },
    });
  }
  console.log(`Seeded permissions for admin user on ${createdEntities.length} entities`);

  // Seed dev account for admin
  await prisma.devAccount.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      id: uuidv4(),
      userId: adminUser.id,
    },
  });
  console.log('Seeded dev account for admin user');
}
```

- [ ] **Step 4: Run seed**

Run: `cd apps/backend && npx prisma db seed`
Expected: Entities, permissions, and dev account seeded successfully

- [ ] **Step 5: Verify seed data**

Run: `cd apps/backend && npx prisma studio`
Check: 10 entities in `entities` table, 10 permission records for admin in `user_permissions`, 1 dev_account record

- [ ] **Step 6: Commit**

```bash
git add apps/backend/prisma/migrations/ apps/backend/prisma/seed.ts
git commit -m "feat(db): add permissions migration and seed entities + admin permissions"
```

---

### Task 4: Add CreateEntityDto to @repo/shared

**Files:**
- Modify: `packages/shared/src/schemas/permissions.schema.ts`
- Modify: `packages/shared/src/index.ts` (verify export)

**Interfaces:**
- Consumes: Existing Zod schemas in permissions.schema.ts
- Produces: `CreateEntityDto` type for EntitiesModule

- [ ] **Step 1: Add CreateEntityDto to permissions.schema.ts**

Add at the end of `packages/shared/src/schemas/permissions.schema.ts`:

```typescript
export const CreateEntityDto = z.object({
  name: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/, 'Name must contain only letters, numbers, and underscores')
    .transform((s) => s.toLowerCase()),
  label: z.string().min(1).max(50),
  permissionType: PermissionTypeSchema,
});
export type CreateEntityDto = z.infer<typeof CreateEntityDto>;
```

- [ ] **Step 2: Verify export in index.ts**

Check that `packages/shared/src/index.ts` exports from permissions.schema. It should already have:
```typescript
export * from "./schemas/permissions.schema";
```

- [ ] **Step 3: Build shared package**

Run: `cd apps/packages/shared && pnpm build`
Expected: Build succeeds, CreateEntityDto is exported

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/schemas/permissions.schema.ts
git commit -m "feat(shared): add CreateEntityDto schema for entity creation"
```

---

### Task 5: Create EntitiesModule

**Files:**
- Create: `apps/backend/src/modules/entities/entities.controller.ts`
- Create: `apps/backend/src/modules/entities/entities.service.ts`
- Create: `apps/backend/src/modules/entities/repositories/entities.repository.ts`
- Create: `apps/backend/src/modules/entities/entities.module.ts`
- Modify: `apps/backend/src/app.module.ts` — add EntitiesModule import

**Interfaces:**
- Consumes: CreateEntityDto from @repo/shared, PrismaService, AuthUser, @RequirePermission, @CurrentUser
- Produces: EntitiesController (4 endpoints), EntitiesService, EntitiesRepository, EntitiesModule

- [ ] **Step 1: Create entities.repository.ts**

```typescript
// apps/backend/src/modules/entities/repositories/entities.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CreateEntityDto } from '@repo/shared';

@Injectable()
export class EntitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.entity.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findByName(name: string) {
    return this.prisma.entity.findUnique({ where: { name } });
  }

  async findById(id: string) {
    return this.prisma.entity.findUnique({ where: { id } });
  }

  async create(data: CreateEntityDto) {
    return this.prisma.entity.create({
      data: {
        name: data.name,
        label: data.label,
        permissionType: data.permissionType,
      },
    });
  }

  async softDelete(id: string) {
    return this.prisma.entity.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
```

- [ ] **Step 2: Create entities.service.ts**

```typescript
// apps/backend/src/modules/entities/entities.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { EntitiesRepository } from './repositories/entities.repository';
import { PermissionsRepository } from '../permissions/repositories/permissions.repository';
import { CreateEntityDto } from '@repo/shared';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EntitiesService {
  constructor(
    private readonly entitiesRepo: EntitiesRepository,
    private readonly permissionsRepo: PermissionsRepository,
  ) {}

  async findAll() {
    return this.entitiesRepo.findAll();
  }

  async findByName(name: string) {
    return this.entitiesRepo.findByName(name);
  }

  async createEntity(data: CreateEntityDto, creatorUserId: string) {
    const existing = await this.entitiesRepo.findByName(data.name);
    if (existing) {
      throw new ConflictException(`Entity with name "${data.name}" already exists`);
    }

    const entity = await this.entitiesRepo.create(data);

    // Auto-grant full permissions to creator
    await this.permissionsRepo.upsert({
      id: uuidv4(),
      userId: creatorUserId,
      entityId: entity.id,
      entityName: entity.name,
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
      scope: 'ALL',
      permissionType: data.permissionType,
    });

    return entity;
  }

  async softDelete(id: string) {
    return this.entitiesRepo.softDelete(id);
  }
}
```

- [ ] **Step 3: Create entities.controller.ts**

```typescript
// apps/backend/src/modules/entities/entities.controller.ts
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { CreateEntityDto } from '@repo/shared';
import type { AuthUser } from '../../auth/interfaces/authRequest.interface';

@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get('tables')
  @RequirePermission({ tableName: 'entities', action: 'read', scope: 'ALL' })
  getAllTables() {
    return this.entitiesService.findAll();
  }

  @Get('table/:tableName')
  @RequirePermission({ tableName: 'entities', action: 'read', scope: 'ALL' })
  getTableByName(@Param('tableName') tableName: string) {
    return this.entitiesService.findByName(tableName);
  }

  @Post('entity')
  @RequirePermission({ tableName: 'entities', action: 'create', scope: 'ALL' })
  async createEntity(
    @Body() data: CreateEntityDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.entitiesService.createEntity(data, user.id);
  }

  @Delete(':id')
  @RequirePermission({ tableName: 'entities', action: 'delete', scope: 'ALL' })
  async softDelete(@Param('id') id: string) {
    return this.entitiesService.softDelete(id);
  }
}
```

- [ ] **Step 4: Create entities.module.ts**

```typescript
// apps/backend/src/modules/entities/entities.module.ts
import { Module } from '@nestjs/common';
import { EntitiesController } from './entities.controller';
import { EntitiesService } from './entities.service';
import { EntitiesRepository } from './repositories/entities.repository';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [PermissionsModule],
  controllers: [EntitiesController],
  providers: [EntitiesService, EntitiesRepository],
  exports: [EntitiesService],
})
export class EntitiesModule {}
```

- [ ] **Step 5: Register EntitiesModule in app.module.ts**

Add import and add to imports array in `apps/backend/src/app.module.ts`:

```typescript
import { EntitiesModule } from './modules/entities/entities.module';
```

Add `EntitiesModule` to the `imports` array.

- [ ] **Step 6: Verify compilation**

Run: `cd apps/backend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 7: Commit**

```bash
git add apps/backend/src/modules/entities/ apps/backend/src/app.module.ts
git commit -m "feat(backend): add EntitiesModule with CRUD endpoints for entity management"
```

---

### Task 6: Update PermissionsGuard and Decorator

**Files:**
- Modify: `apps/backend/src/modules/permissions/guards/permissions.guard.ts`
- Modify: `apps/backend/src/modules/permissions/decorators/require-permission.decorator.ts`
- Modify: `apps/backend/src/modules/permissions/interfaces/permission.interface.ts`

**Interfaces:**
- Consumes: Current guard, decorator, and interface files
- Produces: Updated guard (deny-by-default), renamed metadata field

- [ ] **Step 1: Update permission.interface.ts**

Change `RequirePermissionMetadata` from `table` to `tableName`:

```typescript
export interface RequirePermissionMetadata {
  tableName: string;     // was "table"
  action: 'create' | 'read' | 'update' | 'delete';
  scope?: PermissionScope;
}
```

- [ ] **Step 2: Update permissions.guard.ts — deny-by-default**

Change the line `if (!permissionMeta) return true;` to:

```typescript
if (!permissionMeta) {
  throw new ForbiddenException('No permission metadata configured for this route');
}
```

Also update the error message in the `!allowed` block to use `permissionMeta.tableName` instead of `permissionMeta.table`:

```typescript
if (!allowed) {
  throw new ForbiddenException(
    `Insufficient permissions: ${permissionMeta.action} on ${permissionMeta.tableName}`,
  );
}
```

- [ ] **Step 3: Update require-permission.decorator.ts (no change needed)**

The decorator itself doesn't need changes — it just passes through the metadata. The interface change in Step 1 handles it.

- [ ] **Step 4: Verify compilation**

Run: `cd apps/backend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add apps/backend/src/modules/permissions/guards/permissions.guard.ts \
        apps/backend/src/modules/permissions/interfaces/permission.interface.ts
git commit -m "feat(backend): update PermissionsGuard to deny-by-default and rename metadata field"
```

---

### Task 7: Update PermissionsModule

**Files:**
- Modify: `apps/backend/src/modules/permissions/permissions.service.ts`
- Modify: `apps/backend/src/modules/permissions/repositories/permissions.repository.ts`
- Modify: `apps/backend/src/modules/permissions/permissions.controller.ts`
- Modify: `apps/backend/src/modules/permissions/permissions.module.ts`

**Interfaces:**
- Consumes: Entity model (from Prisma), updated interface with `tableName`
- Produces: Updated service (joins Entity, canPerform uses tableName), repository (joins Entity), controller (GET /permissions/me), module (adds EntitiesModule import)

- [ ] **Step 1: Update permissions.repository.ts — join with Entity**

Replace the entire file:

```typescript
// apps/backend/src/modules/permissions/repositories/permissions.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import {
  UserPermissionRecord,
  PermissionScope,
  PermissionType,
} from '../interfaces/permission.interface';

@Injectable()
export class PermissionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<UserPermissionRecord[]> {
    const records = await this.prisma.userPermission.findMany({
      where: { userId },
      include: { entity: { select: { name: true } } },
    });
    return records
      .filter((r) => r.entity !== null)
      .map((r) => ({
        userId: r.userId,
        entityId: r.entityId,
        entityName: r.entity.name,
        canCreate: r.canCreate,
        canRead: r.canRead,
        canUpdate: r.canUpdate,
        canDelete: r.canDelete,
        scope: r.scope as PermissionScope,
        permissionType: r.permissionType as PermissionType,
      }));
  }

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

  async findManyByEntityId(entityId: string) {
    const records = await this.prisma.userPermission.findMany({
      where: { entityId },
      include: { user: { select: { name: true } }, entity: { select: { name: true } } },
    });
    return records.map((r) => ({
      userId: r.userId,
      entityId: r.entityId,
      entityName: r.entity?.name || 'Unknown',
      canCreate: r.canCreate,
      canRead: r.canRead,
      canUpdate: r.canUpdate,
      canDelete: r.canDelete,
      scope: r.scope as PermissionScope,
      permissionType: r.permissionType as PermissionType,
      username: r.user?.name || 'Unknown',
      createdAt: r.createdAt,
    }));
  }

  async upsert(data: UserPermissionRecord & { id?: string }) {
    const entity = await this.prisma.entity.findUnique({
      where: { name: data.entityName },
    });
    if (!entity) throw new Error(`Entity "${data.entityName}" not found`);

    return this.prisma.userPermission.upsert({
      where: {
        userId_entityId: { userId: data.userId, entityId: entity.id },
      },
      update: {
        canCreate: data.canCreate,
        canRead: data.canRead,
        canUpdate: data.canUpdate,
        canDelete: data.canDelete,
        scope: data.scope,
        permissionType: data.permissionType,
      },
      create: {
        id: data.id,
        userId: data.userId,
        entityId: entity.id,
        canCreate: data.canCreate,
        canRead: data.canRead,
        canUpdate: data.canUpdate,
        canDelete: data.canDelete,
        scope: data.scope,
        permissionType: data.permissionType,
      },
    });
  }

  async deleteAllForUser(userId: string): Promise<void> {
    await this.prisma.userPermission.deleteMany({ where: { userId } });
  }
}
```

- [ ] **Step 2: Update permissions.service.ts**

Replace the entire file:

```typescript
// apps/backend/src/modules/permissions/permissions.service.ts
import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from './repositories/permissions.repository';
import {
  UserPermissionRecord,
  RequirePermissionMetadata,
} from './interfaces/permission.interface';
import type { UserPermissions, UserEntityPermission } from '@repo/shared';

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
    const record = permissions.find((p) => p.entityName === meta.tableName);

    if (!record) return false;

    if (record.permissionType === 'READ_ONLY' && meta.action !== 'read') {
      return false;
    }

    if (record.permissionType === 'PROCESS' && meta.action !== 'create' && meta.action !== 'read') {
      return false;
    }

    if (record.scope === 'NONE') return false;

    const actionKey = `can${meta.action.charAt(0).toUpperCase() + meta.action.slice(1)}` as keyof Pick<UserPermissionRecord, 'canCreate' | 'canRead' | 'canUpdate' | 'canDelete'>;
    const hasAction = record[actionKey];
    if (!hasAction) return false;

    if (meta.scope === 'ALL' && record.scope !== 'ALL') return false;
    if (meta.scope === 'OWN' && record.scope === 'NONE') return false;

    return true;
  }

  async getUserPermissionsByUserId(userId: string): Promise<UserPermissions> {
    const records = await this.permissionsRepo.findManyByUserId(userId);
    const map: UserPermissions = {};
    for (const r of records) {
      if (r.entity) {
        map[r.entity.name] = {
          canCreate: r.canCreate,
          canRead: r.canRead,
          canUpdate: r.canUpdate,
          canDelete: r.canDelete,
          scope: r.scope,
          permissionType: r.permissionType,
        };
      }
    }
    return map;
  }

  async getUserPermissionsByEntityId(
    entityId: string,
  ): Promise<UserEntityPermission[]> {
    const records = await this.permissionsRepo.findManyByEntityId(entityId);
    return records.map((r) => ({
      userId: r.userId,
      username: r.username || 'Unknown',
      permissions: {
        canCreate: r.canCreate,
        canRead: r.canRead,
        canUpdate: r.canUpdate,
        canDelete: r.canDelete,
        scope: r.scope,
        permissionType: r.permissionType,
      },
      createdAt: r.createdAt || new Date(),
    }));
  }

  async setPermissionsForUser(
    userId: string,
    permissions: Array<{
      tableName: string;
      canCreate: boolean;
      canRead: boolean;
      canUpdate: boolean;
      canDelete: boolean;
      scope: 'NONE' | 'OWN' | 'ALL';
      permissionType: 'CRUD' | 'PROCESS' | 'READ_ONLY';
    }>,
  ): Promise<void> {
    await this.permissionsRepo.deleteAllForUser(userId);
    for (const p of permissions) {
      await this.permissionsRepo.upsert({
        userId,
        entityId: '', // will be resolved by upsert via entity name lookup
        entityName: p.tableName,
        canCreate: p.canCreate,
        canRead: p.canRead,
        canUpdate: p.canUpdate,
        canDelete: p.canDelete,
        scope: p.scope,
        permissionType: p.permissionType,
      });
    }
  }
}
```

- [ ] **Step 3: Update permissions.controller.ts — add GET /permissions/me and decorators**

Replace the entire file:

```typescript
// apps/backend/src/modules/permissions/permissions.controller.ts
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { RequirePermission } from './decorators/require-permission.decorator';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import type { AuthUser } from '../../auth/interfaces/authRequest.interface';
import type {
  UserPermissions,
  UserEntityPermission,
  Entity,
} from '@repo/shared';
import { EntitiesService } from '../entities/entities.service';

@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly entitiesService: EntitiesService,
  ) {}

  @Get('me')
  @RequirePermission({ tableName: 'user_profile', action: 'read', scope: 'OWN' })
  async getMyPermissions(@CurrentUser() user: AuthUser): Promise<UserPermissions> {
    return this.permissionsService.getUserPermissionsByUserId(user.id);
  }

  @Get('tables')
  @RequirePermission({ tableName: 'user_permissions', action: 'read', scope: 'ALL' })
  async getAllTables(): Promise<Entity[]> {
    const entities = await this.entitiesService.findAll();
    return entities.map((e) => ({
      id: e.id,
      name: e.name,
      label: e.label,
      permissionType: e.permissionType,
    }));
  }

  @Get('user/:userId')
  @RequirePermission({ tableName: 'user_permissions', action: 'read' })
  async getUserPermissions(
    @Param('userId') userId: string,
  ): Promise<UserPermissions> {
    return this.permissionsService.getUserPermissionsByUserId(userId);
  }

  @Get('entity/:entityId')
  @RequirePermission({ tableName: 'user_permissions', action: 'read' })
  async getEntityPermissions(
    @Param('entityId') entityId: string,
  ): Promise<UserEntityPermission[]> {
    return this.permissionsService.getUserPermissionsByEntityId(entityId);
  }

  @Patch('user/:userId')
  @RequirePermission({ tableName: 'user_permissions', action: 'update', scope: 'ALL' })
  async setUserPermissions(
    @Param('userId') userId: string,
    @Body('permissions')
    permissions: Array<{
      tableName: string;
      canCreate: boolean;
      canRead: boolean;
      canUpdate: boolean;
      canDelete: boolean;
      scope: 'NONE' | 'OWN' | 'ALL';
      permissionType: 'CRUD' | 'PROCESS' | 'READ_ONLY';
    }>,
  ): Promise<{ success: boolean }> {
    await this.permissionsService.setPermissionsForUser(userId, permissions);
    return { success: true };
  }
}
```

- [ ] **Step 4: Update permissions.module.ts — add EntitiesModule import**

```typescript
// apps/backend/src/modules/permissions/permissions.module.ts
import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsRepository } from './repositories/permissions.repository';
import { PermissionsGuard } from './guards/permissions.guard';
import { PermissionsController } from './permissions.controller';
import { EntitiesModule } from '../entities/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsRepository, PermissionsGuard],
  exports: [PermissionsService, PermissionsGuard],
})
export class PermissionsModule {}
```

- [ ] **Step 5: Verify compilation**

Run: `cd apps/backend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add apps/backend/src/modules/permissions/
git commit -m "feat(backend): update PermissionsModule with Entity joins and GET /permissions/me"
```

---

### Task 8: Create DevAccountRepository

**Files:**
- Create: `apps/backend/src/modules/permissions/repositories/dev-account.repository.ts`
- Modify: `apps/backend/src/modules/permissions/permissions.module.ts` — add to providers

**Interfaces:**
- Consumes: PrismaService
- Produces: DevAccountRepository with `isDevAccount(userId)` method

- [ ] **Step 1: Create dev-account.repository.ts**

```typescript
// apps/backend/src/modules/permissions/repositories/dev-account.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';

@Injectable()
export class DevAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async isDevAccount(userId: string): Promise<boolean> {
    const count = await this.prisma.devAccount.count({ where: { userId } });
    return count > 0;
  }

  async findByUserId(userId: string) {
    return this.prisma.devAccount.findUnique({ where: { userId } });
  }
}
```

- [ ] **Step 2: Add to permissions.module.ts providers**

Add `DevAccountRepository` to the providers array in `permissions.module.ts`:

```typescript
providers: [PermissionsService, PermissionsRepository, PermissionsGuard, DevAccountRepository],
```

Add import:
```typescript
import { DevAccountRepository } from './repositories/dev-account.repository';
```

- [ ] **Step 3: Verify compilation**

Run: `cd apps/backend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add apps/backend/src/modules/permissions/repositories/dev-account.repository.ts \
        apps/backend/src/modules/permissions/permissions.module.ts
git commit -m "feat(backend): add DevAccountRepository for future super-admin bypass"
```

---

### Task 9: Add @RequirePermission to ALL Controllers

**Files:**
- Modify: `apps/backend/src/modules/auth/auth.controller.ts`
- Modify: `apps/backend/src/modules/users/users.controller.ts`
- Modify: `apps/backend/src/modules/accounts/account.controller.ts`
- Modify: `apps/backend/src/modules/transactions/transaction.controller.ts`
- Modify: `apps/backend/src/modules/recurrences/recurrence.controller.ts`
- Modify: `apps/backend/src/modules/cards/card.controller.ts`
- Modify: `apps/backend/src/modules/categories/categories.controller.ts`
- Modify: `apps/backend/src/modules/dashboard/dashboard.controller.ts`
- Modify: `apps/backend/src/modules/auditLog/auditLog.controller.ts`

**Interfaces:**
- Consumes: `@RequirePermission` decorator, `RequirePermissionMetadata` interface
- Produces: All controller routes decorated with permission metadata

- [ ] **Step 1: Add @RequirePermission to auth.controller.ts**

Add import:
```typescript
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';
```

Add decorators (login and register keep `@Public()`):
- `POST /auth/refresh` → `@RequirePermission({ tableName: 'user_profile', action: 'read', scope: 'OWN' })`
- `POST /auth/logout` → `@RequirePermission({ tableName: 'user_profile', action: 'read', scope: 'OWN' })`
- `PATCH /auth/password` → `@RequirePermission({ tableName: 'user_profile', action: 'read', scope: 'OWN' })`

- [ ] **Step 2: Add @RequirePermission to users.controller.ts**

- `GET /users` → `@RequirePermission({ tableName: 'users', action: 'read' })`
- `GET /users/me` → `@RequirePermission({ tableName: 'user_profile', action: 'read' })`

- [ ] **Step 3: Add @RequirePermission to account.controller.ts**

- `GET /accounts` → `@RequirePermission({ tableName: 'accounts', action: 'read' })`
- `GET /accounts/:id` → `@RequirePermission({ tableName: 'accounts', action: 'read' })`
- `POST /accounts` → `@RequirePermission({ tableName: 'accounts', action: 'create' })`

- [ ] **Step 4: Add @RequirePermission to transaction.controller.ts**

- `GET /transactions` → `@RequirePermission({ tableName: 'transactions', action: 'read' })`
- `GET /transactions/:id` → `@RequirePermission({ tableName: 'transactions', action: 'read' })`
- `GET /transactions/month/:month/:year` → `@RequirePermission({ tableName: 'transactions', action: 'read' })`
- `POST /transactions` → `@RequirePermission({ tableName: 'transactions', action: 'create' })`

- [ ] **Step 5: Add @RequirePermission to recurrence.controller.ts**

- `GET /recurrences` → `@RequirePermission({ tableName: 'recurrences', action: 'read' })`
- `GET /recurrences/:id` → `@RequirePermission({ tableName: 'recurrences', action: 'read' })`
- `GET /recurrences/month/:month/:year/:type` → `@RequirePermission({ tableName: 'recurrences', action: 'read' })`

- [ ] **Step 6: Add @RequirePermission to card.controller.ts**

- `GET /cards` → `@RequirePermission({ tableName: 'cards', action: 'read' })`
- `GET /cards/account/:accountId` → `@RequirePermission({ tableName: 'cards', action: 'read' })`
- `GET /cards/month/:year/:month` → `@RequirePermission({ tableName: 'cards', action: 'read' })`
- `GET /cards/close/:year/:month` → `@RequirePermission({ tableName: 'cards', action: 'read' })`
- `POST /cards/close` → `@RequirePermission({ tableName: 'cards', action: 'create' })`

- [ ] **Step 7: Add @RequirePermission to categories.controller.ts**

- `GET /categories` → `@RequirePermission({ tableName: 'categories', action: 'read' })`
- `GET /categories/:id` → `@RequirePermission({ tableName: 'categories', action: 'read' })`

- [ ] **Step 8: Add @RequirePermission to dashboard.controller.ts**

- `GET /dashboard/budget` → `@RequirePermission({ tableName: 'dashboard', action: 'read' })`
- `GET /dashboard/recentAccounts` → `@RequirePermission({ tableName: 'dashboard', action: 'read' })`
- `GET /dashboard/income-expense/:months` → `@RequirePermission({ tableName: 'dashboard', action: 'read' })`
- `GET /dashboard/toPay` → `@RequirePermission({ tableName: 'dashboard', action: 'read' })`

- [ ] **Step 9: Add @RequirePermission to auditLog.controller.ts**

- `GET /audit-logs` → `@RequirePermission({ tableName: 'audit_logs', action: 'read', scope: 'ALL' })`

- [ ] **Step 10: Verify compilation**

Run: `cd apps/backend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 11: Commit**

```bash
git add apps/backend/src/modules/
git commit -m "feat(backend): add @RequirePermission decorators to all controller routes"
```

---

### Task 10: Update Shared Package — Remove Dead Code

**Files:**
- Modify: `packages/shared/src/schemas/auth.schema.ts`
- Modify: `packages/shared/src/constants/managed-entities.ts`
- Verify: `packages/shared/src/index.ts`

**Interfaces:**
- Consumes: Current auth schema and managed-entities constants
- Produces: Clean shared package without dead code

- [ ] **Step 1: Remove AuthUserPermissionsSchema from auth.schema.ts**

Remove these lines from `packages/shared/src/schemas/auth.schema.ts`:

```typescript
export const AuthUserPermissionsSchema = z.object({
  isAdmin: z.boolean().default(false),
  permissions: z.array(z.string()).default([]),
});

export type AuthUserPermissions = z.infer<typeof AuthUserPermissionsSchema>;
```

- [ ] **Step 2: Remove MANAGED_ENTITIES from managed-entities.ts**

Replace the entire file with:

```typescript
// packages/shared/src/constants/managed-entities.ts

export const SYSTEM_ENTITIES = [
  "user_profile",
  "dev_account",
  "audit_logs",
  "entities",
] as const;
```

Remove: `MANAGED_ENTITIES`, `MANAGED_ENTITY_ARRAY`, `ALLOWED_TABLE_NAMES`, `ManagedEntityKey`, `ManagedTableName`.

- [ ] **Step 3: Verify shared package builds**

Run: `cd apps/packages/shared && pnpm build`
Expected: Build succeeds

- [ ] **Step 4: Verify backend compiles**

Run: `cd apps/backend && npx tsc --noEmit`
Expected: No errors (any imports of AuthUserPermissions or MANAGED_ENTITIES should have been removed in earlier tasks)

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/schemas/auth.schema.ts \
        packages/shared/src/constants/managed-entities.ts
git commit -m "refactor(shared): remove AuthUserPermissionsSchema and MANAGED_ENTITIES dead code"
```

---

### Task 11: Update Frontend Auth — Real API Call

**Files:**
- Modify: `apps/frontend/src/features/auth/api/authService.ts`
- Modify: `apps/frontend/src/features/auth/hooks/use-permissions.ts`
- Modify: `apps/frontend/src/features/auth/providers/AuthProvider.tsx`

**Interfaces:**
- Consumes: `UserPermissions` type from @repo/shared (replaces `AuthUserPermissions`)
- Produces: Real API call, updated hook, updated context

- [ ] **Step 1: Update authService.ts — real API call**

Replace the `getPermissionsMe` method:

```typescript
getPermissionsMe: () => {
  return clientFetch<UserPermissions>("permissions/me", {
    method: "GET",
  });
},
```

Update imports: replace `AuthUserPermissions` with `UserPermissions` from `@repo/shared`.

- [ ] **Step 2: Update use-permissions.ts — use UserPermissions type**

Replace the entire file:

```typescript
// apps/frontend/src/features/auth/hooks/use-permissions.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { UserPermissions } from "@repo/shared";
import { authService } from "../api/authService";
import { permissionsQueryKeys } from "@/lib/queryKeys";

export const usePermissions = () => {
  const { isSignedIn } = useAuth();

  return useQuery<UserPermissions>({
    queryKey: permissionsQueryKeys.me(),
    queryFn: authService.getPermissionsMe,
    enabled: isSignedIn,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};
```

- [ ] **Step 3: Update AuthProvider.tsx — use UserPermissions type**

Update imports: replace `AuthUserPermissions` with `UserPermissions`.

Update the context type:
```typescript
permissions: UserPermissions;
```

Update the default value:
```typescript
permissions: permissions.data || {},
```

- [ ] **Step 4: Verify compilation**

Run: `cd apps/frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add apps/frontend/src/features/auth/
git commit -m "feat(frontend): replace hardcoded permissions with real API call to GET /permissions/me"
```

---

### Task 12: Update usePermission Hook and Navigation Filtering

**Files:**
- Modify: `apps/frontend/src/hooks/usePermission.ts`

**Interfaces:**
- Consumes: `UserPermissions` (Record<string, TablePermission>) from context
- Produces: Updated `usePermission()` hook, `filterNavigation()` pure function

- [ ] **Step 1: Replace usePermission.ts**

Replace the entire file:

```typescript
// apps/frontend/src/hooks/usePermission.ts
"use client";

import { useMemo } from "react";
import { useAuthContext } from "@/features/auth/providers/AuthProvider";
import type {
  NavigationConfig,
  NavigationItem,
  NavigationSubGroup,
} from "@/lib/config/navigation.types";
import type { UserPermissions } from "@repo/shared";

export function usePermission(tableName?: string) {
  const { permissions } = useAuthContext();
  const tablePermissions = permissions[tableName];

  return {
    canRead: tablePermissions?.canRead || false,
    canCreate: tablePermissions?.canCreate || false,
    canUpdate: tablePermissions?.canUpdate || false,
    canDelete: tablePermissions?.canDelete || false,
    scope: tablePermissions?.scope || "NONE",
    permissionType: tablePermissions?.permissionType || "READ_ONLY",
  };
}

function hasReadPermission(
  item: NavigationItem,
  permissions: UserPermissions,
): boolean {
  if (!item.requiredPermission) return true;
  const perm = permissions[item.requiredPermission.table];
  return !!perm?.canRead;
}

function filterItems(
  items: NavigationItem[],
  permissions: UserPermissions,
): NavigationItem[] {
  return items.filter((item) => hasReadPermission(item, permissions));
}

function isSubGroup(
  item: NavigationSubGroup | NavigationItem,
): item is NavigationSubGroup {
  return "kind" in item && item.kind === "subGroup";
}

export function filterNavigation(
  config: NavigationConfig,
  permissions: UserPermissions,
): NavigationConfig {
  return config
    .map((entry) => {
      switch (entry.kind) {
        case "standalone":
          return hasReadPermission(entry, permissions) ? entry : null;

        case "group": {
          const items = filterItems(entry.items, permissions);
          return items.length > 0 ? { ...entry, items } : null;
        }

        case "nestedGroup": {
          const items = entry.items
            .map((item) => {
              if (isSubGroup(item)) {
                const filtered = filterItems(item.items, permissions);
                return filtered.length > 0
                  ? { ...item, items: filtered }
                  : null;
              }
              return hasReadPermission(item, permissions) ? item : null;
            })
            .filter((item): item is NonNullable<typeof item> => item !== null);
          return items.length > 0 ? { ...entry, items } : null;
        }

        default:
          return null;
      }
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
}

export function useFilteredNavigation(config: NavigationConfig): NavigationConfig {
  const { permissions } = useAuthContext();
  return useMemo(() => filterNavigation(config, permissions), [config, permissions]);
}
```

- [ ] **Step 2: Verify compilation**

Run: `cd apps/frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add apps/frontend/src/hooks/usePermission.ts
git commit -m "feat(frontend): update usePermission hook for structured UserPermissions objects"
```

---

### Task 13: Update Sidebar Components to Use filterNavigation

**Files:**
- Modify: `apps/frontend/src/components/layout/desktop-sidebar.tsx`
- Modify: `apps/frontend/src/components/layout/mobile-navigation.tsx`

**Interfaces:**
- Consumes: `useFilteredNavigation` from usePermission.ts
- Produces: Sidebar components using filtered navigation

- [ ] **Step 1: Update desktop-sidebar.tsx**

Replace the navigation filtering logic. Find the line where `useFilteredNavigation` is called and ensure it uses the new import:

```typescript
import { useFilteredNavigation } from "@/hooks/usePermission";
```

The existing call should work as-is since the function signature hasn't changed.

- [ ] **Step 2: Update mobile-navigation.tsx**

Same update — ensure import is correct:

```typescript
import { useFilteredNavigation } from "@/hooks/usePermission";
```

- [ ] **Step 3: Verify compilation**

Run: `cd apps/frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add apps/frontend/src/components/layout/desktop-sidebar.tsx \
        apps/frontend/src/components/layout/mobile-navigation.tsx
git commit -m "feat(frontend): update sidebar components to use filterNavigation"
```

---

### Task 14: Add PendingPermissionsPage

**Files:**
- Create: `apps/frontend/src/components/common/pending-permissions.tsx`
- Modify: `apps/frontend/src/app/[locale]/(dashboard)/layout.tsx` (or wherever the dashboard layout is)
- Modify: `apps/frontend/messages/en.json` — add pending permissions translations
- Modify: `apps/frontend/messages/es.json` — add pending permissions translations

**Interfaces:**
- Consumes: `useAuthContext()` with `isPendingPermissions` flag
- Produces: PendingPermissionsPage component, layout guard

- [ ] **Step 1: Add i18n translations**

Add to `messages/en.json`:
```json
"PendingPermissions": {
  "title": "Waiting for Permissions",
  "message": "Your account has been created but no permissions have been assigned yet. Please contact an administrator.",
  "contactAdmin": "Contact Administrator"
}
```

Add to `messages/es.json`:
```json
"PendingPermissions": {
  "title": "Esperando Permisos",
  "message": "Tu cuenta ha sido creada pero aún no se han asignado permisos. Por favor contacta a un administrador.",
  "contactAdmin": "Contactar Administrador"
}
```

- [ ] **Step 2: Create pending-permissions.tsx**

```tsx
// apps/frontend/src/components/common/pending-permissions.tsx
"use client";

import { useTranslations } from "next-intl";

export function PendingPermissionsPage() {
  const t = useTranslations("PendingPermissions");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 text-6xl">🔒</div>
        <h1 className="mb-4 text-2xl font-bold">{t("title")}</h1>
        <p className="mb-8 text-muted-foreground">{t("message")}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add pending permissions guard to dashboard layout**

Find the dashboard layout file (likely `apps/frontend/src/app/[locale]/(dashboard)/layout.tsx`) and add the pending permissions check:

```typescript
import { PendingPermissionsPage } from "@/components/common/pending-permissions";

// In the layout component:
const { isPendingPermissions } = useAuthContext();
if (isPendingPermissions) {
  return <PendingPermissionsPage />;
}
```

- [ ] **Step 4: Verify compilation**

Run: `cd apps/frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add apps/frontend/src/components/common/pending-permissions.tsx \
        apps/frontend/src/app/\[locale\]/\(dashboard\)/layout.tsx \
        apps/frontend/messages/en.json \
        apps/frontend/messages/es.json
git commit -m "feat(frontend): add PendingPermissionsPage for users without assigned permissions"
```

---

### Task 15: Run Tests and Verify

**Files:**
- All modified files from previous tasks

**Interfaces:**
- Consumes: All completed tasks
- Produces: Passing tests, verified build

- [ ] **Step 1: Build shared package**

Run: `cd apps/packages/shared && pnpm build`
Expected: Build succeeds

- [ ] **Step 2: Run backend lint**

Run: `cd apps && pnpm lint`
Expected: 0 errors (warnings are pre-existing)

- [ ] **Step 3: Run backend tests**

Run: `cd apps && pnpm test`
Expected: All tests pass

- [ ] **Step 4: Run frontend build**

Run: `cd apps && pnpm build`
Expected: Build succeeds

- [ ] **Step 5: Run frontend tests**

Run: `cd apps/frontend && pnpm test`
Expected: All tests pass

- [ ] **Step 6: Manual verification**

1. Start dev servers: `pnpm dev`
2. Login as admin (user@admin.com / admin123)
3. Verify: permissions fetched from API (check Network tab for GET /permissions/me)
4. Verify: sidebar shows all items (admin has full permissions)
5. Verify: all routes accessible
6. Test: create a new entity via POST /entities/entity
7. Test: grant reduced permissions via admin UI
8. Verify: sidebar filters based on permissions

- [ ] **Step 7: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: address test failures and compilation errors"
```
