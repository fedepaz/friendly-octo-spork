# Integration Testing Foundation — Design Spec

**Date:** 2026-07-01
**Status:** Approved
**Scope:** Phase 2 — Integration Tests (All 9 Backend Modules)

---

## 1. Overview

### Goal

Build a comprehensive integration testing foundation for the appFinance NestJS backend that:
- Tests the full HTTP request lifecycle (Controller → Service → Repository → PostgreSQL)
- Uses a dedicated test database for isolation
- Runs in GitHub Actions CI on every PR to `main`
- Serves as a reusable template for future projects

### What This Phase Covers

| In Scope | Out of Scope |
|----------|--------------|
| API endpoint tests (Supertest) | Unit tests (done in Phase 1) |
| Real database operations | E2E browser tests (Phase 3) |
| Authentication flow tests | Frontend tests |
| All 9 backend modules | External service mocking |

---

## 2. Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Test Database** | Existing dev PostgreSQL + `appfinance_test` database | Simple, already running |
| **Cleanup Strategy** | `prisma migrate reset` before each run | Safest, full isolation |
| **Auth in Tests** | Real flow via Supertest (register + login) | Tests full auth chain |
| **Test Scope** | All 9 modules at once | Modules are interconnected |
| **CI Trigger** | On every PR to `main` | Catch issues before merge |

---

## 3. Architecture

### 3.1 Test Database Strategy

**Local Development:**
```bash
# 1. Start dev database (already running via docker-compose.dev.yml)
cd docker && docker compose -f docker-compose.dev.yml up -d

# 2. Create test database (first time only)
docker exec -it finance-app-db psql -U user -c "CREATE DATABASE appfinance_test;"

# 3. Run integration tests
# Uses prisma migrate reset to clean database before each run
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" \
  pnpm test:integration
```

**CI (GitHub Actions):**
- PostgreSQL service provided by GitHub (fresh database each run)
- `prisma migrate deploy` to apply schema (no reset needed — database is already clean)
- Tests run against the service database

**Key Difference:**
- **Local**: `prisma migrate reset` — drops and recreates schema, full clean
- **CI**: `prisma migrate deploy` — applies migrations to fresh database (no data to clean)

### 3.2 Folder Structure

```
apps/backend/
├── test/
│   ├── integration/                    # API-level tests (Supertest)
│   │   ├── jest.config.ts             # Jest config for integration
│   │   ├── setup.ts                   # Global setup (Prisma, App init)
│   │   ├── helpers/                   # Shared test utilities
│   │   │   ├── app.helper.ts         # Create NestJS test app
│   │   │   ├── auth.helper.ts        # Generate auth tokens
│   │   │   ├── db.helper.ts          # Database cleanup
│   │   │   └── index.ts             # Re-export all helpers
│   │   ├── fixtures/                  # Test data factories
│   │   │   ├── user.fixture.ts       # Create test users
│   │   │   ├── account.fixture.ts    # Create test accounts
│   │   │   ├── transaction.fixture.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/                      # Auth module tests
│   │   │   ├── auth.register.e2e-spec.ts
│   │   │   ├── auth.login.e2e-spec.ts
│   │   │   ├── auth.refresh.e2e-spec.ts
│   │   │   └── auth.change-password.e2e-spec.ts
│   │   │
│   │   ├── accounts/                  # Accounts module tests
│   │   │   ├── accounts.create.e2e-spec.ts
│   │   │   ├── accounts.list.e2e-spec.ts
│   │   │   ├── accounts.get-by-id.e2e-spec.ts
│   │   │   └── accounts.validation.e2e-spec.ts
│   │   │
│   │   ├── transactions/              # Transactions module tests
│   │   │   ├── transactions.create.e2e-spec.ts
│   │   │   ├── transactions.list.e2e-spec.ts
│   │   │   ├── transactions.balance-update.e2e-spec.ts
│   │   │   └── transactions.recurrence.e2e-spec.ts
│   │   │
│   │   ├── recurrences/
│   │   │   ├── recurrences.create.e2e-spec.ts
│   │   │   ├── recurrences.list.e2e-spec.ts
│   │   │   └── recurrences.next-date.e2e-spec.ts
│   │   │
│   │   ├── categories/
│   │   │   ├── categories.create.e2e-spec.ts
│   │   │   └── categories.list.e2e-spec.ts
│   │   │
│   │   ├── cards/
│   │   │   ├── cards.statement.e2e-spec.ts
│   │   │   └── cards.close.e2e-spec.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── dashboard.budget.e2e-spec.ts
│   │   │   └── dashboard.summary.e2e-spec.ts
│   │   │
│   │   ├── users/
│   │   │   └── users.profile.e2e-spec.ts
│   │   │
│   │   └── health/
│   │       └── health.check.e2e-spec.ts
│   │
│   └── e2e/                           # Full flow tests (Phase 3 - Playwright)
│       └── ...
│
├── .env.test                          # Test environment variables
└── package.json                       # Scripts
```

### 3.3 File Naming Convention

```
{module}.{action}.e2e-spec.ts
```

Examples:
- `auth.register.e2e-spec.ts`
- `accounts.create.e2e-spec.ts`
- `transactions.balance-update.e2e-spec.ts`

---

## 4. Infrastructure Components

### 4.1 Test App Helper (`test/integration/helpers/app.helper.ts`)

Creates a NestJS test application with the same global setup as production:
- `ValidationPipe` with whitelist, forbidNonWhitelisted, transform
- Full `AppModule` import (not mocked)
- Returns `INestApplication` for Supertest

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';

export async function createTestApp(): Promise<INestApplication> {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication();
  
  // Match main.ts global setup
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.init();
  return app;
}
```

### 4.2 Auth Helper (`test/integration/helpers/auth.helper.ts`)

Generates real JWT tokens by calling the auth API:
- `registerAndLogin()` — registers user, logs in, returns tokens
- Tokens cached per test suite in `beforeAll`
- Tests auth flow end-to-end

```typescript
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export async function registerAndLogin(
  app: INestApplication,
  userData?: { name: string; password: string; email: string },
): Promise<AuthTokens> {
  const user = userData ?? {
    name: 'testuser',
    email: 'test@example.com',
    password: 'testpass123',
  };

  // Register
  await request(app.getHttpServer())
    .post('/api/auth/register')
    .send(user);

  // Login
  const response = await request(app.getHttpServer())
    .post('/api/auth/login')
    .send({ name: user.name, password: user.password })
    .expect(200);

  return {
    accessToken: response.body.accessToken,
    refreshToken: response.body.refreshToken,
    userId: response.body.user.id,
  };
}
```

### 4.3 Database Helper (`test/integration/helpers/db.helper.ts`)

Cleans database between test suites:
- `cleanDatabase()` — truncates all tables in correct order (respects foreign keys)
- Uses `TRUNCATE CASCADE` for speed

```typescript
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

export async function cleanDatabase(prisma: PrismaService): Promise<void> {
  // Order matters due to foreign keys
  await prisma.$executeRaw`TRUNCATE TABLE "Transaction" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Recurrence" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Account" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE`;
}
```

### 4.4 Fixtures (`test/integration/fixtures/`)

Factory functions for creating test data:
- `createTestUser()` — creates user with hashed password
- `createTestAccount()` — creates account with specified type/currency
- `createTestTransaction()` — creates transaction with balance updates
- Each fixture accepts overrides for flexible test data

```typescript
// fixtures/account.fixture.ts
import { PrismaService } from '../../../src/infra/prisma/prisma.service';
import { AccountType, Currency } from '@repo/shared';

interface CreateAccountParams {
  userId: string;
  name?: string;
  type?: AccountType;
  currency?: Currency;
  balance?: number;
}

export async function createTestAccount(
  prisma: PrismaService,
  params: CreateAccountParams,
) {
  return prisma.account.create({
    data: {
      userId: params.userId,
      name: params.name ?? `Account ${Date.now()}`,
      type: params.type ?? 'BANK',
      currency: params.currency ?? 'ARS',
      balance: params.balance ?? 0,
    },
  });
}
```

### 4.5 Jest Configuration (`test/integration/jest.config.ts`)

```typescript
export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  testEnvironment: 'node',
  testRegex: '.integration/.+\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleDirectories: ['<rootDir>/../', 'node_modules'],
  moduleNameMapper: {
    '^@repo/shared$': '<rootDir>/../../../packages/shared/src',
  },
  setupFilesAfterEnv: ['<rootDir>/integration/setup.ts'],
};
```

### 4.6 Environment Variables (`.env.test`)

```bash
# apps/backend/.env.test
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test"
JWT_SECRET="test-jwt-secret-for-integration"
JWT_REFRESH_SECRET="test-refresh-secret-for-integration"
JWT_EXPIRES_IN="60m"
JWT_REFRESH_EXPIRES_IN="7d"
DEFAULT_PASSWORD="123456"
BACKEND_NODE_ENV="test"
PORT="3001"
```

---

## 5. Test Coverage (All 9 Modules)

### 5.1 Auth Module (4 tests)

| Test File | Endpoint | Scenarios |
|-----------|----------|-----------|
| `auth.register.e2e-spec.ts` | POST /api/auth/register | Success, duplicate user, missing fields |
| `auth.login.e2e-spec.ts` | POST /api/auth/login | Success, wrong password, inactive user |
| `auth.refresh.e2e-spec.ts` | POST /api/auth/refresh | Success, invalid token |
| `auth.change-password.e2e-spec.ts` | POST /api/auth/change-password | Success, wrong current password |

### 5.2 Accounts Module (4 tests)

| Test File | Endpoint | Scenarios |
|-----------|----------|-----------|
| `accounts.create.e2e-spec.ts` | POST /api/accounts | Success, duplicate name, invalid type |
| `accounts.list.e2e-spec.ts` | GET /api/accounts | Returns user accounts |
| `accounts.get-by-id.e2e-spec.ts` | GET /api/accounts/:id | Success, not found |
| `accounts.validation.e2e-spec.ts` | POST /api/accounts | Invalid input validation |

### 5.3 Transactions Module (4 tests)

| Test File | Endpoint | Scenarios |
|-----------|----------|-----------|
| `transactions.create.e2e-spec.ts` | POST /api/transactions | Success, balance update, recurrence |
| `transactions.list.e2e-spec.ts` | GET /api/transactions | Pagination, filtering |
| `transactions.balance-update.e2e-spec.ts` | POST /api/transactions | Increment/decrement logic |
| `transactions.recurrence.e2e-spec.ts` | POST /api/transactions | Recurrence creation |

### 5.4 Recurrences Module (3 tests)

| Test File | Endpoint | Scenarios |
|-----------|----------|-----------|
| `recurrences.create.e2e-spec.ts` | POST /api/recurrences | Success, date calculation |
| `recurrences.list.e2e-spec.ts` | GET /api/recurrences | Returns user recurrences |
| `recurrences.next-date.e2e-spec.ts` | GET /api/recurrences | Next date calculation |

### 5.5 Categories Module (2 tests)

| Test File | Endpoint | Scenarios |
|-----------|----------|-----------|
| `categories.create.e2e-spec.ts` | POST /api/categories | Success, duplicate name |
| `categories.list.e2e-spec.ts` | GET /api/categories | Returns user categories |

### 5.6 Cards Module (2 tests)

| Test File | Endpoint | Scenarios |
|-----------|----------|-----------|
| `cards.statement.e2e-spec.ts` | GET /api/cards/statement | Success, empty statement |
| `cards.close.e2e-spec.ts` | POST /api/cards/close | Success, balance transfer |

### 5.7 Dashboard Module (2 tests)

| Test File | Endpoint | Scenarios |
|-----------|----------|-----------|
| `dashboard.budget.e2e-spec.ts` | GET /api/dashboard/budget | Success, with categories |
| `dashboard.summary.e2e-spec.ts` | GET /api/dashboard/summary | Success, income/expense |

### 5.8 Users Module (1 test)

| Test File | Endpoint | Scenarios |
|-----------|----------|-----------|
| `users.profile.e2e-spec.ts` | GET /api/users/profile | Success |

### 5.9 Health Module (1 test)

| Test File | Endpoint | Scenarios |
|-----------|----------|-----------|
| `health.check.e2e-spec.ts` | GET /api/health | Returns OK |

**Total: 23 test files covering all endpoints**

---

## 6. CI/CD Integration

### 6.1 GitHub Actions Workflow

```yaml
name: Tests

on:
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build --filter=@repo/shared
      - run: pnpm test

  integration-tests:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: appfinance_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      
      - run: pnpm install --frozen-lockfile
      - run: pnpm build --filter=@repo/shared
      
      - name: Setup test database
        working-directory: apps/backend
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/appfinance_test
        run: npx prisma migrate deploy
      
      - name: Run integration tests
        working-directory: apps/backend
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/appfinance_test
        run: pnpm test:integration
```

### 6.2 Package.json Scripts

```json
{
  "scripts": {
    "test:integration": "jest --runInBand --config ./test/integration/jest.config.ts",
    "test:integration:watch": "jest --runInBand --watch --config ./test/integration/jest.config.ts",
    "test:integration:coverage": "jest --runInBand --coverage --config ./test/integration/jest.config.ts"
  }
}
```

---

## 7. Scaling Considerations

| Growth | Solution |
|--------|----------|
| **More modules** | Add new directories under `test/integration/` |
| **More test files per module** | Split by action (create, list, get-by-id) |
| **Slow CI** | Split unit + integration into separate jobs (already done) |
| **Flaky tests** | Add retry logic in Jest config |
| **Test data complexity** | Expand fixtures with more factories |
| **E2E tests (Phase 3)** | Add `test/e2e/` directory |

---

## 8. Effort Estimate

| Task | Estimated Time |
|------|----------------|
| Test infrastructure (DB, helpers, config) | 3-4 hours |
| Auth integration tests | 2-3 hours |
| Account integration tests | 2-3 hours |
| Transaction integration tests (complex) | 4-5 hours |
| Recurrence integration tests | 2-3 hours |
| Category integration tests | 1-2 hours |
| Card integration tests | 2-3 hours |
| Dashboard integration tests | 1-2 hours |
| Users + Health integration tests | 1 hour |
| Documentation | 2-3 hours |
| **Total** | **~20-28 hours** |

---

## 9. Success Criteria

- [ ] All 23 integration test files pass
- [ ] Tests run against real PostgreSQL database
- [ ] `prisma migrate reset` cleans database before each run
- [ ] Auth tests use real register/login flow
- [ ] GitHub Actions runs integration tests on PR to `main`
- [ ] Documentation updated for future projects
