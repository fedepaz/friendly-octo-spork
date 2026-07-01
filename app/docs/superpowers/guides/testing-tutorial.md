# Testing Tutorial — appFinance

## The Big Picture

You have **3 packages** that need tests:

```
app/
├── packages/shared/     ← Zod schemas, utils (foundation)
├── apps/backend/        ← NestJS services, repositories
└── apps/frontend/       ← React hooks, API services
```

Each has its own **Jest config** and **test scripts**.

---

## How to Run Tests

### The Commands

```bash
# From the root (runs ALL tests across all packages)
cd /home/fedepaz/Documents/proyectos/appFinance/app
pnpm test

# From a specific package
cd apps/backend && pnpm test        # Backend only
cd apps/frontend && pnpm test       # Frontend only
cd packages/shared && pnpm test     # Shared only

# With coverage report
pnpm test:coverage

# Watch mode (re-runs on file changes)
pnpm test:watch
```

### What the Flags Mean

| Flag | What it does |
|------|--------------|
| `--passWithNoTests` | Exit cleanly even if no test files found (Jest 30 requires this) |
| `--coverage` | Generate coverage report (% of code covered by tests) |
| `--watch` | Re-run tests when files change |
| `--config jest.config.ts` | Use specific config file |
| `--runInBand` | Run tests sequentially (for debugging) |

---

## The Test File Pattern

Tests live in `__tests__/` folders next to the code they test:

```
src/
├── schemas/
│   ├── accounts.schema.ts        ← The code
│   └── __tests__/
│       └── accounts.schema.spec.ts  ← The test
```

**Naming:** `*.spec.ts` (not `*.test.ts` — this matches Jest config)

---

## How Tests Work (The Pattern)

### Shared Schema Tests (Simplest)

```typescript
// packages/shared/src/schemas/__tests__/accounts.schema.spec.ts
import { createAccountSchema } from '../accounts.schema';

describe('Account schemas', () => {
  describe('createAccountSchema', () => {
    it('should accept valid input', () => {
      const result = createAccountSchema.safeParse({
        name: 'Savings',
        type: 'BANK',
        currency: 'ARS',
        balance: '0',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = createAccountSchema.safeParse({
        name: '',
        type: 'BANK',
        currency: 'ARS',
        balance: '0',
      });
      expect(result.success).toBe(false);
    });
  });
});
```

**Key points:**
- `safeParse()` returns `{ success: true, data }` or `{ success: false, error }`
- No mocking needed — pure function tests
- Tests validation rules

---

### Backend Repository Tests (Mocking Prisma)

```typescript
// apps/backend/src/repositories/__tests__/account.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from '../account.repository';
import { PrismaService } from '../../infra/prisma/prisma.service';

describe('AccountRepository', () => {
  let repository: AccountRepository;
  let prisma: {
    account: {
      findMany: jest.Mock;
      // ... other methods
    };
  };

  beforeEach(async () => {
    // Create mock Prisma
    prisma = {
      account: {
        findMany: jest.fn(),
        // ... other methods
      },
    };

    // Create NestJS testing module with mocked Prisma
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<AccountRepository>(AccountRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return accounts for a user', async () => {
    const userId = 'user-123';
    const expected = [{ id: '1', name: 'Savings', userId }];
    
    // Mock Prisma to return expected data
    prisma.account.findMany.mockResolvedValue(expected);

    // Call the method
    const result = await repository.getAccounts(userId);

    // Assert result matches expected
    expect(result).toEqual(expected);
    
    // Assert Prisma was called correctly
    expect(prisma.account.findMany).toHaveBeenCalledWith({
      where: { userId, deletedAt: null },
      include: { transactionsFrom: true, transactionsTo: true },
    });
  });
});
```

**Key points:**
- `jest.fn()` creates a mock function
- `mockResolvedValue()` makes it return a promise
- `expect().toHaveBeenCalledWith()` verifies the mock was called with correct args
- `beforeEach` runs before each test (setup)
- `afterEach` runs after each test (cleanup)

---

### Backend Service Tests (Mocking Repository)

```typescript
// apps/backend/src/modules/accounts/__tests__/account.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AccountService } from '../account.service';
import { AccountRepository } from '../../../repositories/account.repository';

describe('AccountService', () => {
  let service: AccountService;
  let repository: {
    getAccounts: jest.Mock;
    saveAccount: jest.Mock;
  };

  beforeEach(async () => {
    repository = {
      getAccounts: jest.fn(),
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

  it('should throw for empty userId', async () => {
    await expect(service.getAccounts('')).rejects.toThrow(BadRequestException);
  });
});
```

**Key points:**
- Service depends on Repository → mock Repository
- Tests business logic, not database queries
- `.rejects.toThrow()` tests error cases

---

### Frontend Hook Tests (MSW Mocking)

```typescript
// apps/frontend/src/features/accounts/hooks/__tests__/useAccounts.spec.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAccounts } from '../accountsHooks';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

// Helper to wrap hooks in QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useAccounts', () => {
  it('should fetch accounts successfully', async () => {
    const mockAccounts = [{ id: '1', name: 'Savings' }];

    // Override MSW handler for this test
    server.use(
      http.get('http://localhost:3001/accounts', () => {
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
});
```

**Key points:**
- MSW intercepts HTTP requests at network level
- `server.use()` overrides handlers per test
- `renderHook()` tests React hooks in isolation
- `waitFor()` waits for async state updates

---

## Jest Config Explained

### Backend (`apps/backend/jest.config.ts`)

```typescript
{
  rootDir: 'src',           // Look for tests in src/
  testRegex: '.*\\.spec\\.ts$',  // Find files ending in .spec.ts
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',  // Transform TypeScript with ts-jest
  },
  testEnvironment: 'node',  // Node.js environment (no DOM)
  coverageThreshold: {
    global: {
      branches: 60,         // 60% of if/else branches tested
      functions: 80,        // 80% of functions tested
      lines: 70,            // 70% of lines tested
      statements: 70,       // 70% of statements tested
    },
  },
}
```

### Frontend (`apps/frontend/jest.config.ts`)

```typescript
{
  testEnvironment: 'jest-fixed-jsdom',  // Browser-like environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Run setup file
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Handle @/ imports
  },
}
```

### Shared (`packages/shared/jest.config.ts`)

```typescript
{
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
}
```

---

## Dependencies Added

### Backend
- Already had Jest in package.json
- No new dependencies needed

### Frontend
```json
{
  "devDependencies": {
    "jest": "^30.0.0",
    "@types/jest": "^30.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "msw": "^2.0.0"
  }
}
```

### Shared
```json
{
  "devDependencies": {
    "jest": "^30.0.0",
    "@types/jest": "^30.0.0",
    "ts-jest": "^29.2.5"
  }
}
```

---

## Quick Reference

| What | Command |
|------|---------|
| Run all tests | `pnpm test` (from root) |
| Run backend tests | `cd apps/backend && pnpm test` |
| Run with coverage | `pnpm test:coverage` |
| Watch mode | `pnpm test:watch` |
| Run single test file | `pnpm test -- accounts.schema.spec.ts` |
| Run tests matching pattern | `pnpm test -- -t "should accept"` |

---

## The Test Pyramid in Practice

```
Unit Tests (478 tests) ← WHERE WE ARE
├── Shared schemas: 239 tests
├── Backend: 142 tests  
└── Frontend: 97 tests

Integration Tests ← Phase 2 (future)
└── API endpoints with real DB

E2E Tests ← Phase 3 (future)
└── Complete user flows with Playwright
```

---

## Writing New Tests

### Step 1: Create the test file

```
src/
├── myModule/
│   ├── myService.ts
│   └── __tests__/
│       └── myService.spec.ts   ← Create this
```

### Step 2: Write the test

```typescript
import { MyService } from '../myService';

describe('MyService', () => {
  it('should do something', () => {
    const service = new MyService();
    const result = service.doSomething();
    expect(result).toBe(expected);
  });
});
```

### Step 3: Run the test

```bash
pnpm test -- myService.spec.ts
```

### Step 4: Watch for changes

```bash
pnpm test:watch
```

---

## Common Patterns

### Testing Zod Schemas
```typescript
const result = schema.safeParse(data);
expect(result.success).toBe(true);  // or false
```

### Testing NestJS Services
```typescript
// Mock dependencies
const mockRepo = { find: jest.fn() };

// Create module with mocked deps
const module = await Test.createTestingModule({
  providers: [MyService, { provide: Repo, useValue: mockRepo }],
}).compile();

// Test
const service = module.get(MyService);
```

### Testing React Hooks
```typescript
const { result } = renderHook(() => useMyHook(), { wrapper });
await waitFor(() => {
  expect(result.current.data).toEqual(expected);
});
```

### Testing Error Cases
```typescript
await expect(asyncFn()).rejects.toThrow(ErrorClass);
```

---

## Troubleshooting

### "No tests found"
- Check file name ends with `.spec.ts`
- Check file is in `__tests__/` folder
- Run `pnpm test --passWithNoTests` to verify Jest runs

### "Cannot find module"
- Check `moduleNameMapper` in jest.config.ts
- Check import path is correct

### "MSW not intercepting requests"
- Check handler path matches your API route
- Ensure server is started in test setup

### "Tests are slow"
- Mock external dependencies
- Use `beforeEach` to reset state
- Avoid real database calls in unit tests
