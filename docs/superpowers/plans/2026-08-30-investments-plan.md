# Investments Portfolio View — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/investments` page showing all INVESTMENT accounts as a portfolio list with principal, total earned, and total value.

**Architecture:** New backend `investments` module with one GET endpoint that queries INVESTMENT accounts and aggregates their RETURN transactions. New frontend `investments` feature module with a `DataTable` following existing patterns.

**Tech Stack:** NestJS, Prisma, Next.js 16, TanStack React Table, TanStack React Query (`useSuspenseQuery`), Tailwind CSS, Zod (shared package)

## Global Constraints

- All monetary fields use `Decimal(19,4)`, serialized as `string` in DTOs
- No PATCH/DELETE/PUT endpoints — only GET and POST
- `useSuspenseQuery` exclusively for data fetching (never `useQuery`)
- OKLCH color tokens only — no hardcoded hex/rgb
- `rounded-none` on all custom components (zero-radius)
- `cursor-pointer` on all interactive elements
- `focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2` on interactive elements
- Feature-driven architecture: `src/features/{name}/` (frontend), `src/modules/{name}/` (backend)

---

### Task 1: Backend Repository — Investment Aggregation Query

**Files:**
- Create: `apps/backend/src/modules/investments/repositories/investment.repository.ts`

**Interfaces:**
- Produces: `InvestmentRepository.getInvestmentAccounts(userId)` returning `InvestmentAccountRow[]`

- [ ] **Step 1: Create the investments directory structure**

```bash
mkdir -p apps/backend/src/modules/investments/repositories
```

- [ ] **Step 2: Create the repository**

```ts
// apps/backend/src/modules/investments/repositories/investment.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Prisma } from '@prisma/client';

export type InvestmentAccountRow = {
  id: string;
  name: string;
  currency: string;
  principal: Prisma.Decimal;
  totalEarned: Prisma.Decimal | null;
  transactionCount: bigint;
};

@Injectable()
export class InvestmentRepository {
  constructor(private prisma: PrismaService) {}

  async getInvestmentAccounts(userId: string): Promise<InvestmentAccountRow[]> {
    return this.prisma.$queryRaw<InvestmentAccountRow[]>`
      SELECT
        a.id,
        a.name,
        a.currency,
        a.balance AS principal,
        COALESCE(r.total_earned, 0) AS "totalEarned",
        COALESCE(r.tx_count, 0) AS "transactionCount"
      FROM "Account" a
      LEFT JOIN (
        SELECT
          "sourceAccountId" AS id,
          SUM(amount) AS total_earned,
          COUNT(*) AS tx_count
        FROM "Transaction"
        WHERE type = 'RETURN'
          AND "deletedAt" IS NULL
        GROUP BY "sourceAccountId"
      ) r ON r.id = a.id
      WHERE a.type = 'INVESTMENT'
        AND a."userId" = ${userId}
        AND a."deletedAt" IS NULL
      ORDER BY a.name ASC
    `;
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd apps/backend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add apps/backend/src/modules/investments/
git commit -m "feat(backend): add investment repository with aggregation query"
```

---

### Task 2: Backend Service — Investment Business Logic

**Files:**
- Create: `apps/backend/src/modules/investments/investment.service.ts`

**Interfaces:**
- Consumes: `InvestmentRepository.getInvestmentAccounts(userId)` from Task 1
- Produces: `InvestmentService.getInvestments(userId)` returning `InvestmentDTO[]`

- [ ] **Step 1: Create the service**

```ts
// apps/backend/src/modules/investments/investment.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InvestmentRepository } from './repositories/investment.repository';
import { Currency } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/client';

export interface InvestmentDTO {
  id: string;
  name: string;
  currency: Currency;
  principal: string;
  totalEarned: string;
  totalValue: string;
  transactionCount: number;
}

@Injectable()
export class InvestmentService {
  private readonly logger = new Logger(InvestmentService.name);

  constructor(private readonly investmentRepo: InvestmentRepository) {}

  async getInvestments(userId: string): Promise<InvestmentDTO[]> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting investments for user ${userId}`);

    const rows = await this.investmentRepo.getInvestmentAccounts(userId);

    return rows.map((row) => {
      const principal = row.principal;
      const totalEarned = row.totalEarned ?? new Decimal(0);
      const totalValue = principal.plus(totalEarned);

      return {
        id: row.id,
        name: row.name,
        currency: row.currency as Currency,
        principal: principal.toString(),
        totalEarned: totalEarned.toString(),
        totalValue: totalValue.toString(),
        transactionCount: Number(row.transactionCount),
      };
    });
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd apps/backend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add apps/backend/src/modules/investments/investment.service.ts
git commit -m "feat(backend): add investment service with DTO mapping"
```

---

### Task 3: Backend Controller — GET /investments

**Files:**
- Create: `apps/backend/src/modules/investments/investment.controller.ts`

**Interfaces:**
- Consumes: `InvestmentService.getInvestments(userId)` from Task 2

- [ ] **Step 1: Create the controller**

```ts
// apps/backend/src/modules/investments/investment.controller.ts

import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { InvestmentService, InvestmentDTO } from './investment.service';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';

@Controller('investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'accounts', action: 'read' })
  async getInvestments(@CurrentUser() user: AuthUser): Promise<InvestmentDTO[]> {
    return this.investmentService.getInvestments(user.id);
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd apps/backend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add apps/backend/src/modules/investments/investment.controller.ts
git commit -m "feat(backend): add investment controller with GET endpoint"
```

---

### Task 4: Backend Module — Register in App

**Files:**
- Create: `apps/backend/src/modules/investments/investment.module.ts`
- Modify: `apps/backend/src/app.module.ts`

**Interfaces:**
- Produces: `InvestmentsModule` importable by `AppModule`

- [ ] **Step 1: Create the module**

```ts
// apps/backend/src/modules/investments/investment.module.ts

import { Module } from '@nestjs/common';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import { InvestmentRepository } from './repositories/investment.repository';

@Module({
  controllers: [InvestmentController],
  providers: [InvestmentService, InvestmentRepository],
  exports: [InvestmentService],
})
export class InvestmentsModule {}
```

- [ ] **Step 2: Register in app.module.ts**

Add import at the top of `apps/backend/src/app.module.ts`:

```ts
import { InvestmentsModule } from './modules/investments/investment.module';
```

Add to the `imports` array in `@Module`:

```ts
InvestmentsModule,
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd apps/backend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add apps/backend/src/modules/investments/investment.module.ts apps/backend/src/app.module.ts
git commit -m "feat(backend): register InvestmentsModule in app"
```

---

### Task 5: Frontend — Query Keys & Invalidation

**Files:**
- Modify: `apps/frontend/src/lib/queryKeys.ts`
- Modify: `apps/frontend/src/lib/query-invalidation-map.ts`

**Interfaces:**
- Produces: `investmentQueryKeys.all()` for use in hooks

- [ ] **Step 1: Add investment query keys to queryKeys.ts**

Append to `apps/frontend/src/lib/queryKeys.ts`:

```ts
// ─── Investments ──────────────────────────────────────────────────────────
export const investmentQueryKeys = {
  all: () => ["investments"] as const,
};
```

- [ ] **Step 2: Update query invalidation map**

In `apps/frontend/src/lib/query-invalidation-map.ts`, add import:

```ts
import { investmentQueryKeys } from "@/lib/queryKeys";
```

Add `"investments"` to `MutationName` union:

```ts
type MutationName = "createTransaction" | "createAccount" | "updateCardBalance" | "investments";
```

Add entry to `mutationInvalidations`:

```ts
investments: [
  { queryKey: investmentQueryKeys.all() },
],
```

Add investment invalidation to the `createTransaction` entry (append to existing array):

```ts
createTransaction: [
  { queryKey: transactionProfileQueryKeys.all() },
  { queryKey: accountProfileQueryKeys.all() },
  { queryKey: recurrenceProfileQueryKeys.all() },
  { queryKey: cardProfileQueryKeys.all() },
  { queryKey: dashboardQueryKeys.all() },
  { queryKey: investmentQueryKeys.all() },
],
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd apps/frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add apps/frontend/src/lib/queryKeys.ts apps/frontend/src/lib/query-invalidation-map.ts
git commit -m "feat(frontend): add investment query keys and invalidation"
```

---

### Task 6: Frontend — Investments API Service & Hook

**Files:**
- Create: `apps/frontend/src/features/investments/api/investmentsService.ts`
- Create: `apps/frontend/src/features/investments/hooks/investmentsHooks.ts`

**Interfaces:**
- Produces: `investmentsService.fetchAll()` returning `Promise<InvestmentDTO[]>`
- Produces: `useInvestments()` returning `UseSuspenseQueryResult<InvestmentDTO[]>`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p apps/frontend/src/features/investments/{api,hooks,components}
```

- [ ] **Step 2: Create API service**

```ts
// apps/frontend/src/features/investments/api/investmentsService.ts

import { clientFetch } from "@/lib/api/client-fetch";

export interface InvestmentDTO {
  id: string;
  name: string;
  currency: string;
  principal: string;
  totalEarned: string;
  totalValue: string;
  transactionCount: number;
}

export const investmentsService = {
  fetchAll: () => {
    return clientFetch<InvestmentDTO[]>("investments", { method: "GET" });
  },
};
```

- [ ] **Step 3: Create hooks**

```ts
// apps/frontend/src/features/investments/hooks/investmentsHooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { investmentsService, InvestmentDTO } from "../api/investmentsService";
import { investmentQueryKeys } from "@/lib/queryKeys";

export const useInvestments = () => {
  return useSuspenseQuery<InvestmentDTO[]>({
    queryKey: investmentQueryKeys.all(),
    queryFn: investmentsService.fetchAll,
    retry: 1,
  });
};
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `cd apps/frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add apps/frontend/src/features/investments/api/ apps/frontend/src/features/investments/hooks/
git commit -m "feat(frontend): add investments API service and useInvestments hook"
```

---

### Task 7: Frontend — Investments DataTable Columns

**Files:**
- Create: `apps/frontend/src/features/investments/components/columns.tsx`

**Interfaces:**
- Consumes: `InvestmentDTO` from Task 6
- Produces: `investmentColumns` array for `DataTable`

- [ ] **Step 1: Create columns**

```tsx
// apps/frontend/src/features/investments/components/columns.tsx

import { type ColumnDef } from "@tanstack/react-table";
import {
  TacticalTextCell,
  PremiumAmountCell,
  PremiumBadgeCell,
  SortableHeader,
} from "@/components/data-display/data-table";
import type { InvestmentDTO } from "../api/investmentsService";

export const investmentColumns: ColumnDef<InvestmentDTO>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Nombre</SortableHeader>
    ),
    cell: ({ row }) => (
      <TacticalTextCell
        title={row.original.name}
        id={row.original.id}
      />
    ),
  },
  {
    accessorKey: "currency",
    header: "Moneda",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <PremiumBadgeCell
          label={row.original.currency}
          variant={row.original.currency === "ARS" ? "primary" : "accent"}
        />
      </div>
    ),
  },
  {
    accessorKey: "principal",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Capital</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <PremiumAmountCell
        amount={row.original.principal}
        currency={row.original.currency}
      />
    ),
  },
  {
    accessorKey: "totalEarned",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Ganado</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <PremiumAmountCell
        amount={row.original.totalEarned}
        currency={row.original.currency}
      />
    ),
  },
  {
    accessorKey: "totalValue",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Total</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <PremiumAmountCell
        amount={row.original.totalValue}
        currency={row.original.currency}
        className="font-black"
      />
    ),
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd apps/frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add apps/frontend/src/features/investments/components/columns.tsx
git commit -m "feat(frontend): add investment DataTable columns"
```

---

### Task 8: Frontend — Investments DataTable, Skeleton, Dashboard

**Files:**
- Create: `apps/frontend/src/features/investments/components/investments-data-table.tsx`
- Create: `apps/frontend/src/features/investments/components/investments-dashboard-skeleton.tsx`
- Create: `apps/frontend/src/features/investments/components/InvestmentsDashboard.tsx`

**Interfaces:**
- Consumes: `investmentColumns` from Task 7, `useInvestments` from Task 6
- Produces: `InvestmentsDashboard` component for use in page

- [ ] **Step 1: Create skeleton**

```tsx
// apps/frontend/src/features/investments/components/investments-dashboard-skeleton.tsx

import { DataTableSkeleton } from "@/components/data-display/data-table";

export function InvestmentsDashboardSkeleton() {
  return <DataTableSkeleton columnCount={5} />;
}
```

- [ ] **Step 2: Create data table**

```tsx
// apps/frontend/src/features/investments/components/investments-data-table.tsx

import { useInvestments } from "../hooks/investmentsHooks";
import { investmentColumns } from "./columns";
import { DataTable } from "@/components/data-display/data-table";

export function InvestmentsDataTable() {
  const { data: investments } = useInvestments();

  return (
    <DataTable
      columns={investmentColumns}
      data={investments}
      title="Inversiones"
      tableName="investments"
      description="Reservas e inversiones activas"
      enableSelection={false}
    />
  );
}
```

- [ ] **Step 3: Create dashboard wrapper**

```tsx
// apps/frontend/src/features/investments/components/InvestmentsDashboard.tsx

import { Suspense } from "react";
import { InvestmentsDataTable } from "./investments-data-table";
import { InvestmentsDashboardSkeleton } from "./investments-dashboard-skeleton";

export function InvestmentsDashboard() {
  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0 animate-premium-in">
      <Suspense fallback={<InvestmentsDashboardSkeleton />}>
        <InvestmentsDataTable />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `cd apps/frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add apps/frontend/src/features/investments/components/
git commit -m "feat(frontend): add InvestmentsDashboard with DataTable and skeleton"
```

---

### Task 9: Frontend — Barrel Exports

**Files:**
- Create: `apps/frontend/src/features/investments/index.ts`

**Interfaces:**
- Produces: All public exports from the investments feature

- [ ] **Step 1: Create index.ts**

```ts
// apps/frontend/src/features/investments/index.ts

// Components
export { InvestmentsDashboard } from "./components/InvestmentsDashboard";
export { InvestmentsDashboardSkeleton } from "./components/investments-dashboard-skeleton";

// Hooks
export { useInvestments } from "./hooks/investmentsHooks";

// Services
export { investmentsService } from "./api/investmentsService";
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/features/investments/index.ts
git commit -m "feat(frontend): add investments barrel exports"
```

---

### Task 10: Frontend — Navigation, Routes & Page

**Files:**
- Modify: `apps/frontend/src/constants/routes.ts`
- Modify: `apps/frontend/src/lib/config/navigations.ts`
- Create: `apps/frontend/src/app/[locale]/(dashboard)/investments/page.tsx`
- Create: `apps/frontend/src/app/[locale]/(dashboard)/investments/loading.tsx`

**Interfaces:**
- Produces: `/investments` route accessible from sidebar

- [ ] **Step 1: Add route constant**

In `apps/frontend/src/constants/routes.ts`, add to `ROUTES`:

```ts
INVESTMENTS: "/investments",
```

- [ ] **Step 2: Add navigation item**

In `apps/frontend/src/lib/config/navigations.ts`, add to the `operations.items` array (after the Tarjeta entry):

```ts
{
  title: "Inversiones",
  href: ROUTES.INVESTMENTS,
  icon: Landmark,
  description: "Reservas e inversiones del sistema",
  dashboard: { statsLabel: "Inversiones activas" },
},
```

- [ ] **Step 3: Create page component**

```tsx
// apps/frontend/src/app/[locale]/(dashboard)/investments/page.tsx

import { InvestmentsDashboard } from "@/features/investments";

export default function InvestmentsPage() {
  return <InvestmentsDashboard />;
}
```

- [ ] **Step 4: Create loading skeleton**

```tsx
// apps/frontend/src/app/[locale]/(dashboard)/investments/loading.tsx

import { InvestmentsDashboardSkeleton } from "@/features/investments";

export default function Loading() {
  return <InvestmentsDashboardSkeleton />;
}
```

- [ ] **Step 5: Verify TypeScript compiles**

Run: `cd apps/frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add apps/frontend/src/constants/routes.ts apps/frontend/src/lib/config/navigations.ts apps/frontend/src/app/
git commit -m "feat(frontend): add /investments route and navigation entry"
```

---

### Task 11: Build & Verify

**Files:** None (verification only)

- [ ] **Step 1: Build shared package**

Run: `cd apps && pnpm --filter @repo/shared build`
Expected: Build succeeds

- [ ] **Step 2: Build backend**

Run: `cd apps && pnpm --filter backend build`
Expected: Build succeeds

- [ ] **Step 3: Build frontend**

Run: `cd apps && pnpm --filter frontend build`
Expected: Build succeeds

- [ ] **Step 4: Run linter**

Run: `cd apps && pnpm lint`
Expected: No errors

- [ ] **Step 5: Final commit (if any lint fixes needed)**

```bash
git add -A
git commit -m "fix: lint fixes for investments feature"
```
