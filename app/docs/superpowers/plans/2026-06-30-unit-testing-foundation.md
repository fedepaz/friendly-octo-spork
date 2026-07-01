# Unit Testing Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add comprehensive unit tests to the appFinance monorepo covering shared schemas, backend services/repositories, and frontend hooks.

**Architecture:** Colocated `__tests__/` directories with Jest (backend/shared) and React Testing Library + MSW (frontend). TDD approach where practical.

**Tech Stack:** Jest, ts-jest, React Testing Library, MSW (Mock Service Worker), @testing-library/react

## Global Constraints

- Test files: `*.spec.ts` inside `__tests__/` directories
- Backend Jest config: already in `apps/backend/package.json`
- Frontend: needs Jest + React Testing Library + MSW setup
- Shared package: needs Jest configuration
- Coverage targets: 70% lines, 60% branches, 80% functions

---

## File Structure

### Backend (apps/backend/src/)
```
modules/accounts/__tests__/account.service.spec.ts
modules/auth/__tests__/auth.service.spec.ts
modules/categories/__tests__/category.service.spec.ts
modules/transactions/__tests__/transaction.service.spec.ts
modules/recurrences/__tests__/recurrence.service.spec.ts
modules/dashboard/__tests__/dashboard.service.spec.ts
repositories/__tests__/account.repository.spec.ts
repositories/__tests__/user.repository.spec.ts
repositories/__tests__/transaction.repository.spec.ts
repositories/__tests__/category.repository.spec.ts
repositories/__tests__/recurrence.repository.spec.ts
```

### Shared (packages/shared/src/)
```
schemas/__tests__/accounts.schema.spec.ts
schemas/__tests__/categories.schema.spec.ts
schemas/__tests__/transactions.schema.spec.ts
schemas/__tests__/recurrences.schema.spec.ts
schemas/__tests__/auth.schema.spec.ts
schemas/__tests__/cards.schema.spec.ts
utils/__tests__/date-utils.spec.ts
```

### Frontend (apps/frontend/src/)
```
features/accounts/hooks/__tests__/useAccounts.spec.ts
features/accounts/hooks/__tests__/createAccountHook.spec.ts
features/auth/hooks/__tests__/useAuth.spec.ts
features/transactions/hooks/__tests__/useTransactions.spec.ts
features/recurrences/hooks/__tests__/useRecurrences.spec.ts
lib/__tests__/utils.spec.ts
lib/__tests__/date-utils.spec.ts
```

---

## Task 1: Setup Backend Test Infrastructure

**Files:**
- Modify: `apps/backend/package.json` (add coverage config)
- Create: `apps/backend/jest.config.ts`

**Interfaces:**
- Consumes: existing Jest config in package.json
- Produces: standalone Jest config file, coverage thresholds

- [ ] **Step 1: Create Jest config file**

```typescript
// apps/backend/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.module.ts',
    '!**/*.dto.ts',
    '!**/*.interface.ts',
    '!**/generated/**',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coverageThresholds: {
    global: {
      branches: 60,
      functions: 80,
      lines: 70,
      statements: 70,
    },
  },
};

export default config;
```

- [ ] **Step 2: Update package.json test script**

```json
// apps/backend/package.json - update scripts.test
"test": "jest --config jest.config.ts",
"test:coverage": "jest --config jest.config.ts --coverage",
"test:watch": "jest --config jest.config.ts --watch"
```

- [ ] **Step 3: Verify Jest runs**

Run: `cd apps/backend && pnpm test`
Expected: Jest starts, finds no tests, exits cleanly

- [ ] **Step 4: Commit**

```bash
git add apps/backend/jest.config.ts apps/backend/package.json
git commit -m "chore(backend): configure Jest with coverage thresholds"
```

---

## Task 2: Setup Frontend Test Infrastructure

**Files:**
- Create: `apps/frontend/jest.config.ts`
- Create: `apps/frontend/jest.setup.ts`
- Create: `apps/frontend/src/mocks/server.ts`
- Create: `apps/frontend/src/mocks/handlers.ts`
- Modify: `apps/frontend/package.json`

**Interfaces:**
- Consumes: existing Next.js config
- Produces: Jest + MSW setup for frontend testing

- [ ] **Step 1: Install test dependencies**

Run: `cd apps/frontend && pnpm add -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event msw whatwg-fetch`
Expected: Dependencies installed successfully

- [ ] **Step 2: Create Jest config**

```typescript
// apps/frontend/jest.config.ts
import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterSetup: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/mocks/**',
  ],
  coverageThresholds: {
    global: {
      branches: 60,
      functions: 80,
      lines: 70,
      statements: 70,
    },
  },
};

export default createJestConfig(config);
```

- [ ] **Step 3: Create Jest setup file**

```typescript
// apps/frontend/jest.setup.ts
import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

// Polyfill TextEncoder/TextDecoder for MSW
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof TextDecoder;

// Mock fetch
global.fetch = require('whatwg-fetch');
```

- [ ] **Step 4: Create MSW server**

```typescript
// apps/frontend/src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

- [ ] **Step 5: Create MSW handlers**

```typescript
// apps/frontend/src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Default handlers - override in individual tests
  http.get('/api/accounts', () => {
    return HttpResponse.json([]);
  }),
  http.get('/api/transactions', () => {
    return HttpResponse.json([]);
  }),
  http.get('/api/categories', () => {
    return HttpResponse.json([]);
  }),
];
```

- [ ] **Step 6: Update package.json scripts**

```json
// apps/frontend/package.json - add scripts
"test": "jest",
"test:coverage": "jest --coverage",
"test:watch": "jest --watch"
```

- [ ] **Step 7: Verify Jest runs**

Run: `cd apps/frontend && pnpm test`
Expected: Jest starts, finds no tests, exits cleanly

- [ ] **Step 8: Commit**

```bash
git add apps/frontend/jest.config.ts apps/frontend/jest.setup.ts apps/frontend/src/mocks/ apps/frontend/package.json
git commit -m "chore(frontend): configure Jest with MSW and React Testing Library"
```

---

## Task 3: Setup Shared Package Test Infrastructure

**Files:**
- Create: `packages/shared/jest.config.ts`
- Modify: `packages/shared/package.json`

**Interfaces:**
- Consumes: existing TypeScript config
- Produces: Jest config for shared package

- [ ] **Step 1: Create Jest config**

```typescript
// packages/shared/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/index.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
```

- [ ] **Step 2: Update package.json**

```json
// packages/shared/package.json
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "@types/jest": "^29.5.12",
    "ts-jest": "^29.1.2",
    "typescript": "^5.9.3"
  }
}
```

- [ ] **Step 3: Install dependencies**

Run: `cd packages/shared && pnpm install`
Expected: Dependencies installed successfully

- [ ] **Step 4: Verify Jest runs**

Run: `cd packages/shared && pnpm test`
Expected: Jest starts, finds no tests, exits cleanly

- [ ] **Step 5: Commit**

```bash
git add packages/shared/jest.config.ts packages/shared/package.json
git commit -m "chore(shared): configure Jest for shared package"
```

---

## Task 4: Test Shared Schemas (Accounts)

**Files:**
- Create: `packages/shared/src/schemas/__tests__/accounts.schema.spec.ts`

**Interfaces:**
- Consumes: `CreateAccountInput`, `AccountDTO` from `../accounts.schema`
- Produces: validated schema tests

- [ ] **Step 1: Read the accounts schema file**

Read: `packages/shared/src/schemas/accounts.schema.ts`
Understand: What schemas exist, what fields they validate

- [ ] **Step 2: Write failing tests for CreateAccountInput**

```typescript
// packages/shared/src/schemas/__tests__/accounts.schema.spec.ts
import { CreateAccountInput, CreateAccountInputSchema } from '../accounts.schema';

describe('Account schemas', () => {
  describe('CreateAccountInputSchema', () => {
    const validInput: CreateAccountInput = {
      name: 'Savings Account',
      type: 'BANK',
      currency: 'ARS',
    };

    it('should accept valid input', () => {
      const result = CreateAccountInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = CreateAccountInputSchema.safeParse({
        ...validInput,
        name: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject name longer than 50 chars', () => {
      const result = CreateAccountInputSchema.safeParse({
        ...validInput,
        name: 'A'.repeat(51),
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid account type', () => {
      const result = CreateAccountInputSchema.safeParse({
        ...validInput,
        type: 'INVALID',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid currency', () => {
      const result = CreateAccountInputSchema.safeParse({
        ...validInput,
        currency: 'EUR',
      });
      expect(result.success).toBe(false);
    });
  });
});
```

- [ ] **Step 3: Run tests to verify they pass**

Run: `cd packages/shared && pnpm test`
Expected: All tests pass (schemas already exist)

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/schemas/__tests__/accounts.schema.spec.ts
git commit -m "test(shared): add account schema validation tests"
```

---

## Task 5: Test Shared Schemas (Categories, Transactions, Recurrences, Auth, Cards)

**Files:**
- Create: `packages/shared/src/schemas/__tests__/categories.schema.spec.ts`
- Create: `packages/shared/src/schemas/__tests__/transactions.schema.spec.ts`
- Create: `packages/shared/src/schemas/__tests__/recurrences.schema.spec.ts`
- Create: `packages/shared/src/schemas/__tests__/auth.schema.spec.ts`
- Create: `packages/shared/src/schemas/__tests__/cards.schema.spec.ts`

**Interfaces:**
- Consumes: schemas from respective files
- Produces: schema validation tests

- [ ] **Step 1: Read all schema files**

Read: `packages/shared/src/schemas/categories.schema.ts`
Read: `packages/shared/src/schemas/transactions.schema.ts`
Read: `packages/shared/src/schemas/recurrences.schema.ts`
Read: `packages/shared/src/schemas/auth.schema.ts`
Read: `packages/shared/src/schemas/cards.schema.ts`

- [ ] **Step 2: Write tests for categories schema**

```typescript
// packages/shared/src/schemas/__tests__/categories.schema.spec.ts
import { CreateCategoryInputSchema, CategoryDTOSchema } from '../categories.schema';

describe('Category schemas', () => {
  describe('CreateCategoryInputSchema', () => {
    it('should accept valid input', () => {
      const result = CreateCategoryInputSchema.safeParse({
        name: 'Food',
        color: '#FF5733',
      });
      expect(result.success).toBe(true);
    });

    it('should accept input without color', () => {
      const result = CreateCategoryInputSchema.safeParse({
        name: 'Transport',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = CreateCategoryInputSchema.safeParse({
        name: '',
      });
      expect(result.success).toBe(false);
    });
  });
});
```

- [ ] **Step 3: Write tests for transactions schema**

```typescript
// packages/shared/src/schemas/__tests__/transactions.schema.spec.ts
import { CreateTransactionInputSchema } from '../transactions.schema';

describe('Transaction schemas', () => {
  describe('CreateTransactionInputSchema', () => {
    it('should accept valid income transaction', () => {
      const result = CreateTransactionInputSchema.safeParse({
        type: 'INCOME',
        amount: 50000,
        date: '2024-01-15',
        description: 'Salary',
      });
      expect(result.success).toBe(true);
    });

    it('should reject negative amount', () => {
      const result = CreateTransactionInputSchema.safeParse({
        type: 'EXPENSE',
        amount: -100,
        date: '2024-01-15',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid transaction type', () => {
      const result = CreateTransactionInputSchema.safeParse({
        type: 'INVALID',
        amount: 100,
        date: '2024-01-15',
      });
      expect(result.success).toBe(false);
    });
  });
});
```

- [ ] **Step 4: Write tests for recurrences schema**

```typescript
// packages/shared/src/schemas/__tests__/recurrences.schema.spec.ts
import { CreateRecurrenceInputSchema } from '../recurrences.schema';

describe('Recurrence schemas', () => {
  describe('CreateRecurrenceInputSchema', () => {
    it('should accept valid monthly recurrence', () => {
      const result = CreateRecurrenceInputSchema.safeParse({
        name: 'Rent',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid frequency', () => {
      const result = CreateRecurrenceInputSchema.safeParse({
        name: 'Rent',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'DAILY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(false);
    });
  });
});
```

- [ ] **Step 5: Write tests for auth schema**

```typescript
// packages/shared/src/schemas/__tests__/auth.schema.spec.ts
import { LoginInputSchema, RegisterInputSchema } from '../auth.schema';

describe('Auth schemas', () => {
  describe('LoginInputSchema', () => {
    it('should accept valid login', () => {
      const result = LoginInputSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = LoginInputSchema.safeParse({
        email: 'not-an-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('RegisterInputSchema', () => {
    it('should accept valid registration', () => {
      const result = RegisterInputSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('should reject short password', () => {
      const result = RegisterInputSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123',
      });
      expect(result.success).toBe(false);
    });
  });
});
```

- [ ] **Step 6: Write tests for cards schema**

```typescript
// packages/shared/src/schemas/__tests__/cards.schema.spec.ts
import { CreateCardInputSchema } from '../cards.schema';

describe('Card schemas', () => {
  describe('CreateCardInputSchema', () => {
    it('should accept valid card input', () => {
      const result = CreateCardInputSchema.safeParse({
        name: 'Visa Credit',
        type: 'VISA',
        currency: 'ARS',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid card type', () => {
      const result = CreateCardInputSchema.safeParse({
        name: 'My Card',
        type: 'INVALID',
        currency: 'ARS',
      });
      expect(result.success).toBe(false);
    });
  });
});
```

- [ ] **Step 7: Run all shared tests**

Run: `cd packages/shared && pnpm test`
Expected: All tests pass

- [ ] **Step 8: Commit**

```bash
git add packages/shared/src/schemas/__tests__/
git commit -m "test(shared): add schema validation tests for all domains"
```

---

## Task 6: Test Shared Utilities

**Files:**
- Create: `packages/shared/src/utils/__tests__/date-utils.spec.ts`

**Interfaces:**
- Consumes: `formatDate`, `parseDate`, `isDateValid` from `../date-utils`
- Produces: utility function tests

- [ ] **Step 1: Read the date-utils file**

Read: `packages/shared/src/utils/date-utils.ts`
Understand: What functions exist, what they do

- [ ] **Step 2: Write tests for date utilities**

```typescript
// packages/shared/src/utils/__tests__/date-utils.spec.ts
import { formatDate, parseDate, isDateValid } from '../date-utils';

describe('Date utilities', () => {
  describe('formatDate', () => {
    it('should format date to YYYY-MM-DD', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatDate(date);
      expect(result).toBe('2024-01-15');
    });

    it('should handle local dates', () => {
      const date = new Date(2024, 0, 15); // January 15, 2024
      const result = formatDate(date);
      expect(result).toBe('2024-01-15');
    });
  });

  describe('parseDate', () => {
    it('should parse YYYY-MM-DD string', () => {
      const result = parseDate('2024-01-15');
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(15);
    });

    it('should return null for invalid date string', () => {
      const result = parseDate('not-a-date');
      expect(result).toBeNull();
    });
  });

  describe('isDateValid', () => {
    it('should return true for valid date', () => {
      expect(isDateValid(new Date('2024-01-15'))).toBe(true);
    });

    it('should return false for invalid date', () => {
      expect(isDateValid(new Date('invalid'))).toBe(false);
    });

    it('should return false for null', () => {
      expect(isDateValid(null as any)).toBe(false);
    });
  });
});
```

- [ ] **Step 3: Run tests**

Run: `cd packages/shared && pnpm test`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/utils/__tests__/date-utils.spec.ts
git commit -m "test(shared): add date utility function tests"
```

---

## Task 7: Test Backend Repositories (Account)

**Files:**
- Create: `apps/backend/src/repositories/__tests__/account.repository.spec.ts`

**Interfaces:**
- Consumes: `AccountRepository` from `../account.repository`
- Produces: repository method tests with mocked Prisma

- [ ] **Step 1: Read the account repository**

Read: `apps/backend/src/repositories/account.repository.ts`
Understand: Methods, Prisma calls, return types

- [ ] **Step 2: Write failing tests**

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAccounts', () => {
    it('should return accounts for a user', async () => {
      const userId = 'user-123';
      const expected = [{ id: '1', name: 'Savings', userId }];
      prisma.account.findMany.mockResolvedValue(expected);

      const result = await repository.getAccounts(userId);

      expect(result).toEqual(expected);
      expect(prisma.account.findMany).toHaveBeenCalledWith({
        where: { userId, deletedAt: null },
        include: { transactionsFrom: true, transactionsTo: true },
      });
    });

    it('should exclude soft-deleted accounts', async () => {
      const userId = 'user-123';
      prisma.account.findMany.mockResolvedValue([]);

      await repository.getAccounts(userId);

      expect(prisma.account.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ deletedAt: null }),
        }),
      );
    });
  });

  describe('getAccountById', () => {
    it('should return account by id and userId', async () => {
      const userId = 'user-123';
      const accountId = 'account-456';
      const expected = { id: accountId, name: 'Savings', userId };
      prisma.account.findFirst.mockResolvedValue(expected);

      const result = await repository.getAccountById(userId, accountId);

      expect(result).toEqual(expected);
      expect(prisma.account.findFirst).toHaveBeenCalledWith({
        where: { id: accountId, userId, deletedAt: null },
        include: { transactionsFrom: true, transactionsTo: true },
      });
    });

    it('should return null if account not found', async () => {
      prisma.account.findFirst.mockResolvedValue(null);

      const result = await repository.getAccountById('user-123', 'nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('saveAccount', () => {
    it('should create a new account', async () => {
      const data = { userId: 'user-123', name: 'Savings', type: 'BANK', currency: 'ARS' };
      const expected = { id: '1', ...data };
      prisma.account.create.mockResolvedValue(expected);

      const result = await repository.saveAccount(data);

      expect(result).toEqual(expected);
      expect(prisma.account.create).toHaveBeenCalledWith({
        data,
        include: { transactionsFrom: true, transactionsTo: true },
      });
    });
  });

  describe('updateBalance', () => {
    it('should increment balance', async () => {
      const id = 'account-123';
      const amount = 1000;
      prisma.account.update.mockResolvedValue({ id, balance: 5000 });

      const result = await repository.updateBalance(id, amount, 'increment');

      expect(result.balance).toBe(5000);
      expect(prisma.account.update).toHaveBeenCalledWith({
        where: { id },
        data: { balance: { increment: amount } },
        include: { transactionsFrom: true, transactionsTo: true },
      });
    });

    it('should decrement balance', async () => {
      const id = 'account-123';
      const amount = 500;
      prisma.account.update.mockResolvedValue({ id, balance: 4500 });

      await repository.updateBalance(id, amount, 'decrement');

      expect(prisma.account.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { balance: { decrement: amount } },
        }),
      );
    });
  });
});
```

- [ ] **Step 3: Run tests**

Run: `cd apps/backend && pnpm test`
Expected: Tests pass (assuming PrismaService exists)

- [ ] **Step 4: Commit**

```bash
git add apps/backend/src/repositories/__tests__/account.repository.spec.ts
git commit -m "test(backend): add account repository unit tests"
```

---

## Task 8: Test Backend Repositories (User, Transaction, Category, Recurrence)

**Files:**
- Create: `apps/backend/src/repositories/__tests__/user.repository.spec.ts`
- Create: `apps/backend/src/repositories/__tests__/transaction.repository.spec.ts`
- Create: `apps/backend/src/repositories/__tests__/category.repository.spec.ts`
- Create: `apps/backend/src/repositories/__tests__/recurrence.repository.spec.ts`

**Interfaces:**
- Consumes: repository classes from respective files
- Produces: repository method tests

- [ ] **Step 1: Read all repository files**

Read: `apps/backend/src/repositories/user.repository.ts`
Read: `apps/backend/src/repositories/transaction.repository.ts`
Read: `apps/backend/src/repositories/categories.repository.ts`
Read: `apps/backend/src/repositories/recurrence.repository.ts`

- [ ] **Step 2: Write tests for user repository**

```typescript
// apps/backend/src/repositories/__tests__/user.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { PrismaService } from '../../infra/prisma/prisma.service';

describe('UserRepository', () => {
  let repository: UserRepository;
  let prisma: {
    user: {
      findUnique: jest.Mock;
      create: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      const email = 'test@example.com';
      const expected = { id: '1', email, name: 'Test User' };
      prisma.user.findUnique.mockResolvedValue(expected);

      const result = await repository.findByEmail(email);

      expect(result).toEqual(expected);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should return null if user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await repository.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const data = { name: 'Test User', email: 'test@example.com', passwordHash: 'hash' };
      const expected = { id: '1', ...data };
      prisma.user.create.mockResolvedValue(expected);

      const result = await repository.create(data);

      expect(result).toEqual(expected);
      expect(prisma.user.create).toHaveBeenCalledWith({ data });
    });
  });
});
```

- [ ] **Step 3: Write tests for transaction repository**

```typescript
// apps/backend/src/repositories/__tests__/transaction.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRepository } from '../transaction.repository';
import { PrismaService } from '../../infra/prisma/prisma.service';

describe('TransactionRepository', () => {
  let repository: TransactionRepository;
  let prisma: {
    transaction: {
      findMany: jest.Mock;
      create: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      transaction: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<TransactionRepository>(TransactionRepository);
  });

  describe('findByUser', () => {
    it('should return transactions for a user', async () => {
      const userId = 'user-123';
      const expected = [{ id: '1', userId, type: 'EXPENSE', amount: 100 }];
      prisma.transaction.findMany.mockResolvedValue(expected);

      const result = await repository.findByUser(userId);

      expect(result).toEqual(expected);
      expect(prisma.transaction.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ userId }),
        }),
      );
    });
  });
});
```

- [ ] **Step 4: Write tests for category repository**

```typescript
// apps/backend/src/repositories/__tests__/category.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesRepository } from '../categories.repository';
import { PrismaService } from '../../infra/prisma/prisma.service';

describe('CategoriesRepository', () => {
  let repository: CategoriesRepository;
  let prisma: {
    category: {
      findMany: jest.Mock;
      create: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      category: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<CategoriesRepository>(CategoriesRepository);
  });

  describe('findByUser', () => {
    it('should return categories for a user', async () => {
      const userId = 'user-123';
      const expected = [{ id: '1', userId, name: 'Food' }];
      prisma.category.findMany.mockResolvedValue(expected);

      const result = await repository.findByUser(userId);

      expect(result).toEqual(expected);
    });
  });
});
```

- [ ] **Step 5: Write tests for recurrence repository**

```typescript
// apps/backend/src/repositories/__tests__/recurrence.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RecurrenceRepository } from '../recurrence.repository';
import { PrismaService } from '../../infra/prisma/prisma.service';

describe('RecurrenceRepository', () => {
  let repository: RecurrenceRepository;
  let prisma: {
    recurrence: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      recurrence: {
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecurrenceRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<RecurrenceRepository>(RecurrenceRepository);
  });

  describe('findActiveByUser', () => {
    it('should return active recurrences for a user', async () => {
      const userId = 'user-123';
      const expected = [{ id: '1', userId, active: true }];
      prisma.recurrence.findMany.mockResolvedValue(expected);

      const result = await repository.findActiveByUser(userId);

      expect(result).toEqual(expected);
      expect(prisma.recurrence.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ userId, active: true }),
        }),
      );
    });
  });
});
```

- [ ] **Step 6: Run all repository tests**

Run: `cd apps/backend && pnpm test`
Expected: All tests pass

- [ ] **Step 7: Commit**

```bash
git add apps/backend/src/repositories/__tests__/
git commit -m "test(backend): add repository unit tests for all entities"
```

---

## Task 9: Test Backend Services (Account)

**Files:**
- Create: `apps/backend/src/modules/accounts/__tests__/account.service.spec.ts`

**Interfaces:**
- Consumes: `AccountService` from `../account.service`
- Produces: service method tests with mocked repository

- [ ] **Step 1: Read the account service**

Read: `apps/backend/src/modules/accounts/account.service.ts`
Understand: Methods, dependencies, error handling

- [ ] **Step 2: Write failing tests**

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
      const userId = 'user-123';
      const expected = [{ id: '1', name: 'Savings', balance: 1000 }];
      repository.getAccounts.mockResolvedValue(expected);

      const result = await service.getAccounts(userId);

      expect(result).toEqual(expected);
      expect(repository.getAccounts).toHaveBeenCalledWith(userId);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getAccounts('')).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(service.getAccounts(null as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('getAccountById', () => {
    it('should return account by id', async () => {
      const userId = 'user-123';
      const accountId = 'account-456';
      const expected = { id: accountId, name: 'Savings' };
      repository.getAccountById.mockResolvedValue(expected);

      const result = await service.getAccountById(userId, accountId);

      expect(result).toEqual(expected);
      expect(repository.getAccountById).toHaveBeenCalledWith(userId, accountId);
    });

    it('should return null if account not found', async () => {
      repository.getAccountById.mockResolvedValue(null);

      const result = await service.getAccountById('user-123', 'nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('saveAccount', () => {
    it('should save account successfully', async () => {
      const userId = 'user-123';
      const accountData = { name: 'Savings', type: 'BANK', currency: 'ARS' };
      const expected = { id: '1', userId, ...accountData };
      repository.saveAccount.mockResolvedValue(expected);

      const result = await service.saveAccount(userId, accountData);

      expect(result).toEqual(expected);
      expect(repository.saveAccount).toHaveBeenCalledWith({ userId, ...accountData });
    });

    it('should throw BadRequestException for empty userId', async () => {
      const accountData = { name: 'Savings', type: 'BANK', currency: 'ARS' };
      await expect(service.saveAccount('', accountData)).rejects.toThrow(BadRequestException);
    });
  });
});
```

- [ ] **Step 3: Run tests**

Run: `cd apps/backend && pnpm test`
Expected: Tests pass

- [ ] **Step 4: Commit**

```bash
git add apps/backend/src/modules/accounts/__tests__/account.service.spec.ts
git commit -m "test(backend): add account service unit tests"
```

---

## Task 10: Test Backend Services (Auth, Categories, Transactions, Recurrences, Dashboard)

**Files:**
- Create: `apps/backend/src/modules/auth/__tests__/auth.service.spec.ts`
- Create: `apps/backend/src/modules/categories/__tests__/category.service.spec.ts`
- Create: `apps/backend/src/modules/transactions/__tests__/transaction.service.spec.ts`
- Create: `apps/backend/src/modules/recurrences/__tests__/recurrence.service.spec.ts`
- Create: `apps/backend/src/modules/dashboard/__tests__/dashboard.service.spec.ts`

**Interfaces:**
- Consumes: service classes from respective modules
- Produces: service method tests

- [ ] **Step 1: Read all service files**

Read: `apps/backend/src/modules/auth/auth.service.ts`
Read: `apps/backend/src/modules/categories/category.service.ts`
Read: `apps/backend/src/modules/transactions/transaction.service.ts`
Read: `apps/backend/src/modules/recurrences/recurrence.service.ts`
Read: `apps/backend/src/modules/dashboard/dashboard.service.ts`

- [ ] **Step 2: Write tests for auth service**

```typescript
// apps/backend/src/modules/auth/__tests__/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserRepository } from '../../../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: {
    findByEmail: jest.Mock;
    create: jest.Mock;
  };
  let jwtService: {
    sign: jest.Mock;
  };

  beforeEach(async () => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('mock-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useValue: userRepository },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return token for valid credentials', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      const user = { id: '1', email: loginDto.email, passwordHash: 'hashed-password' };
      userRepository.findByEmail.mockResolvedValue(user);

      // Note: Actual implementation will need bcrypt comparison
      // This test assumes password validation is handled
      const result = await service.login(loginDto);

      expect(result).toHaveProperty('access_token');
      expect(jwtService.sign).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      userRepository.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({ email: 'wrong@example.com', password: 'password' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
```

- [ ] **Step 3: Write tests for other services (similar patterns)**

Follow the same pattern as account.service.spec.ts for:
- CategoryService
- TransactionService
- RecurrenceService
- DashboardService

Each test should:
- Mock the repository dependency
- Test happy path
- Test error cases (empty IDs, null values)
- Test business logic

- [ ] **Step 4: Run all service tests**

Run: `cd apps/backend && pnpm test`
Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add apps/backend/src/modules/*/__tests__/
git commit -m "test(backend): add service unit tests for all modules"
```

---

## Task 11: Test Frontend Utilities

**Files:**
- Create: `apps/frontend/src/lib/__tests__/utils.spec.ts`
- Create: `apps/frontend/src/lib/__tests__/date-utils.spec.ts`

**Interfaces:**
- Consumes: utility functions from `../utils` and `../date-utils`
- Produces: utility function tests

- [ ] **Step 1: Read the utility files**

Read: `apps/frontend/src/lib/utils.ts`
Read: `apps/frontend/src/lib/date-utils.ts`

- [ ] **Step 2: Write tests for utils**

```typescript
// apps/frontend/src/lib/__tests__/utils.spec.ts
import { cn, formatCurrency } from '../utils';

describe('Frontend utilities', () => {
  describe('cn', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', false && 'hidden', 'extra');
      expect(result).toBe('base extra');
    });

    it('should merge tailwind classes', () => {
      const result = cn('px-4 py-2', 'px-8');
      expect(result).toContain('px-8');
      expect(result).toContain('py-2');
    });
  });

  describe('formatCurrency', () => {
    it('should format ARS currency', () => {
      const result = formatCurrency(1000, 'ARS');
      expect(result).toContain('1.000');
    });

    it('should format USD currency', () => {
      const result = formatCurrency(1000, 'USD');
      expect(result).toContain('1,000');
    });
  });
});
```

- [ ] **Step 3: Write tests for date-utils**

```typescript
// apps/frontend/src/lib/__tests__/date-utils.spec.ts
import { formatDate, parseDate } from '../date-utils';

describe('Frontend date utilities', () => {
  describe('formatDate', () => {
    it('should format date for display', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toBeDefined();
    });
  });

  describe('parseDate', () => {
    it('should parse date string', () => {
      const result = parseDate('2024-01-15');
      expect(result).toBeInstanceOf(Date);
    });
  });
});
```

- [ ] **Step 4: Run tests**

Run: `cd apps/frontend && pnpm test`
Expected: Tests pass

- [ ] **Step 5: Commit**

```bash
git add apps/frontend/src/lib/__tests__/
git commit -m "test(frontend): add utility function tests"
```

---

## Task 12: Test Frontend Hooks

**Files:**
- Create: `apps/frontend/src/features/accounts/hooks/__tests__/useAccounts.spec.ts`
- Create: `apps/frontend/src/features/auth/hooks/__tests__/useAuth.spec.ts`
- Create: `apps/frontend/src/features/transactions/hooks/__tests__/useTransactions.spec.ts`

**Interfaces:**
- Consumes: hooks from respective feature modules
- Produces: hook tests with MSW mocking

- [ ] **Step 1: Read the hook files**

Read: `apps/frontend/src/features/accounts/hooks/useAccounts.ts`
Read: `apps/frontend/src/features/auth/hooks/useAuth.ts`
Read: `apps/frontend/src/features/transactions/hooks/useTransactions.ts`

- [ ] **Step 2: Write tests for useAccounts hook**

```typescript
// apps/frontend/src/features/accounts/hooks/__tests__/useAccounts.spec.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAccounts } from '../useAccounts';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  );
};

describe('useAccounts', () => {
  it('should fetch accounts successfully', async () => {
    const mockAccounts = [
      { id: '1', name: 'Savings', type: 'BANK', currency: 'ARS', balance: '10000' },
    ];

    server.use(
      http.get('/api/accounts', () => {
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
      http.get('/api/accounts', () => {
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

- [ ] **Step 3: Write tests for useAuth hook**

```typescript
// apps/frontend/src/features/auth/hooks/__tests__/useAuth.spec.ts
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAuth } from '../useAuth';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  );
};

describe('useAuth', () => {
  it('should login successfully', async () => {
    server.use(
      http.post('/api/auth/login', () => {
        return HttpResponse.json({ access_token: 'mock-token', user: { id: '1', email: 'test@example.com' } });
      }),
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password123' });
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });
  });
});
```

- [ ] **Step 4: Write tests for useTransactions hook**

```typescript
// apps/frontend/src/features/transactions/hooks/__tests__/useTransactions.spec.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useTransactions } from '../useTransactions';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  );
};

describe('useTransactions', () => {
  it('should fetch transactions successfully', async () => {
    const mockTransactions = [
      { id: '1', type: 'EXPENSE', amount: '500', date: '2024-01-15' },
    ];

    server.use(
      http.get('/api/transactions', () => {
        return HttpResponse.json(mockTransactions);
      }),
    );

    const { result } = renderHook(() => useTransactions(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockTransactions);
    });
  });
});
```

- [ ] **Step 5: Run tests**

Run: `cd apps/frontend && pnpm test`
Expected: Tests pass

- [ ] **Step 6: Commit**

```bash
git add apps/frontend/src/features/*/__tests__/
git commit -m "test(frontend): add hook unit tests with MSW mocking"
```

---

## Task 13: Test Backend Controllers

**Files:**
- Create: `apps/backend/src/modules/accounts/__tests__/account.controller.spec.ts`
- Create: `apps/backend/src/modules/auth/__tests__/auth.controller.spec.ts`

**Interfaces:**
- Consumes: controller classes from respective modules
- Produces: controller method tests with mocked services

- [ ] **Step 1: Read the controller files**

Read: `apps/backend/src/modules/accounts/account.controller.ts`
Read: `apps/backend/src/modules/auth/auth.controller.ts`

- [ ] **Step 2: Write tests for account controller**

```typescript
// apps/backend/src/modules/accounts/__tests__/account.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';

describe('AccountController', () => {
  let controller: AccountController;
  let service: {
    getAccounts: jest.Mock;
    getAccountById: jest.Mock;
    saveAccount: jest.Mock;
  };

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

  describe('getAccounts', () => {
    it('should return accounts for authenticated user', async () => {
      const userId = 'user-123';
      const expected = [{ id: '1', name: 'Savings' }];
      service.getAccounts.mockResolvedValue(expected);

      const result = await controller.getAccounts(userId);

      expect(result).toEqual(expected);
      expect(service.getAccounts).toHaveBeenCalledWith(userId);
    });
  });

  describe('getAccountById', () => {
    it('should return account by id', async () => {
      const userId = 'user-123';
      const accountId = 'account-456';
      const expected = { id: accountId, name: 'Savings' };
      service.getAccountById.mockResolvedValue(expected);

      const result = await controller.getAccountById(userId, accountId);

      expect(result).toEqual(expected);
    });
  });

  describe('createAccount', () => {
    it('should create account successfully', async () => {
      const userId = 'user-123';
      const createDto = { name: 'Savings', type: 'BANK', currency: 'ARS' };
      const expected = { id: '1', userId, ...createDto };
      service.saveAccount.mockResolvedValue(expected);

      const result = await controller.createAccount(userId, createDto);

      expect(result).toEqual(expected);
      expect(service.saveAccount).toHaveBeenCalledWith(userId, createDto);
    });
  });
});
```

- [ ] **Step 3: Write tests for auth controller**

```typescript
// apps/backend/src/modules/auth/__tests__/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: {
    login: jest.Mock;
    register: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      login: jest.fn(),
      register: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: service },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return access token', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      const expected = { access_token: 'mock-token' };
      service.login.mockResolvedValue(expected);

      const result = await controller.login(loginDto);

      expect(result).toEqual(expected);
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('register', () => {
    it('should register new user', async () => {
      const registerDto = { name: 'Test User', email: 'test@example.com', password: 'password123' };
      const expected = { id: '1', ...registerDto };
      service.register.mockResolvedValue(expected);

      const result = await controller.register(registerDto);

      expect(result).toEqual(expected);
    });
  });
});
```

- [ ] **Step 4: Run tests**

Run: `cd apps/backend && pnpm test`
Expected: Tests pass

- [ ] **Step 5: Commit**

```bash
git add apps/backend/src/modules/*/__tests__/
git commit -m "test(backend): add controller unit tests"
```

---

## Task 14: Run Full Test Suite and Generate Coverage Report

**Files:**
- None (verification step)

**Interfaces:**
- Consumes: all test files created in previous tasks
- Produces: passing test suite with coverage report

- [ ] **Step 1: Run shared package tests**

Run: `cd packages/shared && pnpm test`
Expected: All tests pass

- [ ] **Step 2: Run backend tests**

Run: `cd apps/backend && pnpm test`
Expected: All tests pass

- [ ] **Step 3: Run frontend tests**

Run: `cd apps/frontend && pnpm test`
Expected: All tests pass

- [ ] **Step 4: Run backend coverage**

Run: `cd apps/backend && pnpm test:coverage`
Expected: Coverage report generated, meets thresholds

- [ ] **Step 5: Run frontend coverage**

Run: `cd apps/frontend && pnpm test:coverage`
Expected: Coverage report generated, meets thresholds

- [ ] **Step 6: Update root package.json test script**

```json
// app/package.json - update scripts
"test": "turbo run test",
"test:coverage": "turbo run test:coverage"
```

- [ ] **Step 7: Run full test suite from root**

Run: `cd app && pnpm test`
Expected: All tests across all packages pass

- [ ] **Step 8: Commit**

```bash
git add app/package.json
git commit -m "chore: add root test script for full suite"
```

---

## Task 15: Update Documentation

**Files:**
- Modify: `docs/superpowers/specs/2026-06-30-unit-testing-foundation-design.md`
- Create: `docs/superpowers/guides/testing-guide.md`

**Interfaces:**
- Consumes: all implementation decisions and patterns
- Produces: updated documentation with real-world notes

- [ ] **Step 1: Update the design spec with implementation notes**

Add to the design spec:
- Any deviations from the original plan
- Real-world notes and tweaks
- Things that worked well
- Things that were harder than expected

- [ ] **Step 2: Create testing guide**

```markdown
# Testing Guide — appFinance

## Quick Start

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

### Writing Tests

#### Backend Services

```typescript
// Example: Testing a service
describe('MyService', () => {
  let service: MyService;
  let repository: MockType<MyRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MyService,
        { provide: MyRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<MyService>(MyService);
  });
});
```

#### Frontend Hooks

```typescript
// Example: Testing a hook with MSW
describe('useMyHook', () => {
  it('should fetch data', async () => {
    server.use(
      http.get('/api/data', () => HttpResponse.json(mockData)),
    );

    const { result } = renderHook(() => useMyHook(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });
  });
});
```

## Folder Structure

```
__tests__/
├── *.spec.ts    # Test files
```

## Best Practices

1. **Arrange-Act-Assert** pattern
2. **Mock at the boundary** (repositories for services, API for hooks)
3. **Test behavior, not implementation**
4. **One test, one assertion** (when possible)
5. **Use descriptive test names**

## Common Patterns

### Testing NestJS Services
- Mock repository dependency
- Test happy path and error cases
- Verify service calls repository correctly

### Testing React Hooks
- Use React Query wrapper
- Mock API with MSW
- Test loading, success, and error states

### Testing Zod Schemas
- Test valid inputs pass
- Test invalid inputs fail
- Test edge cases (empty strings, null, undefined)

## Troubleshooting

### MSW not intercepting requests
- Check handler path matches your API route
- Ensure server is started in test setup

### Jest can't find module
- Check `moduleNameMapper` in jest.config.ts
- Verify import paths

### Tests are slow
- Mock external dependencies
- Use `beforeEach` to reset state
- Avoid real database calls in unit tests
```

- [ ] **Step 3: Commit documentation**

```bash
git add docs/
git commit -m "docs: add testing guide and update design spec"
```

---

## Self-Review Checklist

- [ ] All spec requirements covered by tasks
- [ ] No placeholders (TBD, TODO)
- [ ] Types consistent across tasks
- [ ] File paths accurate
- [ ] Commands and expected outputs specified
- [ ] Code complete in every step

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-30-unit-testing-foundation.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
