# Testing Guide — appFinance

> A practical guide for writing and maintaining unit tests in the appFinance monorepo.
> Generated from the Phase 1 implementation (478 tests across 27 suites).

---

## Quick Start

### Running Tests

```bash
# Run all tests (from app/ directory)
pnpm test

# Run tests for a specific package
pnpm --filter @repo/shared test
pnpm --filter backend test
pnpm --filter frontend test

# Run tests with coverage
pnpm --filter backend test:coverage
pnpm --filter frontend test:coverage

# Run tests in watch mode
pnpm --filter backend test:watch

# Run a specific test file
pnpm --filter backend test -- --testPathPattern="account.service"
```

### Test Commands Reference

| Command | Package | What it does |
|---------|---------|--------------|
| `pnpm test` | Root | Runs all tests via Turbo |
| `pnpm test:coverage` | backend/frontend | Generates coverage report |
| `pnpm test:watch` | backend/frontend | Watch mode for TDD |
| `pnpm test:debug` | backend | Node inspector for debugging |

---

## Folder Structure

All tests live in colocated `__tests__/` directories adjacent to the source files they test:

```
__tests__/
├── *.spec.ts        # Standard test files
├── *.spec.tsx       # React component/hook tests (frontend)
└── *.test.ts        # Smoke/infrastructure tests
```

### Backend
```
apps/backend/src/
├── modules/{name}/
│   ├── __tests__/
│   │   ├── {name}.service.spec.ts
│   │   └── {name}.controller.spec.ts
│   ├── {name}.service.ts
│   └── {name}.controller.ts
└── repositories/
    ├── __tests__/
    │   └── {name}.repository.spec.ts
    └── {name}.repository.ts
```

### Shared
```
packages/shared/src/
├── schemas/
│   ├── __tests__/
│   │   └── {domain}.schema.spec.ts
│   └── {domain}.schema.ts
└── utils/
    ├── __tests__/
    │   └── {util}.spec.ts
    └── {util}.ts
```

### Frontend
```
apps/frontend/src/
├── features/{name}/hooks/
│   └── __tests__/
│       └── use{Name}.spec.tsx
├── lib/
│   └── __tests__/
│       └── utils.spec.ts
└── mocks/
    ├── server.ts        # MSW server
    └── handlers.ts      # Default handlers
```

---

## Writing Tests

### Backend Services

Services depend on repositories. Mock the repository, test the service logic.

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AccountService } from '../account.service';
import { AccountRepository } from '../../../repositories/account.repository';
import type { AccountWithRelations } from '../../../repositories/account.repository';

// Helper to create mock data with proper Prisma Decimal handling
function mockAccount(
  overrides: Partial<AccountWithRelations> & { name: string },
): AccountWithRelations {
  return {
    id: '1',
    userId: 'user-123',
    type: 'BANK' as const,
    currency: 'ARS' as const,
    balance: { toString: () => '0' } as unknown as AccountWithRelations['balance'],
    transactionsFrom: [],
    transactionsTo: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...overrides,
  } as AccountWithRelations;
}

describe('AccountService', () => {
  let service: AccountService;
  let repository: {
    getAccounts: jest.Mock;
    getAccountById: jest.Mock;
    saveAccount: jest.Mock;
  };

  beforeEach(async () => {
    repository = {
      getAccounts: jest.fn(),
      getAccountById: jest.fn(),
      saveAccount: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: AccountRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAccounts', () => {
    it('should return accounts for valid userId', async () => {
      repository.getAccounts.mockResolvedValue([
        mockAccount({ name: 'Savings' }),
      ]);

      const result = await service.getAccounts('user-123');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Savings');
      expect(repository.getAccounts).toHaveBeenCalledWith('user-123');
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getAccounts('')).rejects.toThrow(BadRequestException);
    });
  });
});
```

**Key patterns:**
- Use `Test.createTestingModule` for dependency injection
- Mock dependencies as inline objects with `jest.Mock` types
- Always use `jest.clearAllMocks()` in `afterEach`
- Mock Prisma `Decimal` with `{ toString: () => 'value' }`
- Test both happy path and error cases

### Backend Repositories

Repositories depend on PrismaService. Mock specific Prisma model methods.

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from '../account.repository';
import { PrismaService } from '../../infra/prisma/prisma.service';

describe('AccountRepository', () => {
  let repository: AccountRepository;
  let prisma: {
    account: {
      findMany: jest.Mock;
      findFirst: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      account: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<AccountRepository>(AccountRepository);
  });

  it('should return accounts for a user', async () => {
    const expected = [{ id: '1', name: 'Savings' }];
    prisma.account.findMany.mockResolvedValue(expected);

    const result = await repository.getAccounts('user-123');

    expect(result).toEqual(expected);
    expect(prisma.account.findMany).toHaveBeenCalledWith({
      where: { userId: 'user-123', deletedAt: null },
      include: { transactionsFrom: true, transactionsTo: true },
    });
  });
});
```

**Key patterns:**
- Mock the PrismaService with the specific model methods you need
- Verify both the return value and the Prisma query parameters
- Test soft-delete filtering (`deletedAt: null`)
- Test transaction client usage when repositories support it

### Backend Controllers

Controllers depend on services. Mock the service layer.

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';
import type { AuthUser } from '../../auth/types/auth-user.type';
import type { CreateAccountInput } from '@repo/shared';

describe('AccountController', () => {
  let controller: AccountController;
  let service: {
    getAccounts: jest.Mock;
    getAccountById: jest.Mock;
    saveAccount: jest.Mock;
  };

  const mockUser: AuthUser = { id: 'user-123', name: 'TestUser' };

  beforeEach(async () => {
    service = {
      getAccounts: jest.fn(),
      getAccountById: jest.fn(),
      saveAccount: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        { provide: AccountService, useValue: service },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should return accounts for authenticated user', async () => {
    const expected = [{ id: '1', name: 'Savings' }];
    service.getAccounts.mockResolvedValue(expected);

    const result = await controller.getAccounts(mockUser);

    expect(result).toEqual(expected);
    expect(service.getAccounts).toHaveBeenCalledWith('user-123');
  });
});
```

**Key patterns:**
- Controllers receive `AuthUser` from decorators, not raw userId strings
- Verify the controller passes the correct userId to the service
- Import shared types with `@repo/shared`

### Shared Schemas (Zod)

Test both valid and invalid inputs using `safeParse` (not `parse`, which throws).

```typescript
import { createAccountSchema, accountSchema, CreateAccountInput, AccountDTO } from '../accounts.schema';

describe('Account schemas', () => {
  describe('createAccountSchema', () => {
    const validInput: CreateAccountInput = {
      name: 'Savings Account',
      type: 'BANK',
      currency: 'ARS',
      balance: '0',
    };

    it('should accept valid input', () => {
      const result = createAccountSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = createAccountSchema.safeParse({ ...validInput, name: '' });
      expect(result.success).toBe(false);
    });

    it('should default balance to "0" when omitted', () => {
      const result = createAccountSchema.safeParse({
        name: 'Test',
        type: 'BANK',
        currency: 'ARS',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.balance).toBe('0');
      }
    });

    it('should coerce numeric balance to string', () => {
      const result = createAccountSchema.safeParse({
        ...validInput,
        balance: 100,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.balance).toBe('100');
      }
    });
  });
});
```

**Key patterns:**
- Use `safeParse` for assertions (returns `{ success: boolean }`)
- Test preprocessing (coercion, defaults)
- Test all valid enum values
- Test cross-field validation (e.g., isRecurrence requires recurrenceName)
- Use type narrowing: `if (result.success) { expect(result.data.field).toBe(...) }`

### Frontend Hooks (with MSW)

Hooks use React Query. Create a wrapper with QueryClientProvider.

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAccounts } from '../useAccounts';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useAccounts', () => {
  it('should fetch accounts successfully', async () => {
    const mockAccounts = [
      { id: '1', name: 'Savings', type: 'BANK', currency: 'ARS', balance: '10000' },
    ];

    server.use(
      http.get(`${BACKEND_URL}/accounts`, () => {
        return HttpResponse.json(mockAccounts);
      }),
    );

    const { result } = renderHook(() => useAccounts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockAccounts);
    });
  });

  it('should handle error state', async () => {
    server.use(
      http.get(`${BACKEND_URL}/accounts`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useAccounts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
```

**Key patterns:**
- Create a fresh QueryClient per test (with `retry: false`)
- Use `server.use()` to override MSW handlers per test
- Use the full backend URL in handlers (not `/api/...`)
- Use `waitFor` to wait for async state updates
- Test loading, success, and error states

### Frontend Utilities

Pure functions — straightforward testing.

```typescript
import { cn, formatCurrency, getTransactionTypeStyles } from '../utils';

describe('Frontend utilities', () => {
  describe('cn', () => {
    it('should merge tailwind classes (last wins)', () => {
      const result = cn('px-4 py-2', 'px-8');
      expect(result).toContain('px-8');
      expect(result).toContain('py-2');
      expect(result).not.toContain('px-4'); // tailwind-merge removes px-4
    });
  });

  describe('formatCurrency', () => {
    it('should format ARS currency with dots as thousands separator', () => {
      const result = formatCurrency(1000, 'ARS');
      expect(result).toContain('1.000');
    });

    it('should handle string amounts', () => {
      const result = formatCurrency('2500', 'ARS');
      expect(result).toContain('2.500');
    });
  });
});
```

---

## Best Practices

1. **Arrange-Act-Assert** pattern — always separate setup, execution, and verification.
2. **Mock at the boundary** — mock repositories for services, services for controllers, API for hooks.
3. **Test behavior, not implementation** — verify what the code does, not how it does it.
4. **Use descriptive test names** — "should throw BadRequestException for empty userId" not "should handle empty input".
5. **One assertion per concept** — group related assertions, but don't test unrelated things in one test.
6. **Always clean up** — use `jest.clearAllMocks()` in `afterEach`.
7. **Type your mocks** — declare mock shapes with `jest.Mock` types for autocomplete support.

---

## Common Patterns

### Testing NestJS Services
- Mock repository dependency via `Test.createTestingModule` + `{ provide: Repo, useValue: mock }`
- Test happy path: returns expected data
- Test validation: throws BadRequestException for invalid input
- Verify repository is called with correct parameters

### Testing NestJS Repositories
- Mock PrismaService with specific model methods
- Verify Prisma query parameters (where clauses, includes)
- Test soft-delete filtering
- Test transaction client passthrough

### Testing React Hooks
- Create QueryClient wrapper with `retry: false`
- Mock API with MSW `server.use()` per test
- Use `renderHook` + `waitFor` for async state
- Test data, loading, and error states

### Testing Zod Schemas
- Use `safeParse` (not `parse`) for assertions
- Test preprocessing (coercion, defaults, "on" to true)
- Test all valid enum values
- Test cross-field validation (conditional required fields)
- Test boundary values (min/max length)

---

## Troubleshooting

### MSW not intercepting requests
- Check handler path matches the actual API route (uses full backend URL, not `/api/...`)
- Ensure `server` is imported from `@/mocks/server`
- Verify `customExportConditions: ['node', 'node-addons']` in jest.config.ts

### Jest can't find module
- Check `moduleNameMapper` in jest.config.ts (`'^@/(.*)$': '<rootDir>/src/$1'`)
- Verify the shared package is built (`pnpm build` in packages/shared)

### Tests are slow
- Mock all external dependencies (Prisma, HTTP, bcrypt)
- Use `jest.clearAllMocks()` to prevent state leakage
- Avoid real database calls in unit tests
- Run specific test files instead of the full suite during development

### Prisma Decimal errors
- Mock Decimal fields with `{ toString: () => 'value' } as unknown as DecimalType`
- Use `as unknown as` cast because Prisma's Decimal is a class instance

### ts-jest warnings about .js files
- Add `diagnostics: { ignoreCodes: [151002] }` to ts-jest config
- This suppresses warnings when ts-jest tries to compile .js files from @repo/shared

### Frontend tests fail with "window is not defined"
- Ensure `testEnvironment` is set to `jest-fixed-jsdom` (not `node`)
- Check `jest.setup.ts` imports `@testing-library/jest-dom`

### Hook tests timeout
- Ensure `retry: false` in QueryClient defaults
- Use `waitFor` instead of `act` for async state changes
- Check MSW handler URL matches what the hook actually calls

---

## Architecture Decisions

### Why colocated `__tests__/` instead of a top-level `test/` directory?
- Tests are discovered automatically by Jest
- Source and tests live together — easier to maintain
- Clear ownership: each feature owns its tests

### Why `safeParse` instead of `parse` for schema tests?
- `parse` throws on failure, making error assertions verbose
- `safeParse` returns `{ success: boolean, data?, error? }` — cleaner for assertions

### Why inline mock objects instead of `jest.mock()`?
- `jest.mock()` replaces the entire module — harder to control per-test
- Inline mocks with `useValue` provide explicit, type-safe dependency replacement
- Better IDE support and refactoring

### Why `jest-fixed-jsdom` instead of `jsdom`?
- MSW v2 uses conditional exports that the default `jsdom` environment doesn't resolve
- `jest-fixed-jsdom` with `customExportConditions` fixes this

### Why no `test:coverage` at root level?
- Coverage is per-package (backend/frontend have different thresholds)
- `turbo run test:coverage` can be added if needed
- Root `pnpm test` is the primary entry point

---

## Adding New Tests

1. Create the `__tests__/` directory next to your source file
2. Create a `{name}.spec.ts` file (or `.spec.tsx` for React)
3. Import the class/function you're testing
4. Set up mocks in `beforeEach`
5. Clean up in `afterEach`
6. Write tests following the patterns above
7. Run `pnpm --filter {package} test` to verify

For new backend services, follow the pattern in `account.service.spec.ts`.
For new frontend hooks, follow the pattern in `useAccounts.spec.tsx`.
