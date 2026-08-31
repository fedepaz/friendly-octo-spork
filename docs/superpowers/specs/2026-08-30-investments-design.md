# Investments Portfolio View — Design Spec

## Overview

A new `/investments` page that displays all INVESTMENT-type accounts as a portfolio list, enriched with return data calculated from RETURN transactions. This is a read-only view for the beta — the transaction flow for creating INVESTMENT/RETURN transactions already works via the existing wizard.

## Goal

Let the user see their "reserves" (investment accounts) in a spreadsheet-like view showing:
- **Nombre** — reserve name
- **Moneda** — currency (ARS/USD/USDT)
- **Capital** — principal (current account balance)
- **Ganado** — total earned (sum of all RETURN transactions from that account)
- **Total** — capital + ganado

## Scope (Beta)

- New backend endpoint for investment aggregation
- New frontend feature module with data table
- Navigation entry under "Operaciones"
- Query invalidation when INVESTMENT/RETURN transactions are created

**Out of scope (future):**
- Detail view per reserve (transaction history)
- Return rate tracking
- Charts/analytics
- Automatic return calculation

---

## Backend

### New Module: `investments`

**Endpoint:** `GET /investments`

**Response:**

```ts
interface InvestmentDTO {
  id: string;
  name: string;
  currency: Currency;
  principal: string;        // Account balance (Decimal(19,4) as string)
  totalEarned: string;      // Sum of RETURN transaction amounts where sourceAccountId = this account
  totalValue: string;       // principal + totalEarned
  transactionCount: number; // Number of RETURN transactions
}
```

**Implementation:**

- **Repository** (`investments.repository.ts`):
  - Query all accounts where `type = INVESTMENT`
  - For each account, aggregate RETURN transactions: `SELECT SUM(amount) FROM Transaction WHERE sourceAccountId = accountId AND type = RETURN`
  - Return enriched data

- **Service** (`investments.service.ts`):
  - Orchestrates repository query
  - Computes `totalValue = principal + totalEarned`
  - Returns array of `InvestmentDTO`

- **Controller** (`investments.controller.ts`):
  - `@Get()` with `@UseGuards(JwtAuthGuard, PermissionsGuard)` and `@RequirePermission("INVESTMENT", "read")`

- **Module** (`investments.module.ts`):
  - Imports Prisma module
  - Provides repository, service, controller
  - Registers in `app.module.ts`

**No new Prisma models.** Uses existing `Account` and `Transaction` tables.

---

## Frontend

### Feature Structure

```
features/investments/
├── api/
│   └── investmentsService.ts       # GET /investments
├── components/
│   ├── InvestmentsDashboard.tsx     # Main dashboard wrapper
│   ├── investments-data-table.tsx   # DataTable wrapper
│   ├── columns.tsx                  # Column definitions
│   └── investments-dashboard-skeleton.tsx
├── hooks/
│   └── investmentsHooks.ts          # useInvestments() with useSuspenseQuery
└── index.ts                         # Barrel exports
```

### Columns

| Column | Accessor | Cell Component | Notes |
|---|---|---|---|
| Nombre | `name` | `TacticalTextCell` | Reserve name |
| Moneda | `currency` | `PremiumBadgeCell` | ARS=primary, USD/USDT=accent |
| Capital | `principal` | `PremiumAmountCell` | Right-aligned, `text-secondary` |
| Ganado | `totalEarned` | `PremiumAmountCell` | Right-aligned, `text-secondary` |
| Total | `totalValue` | `PremiumAmountCell` | Right-aligned, bold |

### Data Fetching

```ts
// investmentsHooks.ts
function useInvestments() {
  return useSuspenseQuery<InvestmentDTO[]>({
    queryKey: ["investments"],
    queryFn: investmentsService.getInvestments,
  });
}
```

### Skeleton

`InvestmentsDashboardSkeleton` using existing `DataTableSkeleton` with `columnCount=5`.

### Query Invalidation

Add `"investments"` key to `query-invalidation-map.ts`:
- On `createTransaction` success → invalidate `["investments"]`

---

## Navigation

Add to `navigations.ts` under `operations.items`:

```ts
{
  kind: "item",
  href: "/investments",
  icon: Landmark,
  description: "Reservas e inversiones",
}
```

Add route to `routes.ts`:
```ts
INVESTMENTS: "/investments"
```

Create page at `app/[locale]/(dashboard)/investments/page.tsx`:
```tsx
import { InvestmentsDashboard } from "@/features/investments";

export default function InvestmentsPage() {
  return <InvestmentsDashboard />;
}
```

Create `loading.tsx` with `InvestmentsDashboardSkeleton`.

---

## Error Handling

- Backend: Standard NestJS exception filters (already global)
- Frontend: `useSuspenseQuery` error boundary (already configured in `app-providers.tsx`)
- Empty state: If no INVESTMENT accounts exist, show `EmptyState` component with message

## Testing

- Backend: Unit tests for service (mock repository)
- Frontend: Component renders with mocked data, columns display correctly

## File Summary

### New Files

| File | Purpose |
|---|---|
| `apps/backend/src/modules/investments/investments.module.ts` | NestJS module |
| `apps/backend/src/modules/investments/investments.controller.ts` | GET /investments |
| `apps/backend/src/modules/investments/investments.service.ts` | Business logic |
| `apps/backend/src/modules/investments/investments.repository.ts` | Prisma queries |
| `apps/frontend/src/features/investments/index.ts` | Barrel exports |
| `apps/frontend/src/features/investments/api/investmentsService.ts` | API client |
| `apps/frontend/src/features/investments/hooks/investmentsHooks.ts` | Data hooks |
| `apps/frontend/src/features/investments/components/InvestmentsDashboard.tsx` | Dashboard wrapper |
| `apps/frontend/src/features/investments/components/investments-data-table.tsx` | DataTable |
| `apps/frontend/src/features/investments/components/columns.tsx` | Column defs |
| `apps/frontend/src/features/investments/components/investments-dashboard-skeleton.tsx` | Skeleton |
| `apps/frontend/src/app/[locale]/(dashboard)/investments/page.tsx` | Route page |
| `apps/frontend/src/app/[locale]/(dashboard)/investments/loading.tsx` | Route skeleton |

### Modified Files

| File | Change |
|---|---|
| `apps/backend/src/app.module.ts` | Register InvestmentsModule |
| `apps/frontend/src/lib/config/navigations.ts` | Add "Inversiones" nav item |
| `apps/frontend/src/lib/query-invalidation-map.ts` | Add investments invalidation |
| `apps/frontend/src/constants/routes.ts` | Add INVESTMENTS route |
