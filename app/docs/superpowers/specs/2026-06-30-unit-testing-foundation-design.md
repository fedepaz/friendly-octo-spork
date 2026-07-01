# Unit Testing Foundation — Design Spec

**Date:** 2026-06-30
**Status:** Approved
**Scope:** Phase 1 — Unit Tests Only

---

## 1. Testing Strategy

### Goal
Build a professional testing foundation for the appFinance monorepo that:
- Provides confidence that code works correctly
- Serves as a template for future client projects
- Uses stable, proven technology (10+ year horizon)
- Follows enterprise testing best practices

### Testing Pyramid (Enterprise Standard)

```
        /\
       /  \        E2E Tests (few)
      /    \       - Complete user flows
     /------\      - Playwright (Phase 3)
    /        \     
   / Integration\  Integration Tests (some)
  /              \ - API endpoints, DB operations
 /----------------\ - Supertest + Test Database (Phase 2)
/                  \
/    Unit Tests     \ Unit Tests (many)
/                    \ - Services, repos, utils, schemas, hooks
/____________________ \ - Fast, isolated, no external deps
```

**Phase 1 Scope:** Unit tests only
**Phase 2 Scope:** Unit + Integration tests
**Phase 3 Scope:** Unit + Integration + E2E tests

### Tech Stack (Stable, Proven)

| Layer | Tool | Why It's Stable |
|-------|------|-----------------|
| **Test Runner** | Jest | Industry standard, backed by Meta, won't go anywhere |
| **TypeScript** | ts-jest | Mature, well-maintained |
| **Frontend Testing** | React Testing Library | Official React testing approach |
| **API Mocking** | MSW (Mock Service Worker) | Industry standard, works everywhere |
| **E2E** | Playwright | Microsoft-backed, modern (Phase 3) |
| **Assertions** | Jest built-in | No need for external assertion libraries |

---

## 2. Folder Structure & Conventions

### Backend Structure

```
apps/backend/src/
├── modules/
│   └── accounts/
│       ├── __tests__/
│       │   ├── account.service.spec.ts
│       │   └── account.controller.spec.ts
│       ├── account.service.ts
│       ├── account.controller.ts
│       └── account.module.ts
├── repositories/
│   ├── __tests__/
│   │   └── account.repository.spec.ts
│   └── account.repository.ts
└── shared/
    └── utils/
        ├── __tests__/
        │   └── helper.spec.ts
        └── helper.ts
```

### Shared Package Structure

```
packages/shared/src/
├── schemas/
│   ├── __tests__/
│   │   └── accounts.schema.spec.ts
│   └── accounts.schema.ts
└── utils/
    ├── __tests__/
    │   └── date-utils.spec.ts
    └── date-utils.ts
```

### Frontend Structure

```
apps/frontend/src/
├── features/
│   └── accounts/
│       ├── hooks/
│       │   ├── __tests__/
│       │   │   └── useAccounts.spec.ts
│       │   └── useAccounts.ts
│       └── api/
│           ├── __tests__/
│           │   └── accountService.spec.ts
│           └── accountService.ts
├── lib/
│   ├── __tests__/
│   │   └── utils.spec.ts
│   └── utils.ts
```

### Naming Convention
- Test files: `*.spec.ts` inside `__tests__/` directories
- Test directories colocated with source files

---

## 3. Testing Patterns

### Backend Service Test Pattern

```typescript
// account.service.spec.ts
describe('AccountService', () => {
  let service: AccountService;
  let repository: MockType<AccountRepository>;

  beforeEach(() => {
    repository = { getAccounts: jest.fn(), saveAccount: jest.fn() };
    service = new AccountService(repository);
  });

  describe('getAccounts', () => {
    it('should return accounts for valid userId', async () => {
      // Arrange
      const userId = 'user-123';
      const expected = [{ id: '1', name: 'Savings' }];
      repository.getAccounts.mockResolvedValue(expected);

      // Act
      const result = await service.getAccounts(userId);

      // Assert
      expect(result).toEqual(expected);
      expect(repository.getAccounts).toHaveBeenCalledWith(userId);
    });

    it('should throw BadRequestException for empty userId', async () => {
      // Act & Assert
      await expect(service.getAccounts('')).rejects.toThrow(BadRequestException);
    });
  });
});
```

### Backend Repository Test Pattern

```typescript
// account.repository.spec.ts
describe('AccountRepository', () => {
  let repository: AccountRepository;
  let prisma: MockType<PrismaService>;

  beforeEach(() => {
    prisma = { account: { findMany: jest.fn(), create: jest.fn() } };
    repository = new AccountRepository(prisma);
  });

  it('should return accounts excluding soft-deleted', async () => {
    // Arrange
    const userId = 'user-123';
    prisma.account.findMany.mockResolvedValue([{ id: '1', name: 'Savings' }]);

    // Act
    const result = await repository.getAccounts(userId);

    // Assert
    expect(prisma.account.findMany).toHaveBeenCalledWith({
      where: { userId, deletedAt: null },
      include: { transactionsFrom: true, transactionsTo: true },
    });
  });
});
```

### Shared Schema Test Pattern

```typescript
// accounts.schema.spec.ts
describe('Account schemas', () => {
  describe('CreateAccountInput', () => {
    it('should accept valid account data', () => {
      const data = { name: 'Savings', type: 'BANK', currency: 'ARS' };
      expect(() => CreateAccountInputSchema.parse(data)).not.toThrow();
    });

    it('should reject empty name', () => {
      const data = { name: '', type: 'BANK', currency: 'ARS' };
      expect(() => CreateAccountInputSchema.parse(data)).toThrow();
    });
  });
});
```

### Frontend Hook Test Pattern (with MSW)

```typescript
// useAccounts.spec.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useAccounts } from '../useAccounts';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

describe('useAccounts', () => {
  it('should fetch accounts successfully', async () => {
    // Arrange
    const mockAccounts = [{ id: '1', name: 'Savings' }];
    server.use(
      http.get('/api/accounts', () => {
        return HttpResponse.json(mockAccounts);
      })
    );

    // Act
    const { result } = renderHook(() => useAccounts(), { wrapper });

    // Assert
    await waitFor(() => {
      expect(result.current.data).toEqual(mockAccounts);
    });
  });
});
```

---

## 4. Implementation Order

| Step | What | Why First | Estimated Tests |
|------|------|-----------|-----------------|
| 1 | Shared schemas & utils | Foundation, no dependencies | ~15-20 |
| 2 | Backend repositories | Data access layer, depends on Prisma | ~12-15 |
| 3 | Backend services | Business logic, depends on repos | ~20-25 |
| 4 | Frontend utilities | Pure functions, no deps | ~5-10 |
| 5 | Frontend hooks | Depends on API mocking | ~10-15 |
| 6 | Backend controllers | API layer, depends on services | ~8-12 |

---

## 5. Coverage Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Lines** | 70%+ | Functional coverage |
| **Branches** | 60%+ | Decision paths |
| **Functions** | 80%+ | Public API surface |

---

## 6. Success Criteria

- [ ] All shared schemas have tests (validation works correctly)
- [ ] All shared utils have tests (pure functions work correctly)
- [ ] All backend repositories have tests (data access works correctly)
- [ ] All backend services have tests (business logic works correctly)
- [ ] All frontend utilities have tests (pure functions work correctly)
- [ ] All frontend hooks have tests (data fetching works correctly with MSW)
- [ ] All backend controllers have tests (API layer works correctly)
- [ ] Jest configured with coverage thresholds
- [ ] `pnpm test` runs all tests and passes
- [ ] Documentation updated with patterns and examples

---

## 7. Future Phases

### Phase 2: Integration Tests
- API endpoint testing with Supertest
- Database operations with test DB
- Auth flow testing

### Phase 3: E2E Tests
- Complete user flows with Playwright
- Cross-feature interactions
- Critical path coverage

---

## 8. Documentation Plan

### Living Document Structure
1. **Testing Strategy Overview** (this document)
2. **Infrastructure Setup Guide** (created during setup)
3. **Testing Patterns Catalog** (updated with examples)
4. **CI/CD & Quality Gates** (added when CI is configured)

### Workflow
- Start with strategy overview
- Update docs as we implement
- Document tweaks and real-world notes
- End with step-by-step guide for future projects

---

## 9. Implementation Notes (Added After Completion)

> These notes document real-world findings, deviations from the original plan,
> and lessons learned during Phase 1 implementation (Tasks 1-15).

### 9.1 Deviations from Original Plan

#### Tech Stack Versions
- **Jest 30** was installed (plan assumed 29). This required `@types/jest@^30.0.0`.
- **@testing-library/react@^16.3.2** (plan showed v14 patterns). v16 has the same API but ships ESM-only.
- **MSW v2.14** (plan showed v2 patterns). MSW v2 uses conditional exports, requiring special Jest config.

#### Frontend Jest Configuration
The plan's `jest.config.ts` had several inaccuracies that needed fixing during implementation:

1. **`setupFilesAfterSetup`** was a typo in the plan. The correct Jest key is **`setupFilesAfterEnv`**.
2. **`testEnvironment: 'jsdom'`** caused issues with MSW v2's ESM-only dependencies. The fix was to use **`jest-fixed-jsdom`** with `customExportConditions: ['node', 'node-addons']`.
3. **`transformIgnorePatterns`** needed to be overridden to allow MSW's ESM-only transitive dependencies (rettime, until-async, @open-draft/deferred-promise, etc.) to be transpiled. The default Next.js config excludes all of `node_modules/`, which breaks MSW.
4. The plan used **`global.fetch = require('whatwg-fetch')`** in `jest.setup.ts`. This was **not needed** in the final implementation — Jest 30's `jest-fixed-jsdom` provides a compatible fetch.

The final `jest.config.ts` exports an async function (required by `next/jest`) that spreads the resolved config and overrides `transformIgnorePatterns` to remove all `node_modules` exclusions.

#### MSW Handler Paths
The plan used **`/api/accounts`** as the handler path. The actual implementation uses the full backend URL:
```typescript
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
http.get(`${BACKEND_URL}/accounts`, () => HttpResponse.json([]));
```
This matches how the frontend's API client actually makes requests.

#### Backend ts-jest Diagnostics
The plan did not mention suppressing TypeScript diagnostics. The implementation added:
```typescript
diagnostics: { ignoreCodes: [151002] }
```
This suppresses warnings about `.js` files from `@repo/shared` that ts-jest tries to compile.

#### Package Scripts
All three packages use `--passWithNoTests` in their test scripts, allowing `pnpm test` to succeed even if no tests exist yet. The root `package.json` uses `turbo run test` (no `test:coverage` script at root level).

### 9.2 Architecture Discoveries

#### Prisma Decimal Handling
Services in this codebase convert Prisma `Decimal` fields to strings. Tests must mock this with helper functions:
```typescript
function mockAccount(overrides) {
  return {
    balance: { toString: () => '5432.10' } as unknown as AccountWithRelations['balance'],
    // ...other fields
  };
}
```
The `as unknown as` cast is necessary because Prisma's `Decimal` type is a class instance, not a plain string.

#### Auth Module Architecture
The plan assumed `UserRepository` and `email`-based login. The actual implementation uses:
- **`UserAuthRepository`** (a separate repository for auth-specific operations)
- **Name-based login** (`findByName`) rather than email-based
- **`ConfigService`** for JWT secrets and default password config
- **`signAsync`** (not `sign`) for JWT token generation
- **Dual tokens**: `accessToken` + `refreshToken` (not just `access_token`)

#### Repository Transaction Clients
Several repositories accept an optional `txClient` parameter for use within Prisma interactive transactions:
```typescript
await repository.saveAccount(data, txClient);
```
Tests verify both the default path (using `prisma`) and the transaction client path.

#### Categories Naming
The codebase uses **plural naming** for the categories module: `CategoriesService`, `CategoriesRepository` — not `CategoryService`/`CategoryRepository` as the plan suggested.

#### Shared Schema Naming
Schema names differ from the plan:
- `createAccountSchema` (not `CreateAccountInputSchema`)
- `accountSchema` (not `AccountDTO` schema)
- `LoginAuthSchema` / `RegisterAuthSchema` (not `LoginInputSchema` / `RegisterInputSchema`)
- Cards use `cardStatementSchema`, `cardCloseSchema`, `cardCloseResponseSchema` (not `CreateCardInputSchema`)

#### Shared date-utils
The shared `date-utils.ts` only exports `calculateNextDate()` — it does not have `formatDate`, `parseDate`, or `isDateValid` as the plan assumed. These utilities are in the **frontend** package instead.

### 9.3 Things That Worked Well

1. **Colocated `__tests__/` directories** — Placing tests next to source files made discovery and maintenance natural.
2. **NestJS `Test.createTestingModule`** — Provided clean dependency injection for all backend tests without manual constructor calls.
3. **Type-safe mocks with inline objects** — Instead of a generic `MockType<T>`, tests declare mock shapes inline, which provides better autocomplete and catches missing methods at compile time.
4. **Mock helper functions** (`mockAccount`, `mockTransaction`, `mockRecurrence`) — Centralizing test data with `Partial<T>` overrides made tests readable and maintainable.
5. **MSW `server.use()` for test-specific handlers** — Overriding handlers per-test is clean and prevents test pollution.
6. **Shared package smoke test** — A simple `setup-smoke.spec.ts` verified the test infrastructure works before writing real tests.

### 9.4 Things That Were Harder Than Expected

1. **MSW v2 + Next.js + Jest compatibility** — MSW v2 is ESM-only and Next.js's Jest config excludes `node_modules/` by default. Required careful `transformIgnorePatterns` manipulation.
2. **Prisma Decimal mocking** — Prisma returns `Decimal` objects, not plain numbers. Mocking these requires `{ toString: () => 'value' }` patterns throughout service tests.
3. **Auth service dependencies** — AuthService has 3 dependencies (UserAuthRepository, JwtService, ConfigService), each requiring mock setup. ConfigService needs specific key-value mappings.
4. **Transaction service complexity** — TransactionService depends on 4 other services/repositories plus PrismaService for interactive transactions, making mock setup verbose.
5. **Schema preprocessing** — Zod schemas with `.preprocess()` (e.g., coercing amounts to strings, boolean `"on"` to `true`) require testing both the preprocessing and the validation layers.

### 9.5 Final Test Counts

| Package | Test Suites | Tests | Status |
|---------|-------------|-------|--------|
| `@repo/shared` | 8 | 239 | All passing |
| `backend` | 13 | 142 | All passing |
| `frontend` | 6 | 97 | All passing |
| **Total** | **27** | **478** | **All passing** |

### 9.6 Files Created/Modified

#### Infrastructure
- `apps/backend/jest.config.ts` — Jest configuration with ts-jest and coverage thresholds
- `apps/frontend/jest.config.ts` — Jest config with next/jest, MSW ESM support, jest-fixed-jsdom
- `apps/frontend/jest.setup.ts` — Jest setup with @testing-library/jest-dom and TextEncoder/TextDecoder polyfills
- `packages/shared/jest.config.ts` — Jest config for shared package with ts-jest

#### Shared Package Tests
- `packages/shared/src/__tests__/setup-smoke.spec.ts` — Infrastructure smoke test
- `packages/shared/src/schemas/__tests__/accounts.schema.spec.ts` — 16 tests
- `packages/shared/src/schemas/__tests__/auth.schema.spec.ts` — 36 tests
- `packages/shared/src/schemas/__tests__/categories.schema.spec.ts` — 19 tests
- `packages/shared/src/schemas/__tests__/transactions.schema.spec.ts` — 44 tests
- `packages/shared/src/schemas/__tests__/recurrences.schema.spec.ts` — 32 tests
- `packages/shared/src/schemas/__tests__/cards.schema.spec.ts` — 18 tests
- `packages/shared/src/utils/__tests__/date-utils.spec.ts` — 14 tests

#### Backend Tests
- `apps/backend/src/repositories/__tests__/account.repository.spec.ts`
- `apps/backend/src/repositories/__tests__/user.repository.spec.ts`
- `apps/backend/src/repositories/__tests__/transaction.repository.spec.ts`
- `apps/backend/src/repositories/__tests__/category.repository.spec.ts`
- `apps/backend/src/repositories/__tests__/recurrence.repository.spec.ts`
- `apps/backend/src/modules/accounts/__tests__/account.service.spec.ts`
- `apps/backend/src/modules/accounts/__tests__/account.controller.spec.ts`
- `apps/backend/src/modules/auth/__tests__/auth.service.spec.ts`
- `apps/backend/src/modules/auth/__tests__/auth.controller.spec.ts`
- `apps/backend/src/modules/categories/__tests__/categories.service.spec.ts`
- `apps/backend/src/modules/transactions/__tests__/transaction.service.spec.ts`
- `apps/backend/src/modules/recurrences/__tests__/recurrence.service.spec.ts`
- `apps/backend/src/modules/dashboard/__tests__/dashboard.service.spec.ts`

#### Frontend Tests
- `apps/frontend/src/mocks/server.ts` — MSW server setup
- `apps/frontend/src/mocks/handlers.ts` — Default MSW handlers
- `apps/frontend/src/lib/__tests__/utils.spec.ts`
- `apps/frontend/src/lib/__tests__/date-utils.spec.ts`
- `apps/frontend/src/features/accounts/hooks/__tests__/useAccounts.spec.tsx`
- `apps/frontend/src/features/auth/hooks/__tests__/useAuth.spec.tsx`
- `apps/frontend/src/features/transactions/hooks/__tests__/useTransactions.spec.tsx`

