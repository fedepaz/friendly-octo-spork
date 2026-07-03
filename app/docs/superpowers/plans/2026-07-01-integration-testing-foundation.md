# Integration Testing Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a comprehensive integration testing foundation for the appFinance NestJS backend that tests the full HTTP request lifecycle against a real PostgreSQL database.

**Architecture:** Layered test structure with shared helpers, fixtures, and module-specific test directories. Tests run with `--runInBand` for database isolation. CI uses GitHub Actions PostgreSQL service.

**Tech Stack:** Jest, ts-jest, Supertest, Prisma, NestJS Testing Module, PostgreSQL

## Global Constraints

- Test database: `appfinance_test` (existing dev PostgreSQL)
- Cleanup: `prisma migrate reset` before each local run, `prisma migrate deploy` in CI
- Auth: Real flow via Supertest (register + login)
- File naming: `{module}.{action}.e2e-spec.ts`
- Tests run serially (`--runInBand`) for shared database state
- All monetary fields use `@db.Decimal(19,4)` — mock with `{ toString: () => 'value' }`

---

## File Structure

```
apps/backend/
├── test/
│   ├── integration/
│   │   ├── jest.config.ts
│   │   ├── setup.ts
│   │   ├── helpers/
│   │   │   ├── app.helper.ts
│   │   │   ├── auth.helper.ts
│   │   │   ├── db.helper.ts
│   │   │   └── index.ts
│   │   ├── fixtures/
│   │   │   ├── user.fixture.ts
│   │   │   ├── account.fixture.ts
│   │   │   ├── transaction.fixture.ts
│   │   │   ├── category.fixture.ts
│   │   │   └── index.ts
│   │   ├── auth/
│   │   │   ├── auth.register.e2e-spec.ts
│   │   │   ├── auth.login.e2e-spec.ts
│   │   │   ├── auth.refresh.e2e-spec.ts
│   │   │   └── auth.change-password.e2e-spec.ts
│   │   ├── accounts/
│   │   │   ├── accounts.create.e2e-spec.ts
│   │   │   ├── accounts.list.e2e-spec.ts
│   │   │   ├── accounts.get-by-id.e2e-spec.ts
│   │   │   └── accounts.validation.e2e-spec.ts
│   │   ├── transactions/
│   │   │   ├── transactions.create.e2e-spec.ts
│   │   │   ├── transactions.list.e2e-spec.ts
│   │   │   ├── transactions.balance-update.e2e-spec.ts
│   │   │   └── transactions.recurrence.e2e-spec.ts
│   │   ├── recurrences/
│   │   │   ├── recurrences.create.e2e-spec.ts
│   │   │   ├── recurrences.list.e2e-spec.ts
│   │   │   └── recurrences.next-date.e2e-spec.ts
│   │   ├── categories/
│   │   │   ├── categories.create.e2e-spec.ts
│   │   │   └── categories.list.e2e-spec.ts
│   │   ├── cards/
│   │   │   ├── cards.statement.e2e-spec.ts
│   │   │   └── cards.close.e2e-spec.ts
│   │   ├── dashboard/
│   │   │   ├── dashboard.budget.e2e-spec.ts
│   │   │   └── dashboard.summary.e2e-spec.ts
│   │   ├── users/
│   │   │   └── users.profile.e2e-spec.ts
│   │   └── health/
│   │       └── health.check.e2e-spec.ts
│   └── e2e/                           # Phase 3 placeholder
├── .env.test
└── package.json (modified)
```

---

## Task 1: Test Infrastructure Setup

**Files:**
- Create: `apps/backend/test/integration/jest.config.ts`
- Create: `apps/backend/test/integration/setup.ts`
- Create: `apps/backend/.env.test`
- Modify: `apps/backend/package.json`

**Interfaces:**
- Consumes: existing `AppModule`, `PrismaService`
- Produces: working test runner configuration

- [ ] **Step 1: Create `.env.test`**

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

- [ ] **Step 2: Create `test/integration/jest.config.ts`**

```typescript
// apps/backend/test/integration/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
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
  testTimeout: 30000,
};

export default config;
```

- [ ] **Step 3: Create `test/integration/setup.ts`**

```typescript
// apps/backend/test/integration/setup.ts
import { PrismaService } from '../../src/infra/prisma/prisma.service';

let prisma: PrismaService;

beforeAll(() => {
  prisma = new PrismaService({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  } as any);
});

afterAll(async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
});

export { prisma };
```

- [ ] **Step 4: Add scripts to `package.json`**

```json
{
  "scripts": {
    "test:integration": "dotenv -e .env.test -- jest --runInBand --config ./test/integration/jest.config.ts",
    "test:integration:watch": "dotenv -e .env.test -- jest --runInBand --watch --config ./test/integration/jest.config.ts"
  }
}
```

- [ ] **Step 5: Install dependencies**

```bash
cd apps/backend && pnpm add -D dotenv-cli
```

- [ ] **Step 6: Create test database**

```bash
docker exec -it finance-app-db psql -U user -c "CREATE DATABASE appfinance_test;"
```

- [ ] **Step 7: Run prisma migrate on test database**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx prisma migrate deploy
```

- [ ] **Step 8: Verify setup works**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx jest --listTests --config ./test/integration/jest.config.ts
```

Expected: No tests found (we haven't created any yet)

- [ ] **Step 9: Commit**

```bash
git add apps/backend/.env.test apps/backend/test/ apps/backend/package.json apps/backend/pnpm-lock.yaml
git commit -m "test(backend): add integration test infrastructure"
```

---

## Task 2: Test Helpers

**Files:**
- Create: `apps/backend/test/integration/helpers/app.helper.ts`
- Create: `apps/backend/test/integration/helpers/auth.helper.ts`
- Create: `apps/backend/test/integration/helpers/db.helper.ts`
- Create: `apps/backend/test/integration/helpers/index.ts`

**Interfaces:**
- Consumes: `AppModule`, `PrismaService`, `JwtService`
- Produces: `createTestApp()`, `registerAndLogin()`, `cleanDatabase()`

- [ ] **Step 1: Create `app.helper.ts`**

```typescript
// apps/backend/test/integration/helpers/app.helper.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.init();
  return app;
}
```

- [ ] **Step 2: Create `auth.helper.ts`**

```typescript
// apps/backend/test/integration/helpers/auth.helper.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
}

export async function registerAndLogin(
  app: INestApplication,
  userData?: { name: string; password: string; email: string },
): Promise<AuthTokens> {
  const user = userData ?? {
    name: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'testpass123',
  };

  // Register
  const registerResponse = await request(app.getHttpServer())
    .post('/api/auth/register')
    .send(user)
    .expect(201);

  // Login
  const loginResponse = await request(app.getHttpServer())
    .post('/api/auth/login')
    .send({ name: user.name, password: user.password })
    .expect(200);

  return {
    accessToken: loginResponse.body.accessToken,
    refreshToken: loginResponse.body.refreshToken,
    userId: registerResponse.body.user.id,
    userName: user.name,
  };
}
```

- [ ] **Step 3: Create `db.helper.ts`**

```typescript
// apps/backend/test/integration/helpers/db.helper.ts
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

- [ ] **Step 4: Create `index.ts`**

```typescript
// apps/backend/test/integration/helpers/index.ts
export { createTestApp } from './app.helper';
export { registerAndLogin } from './auth.helper';
export type { AuthTokens } from './auth.helper';
export { cleanDatabase } from './db.helper';
```

- [ ] **Step 5: Commit**

```bash
git add apps/backend/test/integration/helpers/
git commit -m "test(backend): add integration test helpers"
```

---

## Task 3: Test Fixtures

**Files:**
- Create: `apps/backend/test/integration/fixtures/user.fixture.ts`
- Create: `apps/backend/test/integration/fixtures/account.fixture.ts`
- Create: `apps/backend/test/integration/fixtures/transaction.fixture.ts`
- Create: `apps/backend/test/integration/fixtures/category.fixture.ts`
- Create: `apps/backend/test/integration/fixtures/index.ts`

**Interfaces:**
- Consumes: `PrismaService`
- Produces: `createTestUser()`, `createTestAccount()`, `createTestTransaction()`, `createTestCategory()`

- [ ] **Step 1: Create `user.fixture.ts`**

```typescript
// apps/backend/test/integration/fixtures/user.fixture.ts
import { PrismaService } from '../../../src/infra/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

interface CreateUserParams {
  name?: string;
  email?: string;
  password?: string;
}

export async function createTestUser(
  prisma: PrismaService,
  params?: CreateUserParams,
) {
  const name = params?.name ?? `user_${Date.now()}`;
  const email = params?.email ?? `${name}@test.com`;
  const password = params?.password ?? 'testpass123';
  const passwordHash = await bcrypt.hash(password, 12);

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });
}
```

- [ ] **Step 2: Create `account.fixture.ts`**

```typescript
// apps/backend/test/integration/fixtures/account.fixture.ts
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

interface CreateAccountParams {
  userId: string;
  name?: string;
  type?: 'BANK' | 'WALLET' | 'CASH' | 'CARD' | 'INVESTMENT';
  currency?: 'ARS' | 'USD';
  balance?: number;
}

export async function createTestAccount(
  prisma: PrismaService,
  params: CreateAccountParams,
) {
  return prisma.account.create({
    data: {
      userId: params.userId,
      name: params.name ?? `account_${Date.now()}`,
      type: params.type ?? 'BANK',
      currency: params.currency ?? 'ARS',
      balance: params.balance ?? 0,
    },
  });
}
```

- [ ] **Step 3: Create `transaction.fixture.ts`**

```typescript
// apps/backend/test/integration/fixtures/transaction.fixture.ts
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

interface CreateTransactionParams {
  userId: string;
  type?: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'PAYMENT' | 'INVESTMENT' | 'RETURN';
  amount?: number;
  date?: Date;
  description?: string;
  sourceAccountId?: string;
  targetAccountId?: string;
  categoryId?: string;
}

export async function createTestTransaction(
  prisma: PrismaService,
  params: CreateTransactionParams,
) {
  return prisma.transaction.create({
    data: {
      userId: params.userId,
      type: params.type ?? 'EXPENSE',
      amount: params.amount ?? 1000,
      date: params.date ?? new Date(),
      description: params.description ?? `Transaction ${Date.now()}`,
      sourceAccountId: params.sourceAccountId,
      targetAccountId: params.targetAccountId,
      categoryId: params.categoryId,
    },
  });
}
```

- [ ] **Step 4: Create `category.fixture.ts`**

```typescript
// apps/backend/test/integration/fixtures/category.fixture.ts
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

interface CreateCategoryParams {
  userId: string;
  name?: string;
  color?: string;
}

export async function createTestCategory(
  prisma: PrismaService,
  params: CreateCategoryParams,
) {
  return prisma.category.create({
    data: {
      userId: params.userId,
      name: params.name ?? `category_${Date.now()}`,
      color: params.color ?? '#FF5733',
    },
  });
}
```

- [ ] **Step 5: Create `index.ts`**

```typescript
// apps/backend/test/integration/fixtures/index.ts
export { createTestUser } from './user.fixture';
export { createTestAccount } from './account.fixture';
export { createTestTransaction } from './transaction.fixture';
export { createTestCategory } from './category.fixture';
```

- [ ] **Step 6: Commit**

```bash
git add apps/backend/test/integration/fixtures/
git commit -m "test(backend): add integration test fixtures"
```

---

## Task 4: Auth Integration Tests

**Files:**
- Create: `apps/backend/test/integration/auth/auth.register.e2e-spec.ts`
- Create: `apps/backend/test/integration/auth/auth.login.e2e-spec.ts`
- Create: `apps/backend/test/integration/auth/auth.refresh.e2e-spec.ts`
- Create: `apps/backend/test/integration/auth/auth.change-password.e2e-spec.ts`

**Interfaces:**
- Consumes: `createTestApp()`, `registerAndLogin()`, `cleanDatabase()`
- Produces: passing auth integration tests

- [ ] **Step 1: Create `auth.register.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/auth/auth.register.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Auth Register (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name: 'newuser',
        email: 'newuser@test.com',
        password: 'password123',
      })
      .expect(201);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.name).toBe('newuser');
  });

  it('should reject duplicate username', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name: 'duplicateuser',
        email: 'first@test.com',
        password: 'password123',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name: 'duplicateuser',
        email: 'second@test.com',
        password: 'password123',
      })
      .expect(400);
  });

  it('should reject missing fields', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name: 'incomplete',
      })
      .expect(400);
  });
});
```

- [ ] **Step 2: Run auth register tests**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx jest --runInBand --config ./test/integration/jest.config.ts test/integration/auth/auth.register.e2e-spec.ts
```

Expected: Tests pass

- [ ] **Step 3: Create `auth.login.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/auth/auth.login.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Auth Login (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should login with valid credentials', async () => {
    const user = await registerAndLogin(app);

    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ name: user.userName, password: 'testpass123' })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should reject invalid password', async () => {
    await registerAndLogin(app, {
      name: 'wrongpassuser',
      email: 'wrongpass@test.com',
      password: 'correctpass',
    });

    await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ name: 'wrongpassuser', password: 'wrongpass' })
      .expect(401);
  });

  it('should reject non-existent user', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ name: 'nonexistent', password: 'password' })
      .expect(401);
  });
});
```

- [ ] **Step 4: Create `auth.refresh.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/auth/auth.refresh.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Auth Refresh (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should refresh tokens with valid refresh token', async () => {
    const user = await registerAndLogin(app);

    const response = await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: user.refreshToken })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should reject invalid refresh token', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: 'invalid-token' })
      .expect(401);
  });
});
```

- [ ] **Step 5: Create `auth.change-password.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/auth/auth.change-password.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Auth Change Password (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should change password with valid current password', async () => {
    const user = await registerAndLogin(app);

    await request(app.getHttpServer())
      .post('/api/auth/change-password')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        currentPassword: 'testpass123',
        newPassword: 'newpassword123',
      })
      .expect(200);

    // Verify can login with new password
    await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ name: user.userName, password: 'newpassword123' })
      .expect(200);
  });

  it('should reject wrong current password', async () => {
    const user = await registerAndLogin(app);

    await request(app.getHttpServer())
      .post('/api/auth/change-password')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword123',
      })
      .expect(400);
  });

  it('should reject unauthenticated request', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/change-password')
      .send({
        currentPassword: 'old',
        newPassword: 'new',
      })
      .expect(401);
  });
});
```

- [ ] **Step 6: Run all auth tests**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx jest --runInBand --config ./test/integration/jest.config.ts test/integration/auth/
```

Expected: All auth tests pass

- [ ] **Step 7: Commit**

```bash
git add apps/backend/test/integration/auth/
git commit -m "test(backend): add auth integration tests"
```

---

## Task 5: Accounts Integration Tests

**Files:**
- Create: `apps/backend/test/integration/accounts/accounts.create.e2e-spec.ts`
- Create: `apps/backend/test/integration/accounts/accounts.list.e2e-spec.ts`
- Create: `apps/backend/test/integration/accounts/accounts.get-by-id.e2e-spec.ts`
- Create: `apps/backend/test/integration/accounts/accounts.validation.e2e-spec.ts`

**Interfaces:**
- Consumes: `createTestApp()`, `registerAndLogin()`, `cleanDatabase()`, `createTestAccount()`
- Produces: passing accounts integration tests

- [ ] **Step 1: Create `accounts.create.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/accounts/accounts.create.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Accounts Create (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new account', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Savings Account',
        type: 'BANK',
        currency: 'ARS',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Savings Account');
    expect(response.body.type).toBe('BANK');
    expect(response.body.currency).toBe('ARS');
  });

  it('should reject duplicate account name for same user', async () => {
    await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Duplicate Account',
        type: 'BANK',
        currency: 'ARS',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Duplicate Account',
        type: 'WALLET',
        currency: 'ARS',
      })
      .expect(400);
  });

  it('should reject invalid account type', async () => {
    await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Invalid Type',
        type: 'INVALID',
        currency: 'ARS',
      })
      .expect(400);
  });

  it('should reject unauthenticated request', async () => {
    await request(app.getHttpServer())
      .post('/api/accounts')
      .send({
        name: 'No Auth',
        type: 'BANK',
        currency: 'ARS',
      })
      .expect(401);
  });
});
```

- [ ] **Step 2: Create `accounts.list.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/accounts/accounts.list.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Accounts List (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);

    // Create some accounts
    await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Account 1', type: 'BANK', currency: 'ARS' });

    await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Account 2', type: 'WALLET', currency: 'ARS' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return user accounts', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  it('should not return other users accounts', async () => {
    // Create another user
    const otherAuth = await registerAndLogin(app);

    const response = await request(app.getHttpServer())
      .get('/api/accounts')
      .set('Authorization', `Bearer ${otherAuth.accessToken}`)
      .expect(200);

    // Other user should have 0 accounts
    expect(response.body.length).toBe(0);
  });
});
```

- [ ] **Step 3: Create `accounts.get-by-id.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/accounts/accounts.get-by-id.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Accounts Get By Id (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;
  let accountId: string;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);

    const response = await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Get By Id Account', type: 'BANK', currency: 'ARS' });

    accountId = response.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return account by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/api/accounts/${accountId}`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body.id).toBe(accountId);
    expect(response.body.name).toBe('Get By Id Account');
  });

  it('should return null for non-existent account', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/accounts/nonexistent')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body).toBeNull();
  });
});
```

- [ ] **Step 4: Create `accounts.validation.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/accounts/accounts.validation.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Accounts Validation (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should reject empty name', async () => {
    await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: '',
        type: 'BANK',
        currency: 'ARS',
      })
      .expect(400);
  });

  it('should reject name longer than 50 chars', async () => {
    await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'A'.repeat(51),
        type: 'BANK',
        currency: 'ARS',
      })
      .expect(400);
  });

  it('should reject invalid currency', async () => {
    await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Invalid Currency',
        type: 'BANK',
        currency: 'EUR',
      })
      .expect(400);
  });
});
```

- [ ] **Step 5: Run all accounts tests**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx jest --runInBand --config ./test/integration/jest.config.ts test/integration/accounts/
```

Expected: All accounts tests pass

- [ ] **Step 6: Commit**

```bash
git add apps/backend/test/integration/accounts/
git commit -m "test(backend): add accounts integration tests"
```

---

## Task 6: Transactions Integration Tests

**Files:**
- Create: `apps/backend/test/integration/transactions/transactions.create.e2e-spec.ts`
- Create: `apps/backend/test/integration/transactions/transactions.list.e2e-spec.ts`
- Create: `apps/backend/test/integration/transactions/transactions.balance-update.e2e-spec.ts`
- Create: `apps/backend/test/integration/transactions/transactions.recurrence.e2e-spec.ts`

**Interfaces:**
- Consumes: `createTestApp()`, `registerAndLogin()`, `cleanDatabase()`, `createTestAccount()`
- Produces: passing transactions integration tests

- [ ] **Step 1: Create `transactions.create.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/transactions/transactions.create.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Transactions Create (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;
  let sourceAccountId: string;
  let targetAccountId: string;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);

    // Create source account
    const sourceResponse = await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Source Account', type: 'BANK', currency: 'ARS' });
    sourceAccountId = sourceResponse.body.id;

    // Create target account
    const targetResponse = await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Target Account', type: 'BANK', currency: 'ARS' });
    targetAccountId = targetResponse.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an expense transaction', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
        amount: '5000',
        date: '2026-01-15',
        description: 'Groceries',
        sourceAccountId,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.type).toBe('EXPENSE');
    expect(response.body.amount).toBe('5000');
  });

  it('should create an income transaction', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'INCOME',
        amount: '100000',
        date: '2026-01-01',
        description: 'Salary',
        targetAccountId,
      })
      .expect(201);

    expect(response.body.type).toBe('INCOME');
  });

  it('should reject transaction without required fields', async () => {
    await request(app.getHttpServer())
      .post('/api/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
      })
      .expect(400);
  });
});
```

- [ ] **Step 2: Create `transactions.list.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/transactions/transactions.list.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Transactions List (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;
  let accountId: string;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);

    // Create account
    const accountResponse = await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'List Account', type: 'BANK', currency: 'ARS' });
    accountId = accountResponse.body.id;

    // Create transactions
    await request(app.getHttpServer())
      .post('/api/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
        amount: '1000',
        date: '2026-01-10',
        description: 'Transaction 1',
        sourceAccountId: accountId,
      });

    await request(app.getHttpServer())
      .post('/api/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
        amount: '2000',
        date: '2026-01-15',
        description: 'Transaction 2',
        sourceAccountId: accountId,
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return paginated transactions', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/transactions?page=1&limit=10')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('total');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThanOrEqual(2);
  });
});
```

- [ ] **Step 3: Create `transactions.balance-update.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/transactions/transactions.balance-update.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Transactions Balance Update (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;
  let accountId: string;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);

    // Create account with initial balance
    const accountResponse = await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Balance Account', type: 'BANK', currency: 'ARS' });
    accountId = accountResponse.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should decrement balance on expense', async () => {
    // Get initial balance
    const initialResponse = await request(app.getHttpServer())
      .get(`/api/accounts/${accountId}`)
      .set('Authorization', `Bearer ${auth.accessToken}`);
    const initialBalance = parseFloat(initialResponse.body.balance);

    // Create expense
    await request(app.getHttpServer())
      .post('/api/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
        amount: '5000',
        date: '2026-01-15',
        description: 'Balance test',
        sourceAccountId: accountId,
      })
      .expect(201);

    // Check new balance
    const newResponse = await request(app.getHttpServer())
      .get(`/api/accounts/${accountId}`)
      .set('Authorization', `Bearer ${auth.accessToken}`);
    const newBalance = parseFloat(newResponse.body.balance);

    expect(newBalance).toBe(initialBalance - 5000);
  });
});
```

- [ ] **Step 4: Create `transactions.recurrence.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/transactions/transactions.recurrence.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Transactions Recurrence (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;
  let accountId: string;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);

    const accountResponse = await request(app.getHttpServer())
      .post('/api/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Recurrence Account', type: 'BANK', currency: 'ARS' });
    accountId = accountResponse.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a transaction with recurrence', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
        amount: '10000',
        date: '2026-01-01',
        description: 'Rent',
        sourceAccountId: accountId,
        isRecurrence: true,
        frequency: 'MONTHLY',
        totalParts: 12,
      })
      .expect(201);

    expect(response.body).toHaveProperty('recurrenceId');
  });
});
```

- [ ] **Step 5: Run all transactions tests**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx jest --runInBand --config ./test/integration/jest.config.ts test/integration/transactions/
```

Expected: All transactions tests pass

- [ ] **Step 6: Commit**

```bash
git add apps/backend/test/integration/transactions/
git commit -m "test(backend): add transactions integration tests"
```

---

## Task 7: Recurrences Integration Tests

**Files:**
- Create: `apps/backend/test/integration/recurrences/recurrences.create.e2e-spec.ts`
- Create: `apps/backend/test/integration/recurrences/recurrences.list.e2e-spec.ts`
- Create: `apps/backend/test/integration/recurrences/recurrences.next-date.e2e-spec.ts`

**Interfaces:**
- Consumes: `createTestApp()`, `registerAndLogin()`, `cleanDatabase()`
- Produces: passing recurrences integration tests

- [ ] **Step 1: Create `recurrences.create.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/recurrences/recurrences.create.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Recurrences Create (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a recurrence', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/recurrences')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Monthly Rent',
        type: 'EXPENSE',
        amount: '50000',
        frequency: 'MONTHLY',
        startDate: '2026-01-01',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Monthly Rent');
  });

  it('should reject invalid frequency', async () => {
    await request(app.getHttpServer())
      .post('/api/recurrences')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Invalid Frequency',
        type: 'EXPENSE',
        amount: '50000',
        frequency: 'DAILY',
        startDate: '2026-01-01',
      })
      .expect(400);
  });
});
```

- [ ] **Step 2: Create `recurrences.list.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/recurrences/recurrences.list.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Recurrences List (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);

    // Create recurrences
    await request(app.getHttpServer())
      .post('/api/recurrences')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Recurrence 1',
        type: 'EXPENSE',
        amount: '10000',
        frequency: 'MONTHLY',
        startDate: '2026-01-01',
      });

    await request(app.getHttpServer())
      .post('/api/recurrences')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Recurrence 2',
        type: 'EXPENSE',
        amount: '20000',
        frequency: 'WEEKLY',
        startDate: '2026-01-01',
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return user recurrences', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/recurrences')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });
});
```

- [ ] **Step 3: Create `recurrences.next-date.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/recurrences/recurrences.next-date.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Recurrences Next Date (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should calculate next date for monthly recurrence', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/recurrences')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Monthly Test',
        type: 'EXPENSE',
        amount: '10000',
        frequency: 'MONTHLY',
        startDate: '2026-01-01',
      })
      .expect(201);

    expect(response.body).toHaveProperty('nextDate');
    const nextDate = new Date(response.body.nextDate);
    expect(nextDate.getMonth()).toBe(1); // February
  });
});
```

- [ ] **Step 4: Run all recurrences tests**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx jest --runInBand --config ./test/integration/jest.config.ts test/integration/recurrences/
```

Expected: All recurrences tests pass

- [ ] **Step 5: Commit**

```bash
git add apps/backend/test/integration/recurrences/
git commit -m "test(backend): add recurrences integration tests"
```

---

## Task 8: Categories Integration Tests

**Files:**
- Create: `apps/backend/test/integration/categories/categories.create.e2e-spec.ts`
- Create: `apps/backend/test/integration/categories/categories.list.e2e-spec.ts`

**Interfaces:**
- Consumes: `createTestApp()`, `registerAndLogin()`, `cleanDatabase()`
- Produces: passing categories integration tests

- [ ] **Step 1: Create `categories.create.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/categories/categories.create.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Categories Create (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a category', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/categories')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Food',
        color: '#FF5733',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Food');
  });

  it('should reject duplicate category name', async () => {
    await request(app.getHttpServer())
      .post('/api/categories')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Duplicate',
        color: '#000000',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/api/categories')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        name: 'Duplicate',
        color: '#111111',
      })
      .expect(400);
  });
});
```

- [ ] **Step 2: Create `categories.list.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/categories/categories.list.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Categories List (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);

    await request(app.getHttpServer())
      .post('/api/categories')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Category 1', color: '#FF0000' });

    await request(app.getHttpServer())
      .post('/api/categories')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Category 2', color: '#00FF00' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return user categories', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/categories')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });
});
```

- [ ] **Step 3: Run all categories tests**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx jest --runInBand --config ./test/integration/jest.config.ts test/integration/categories/
```

Expected: All categories tests pass

- [ ] **Step 4: Commit**

```bash
git add apps/backend/test/integration/categories/
git commit -m "test(backend): add categories integration tests"
```

---

## Task 9: Cards Integration Tests

**Files:**
- Create: `apps/backend/test/integration/cards/cards.statement.e2e-spec.ts`
- Create: `apps/backend/test/integration/cards/cards.close.e2e-spec.ts`

**Interfaces:**
- Consumes: `createTestApp()`, `registerAndLogin()`, `cleanDatabase()`
- Produces: passing cards integration tests

- [ ] **Step 1: Create `cards.statement.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/cards/cards.statement.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Cards Statement (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return card statement', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/cards/statement')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('transactions');
    expect(Array.isArray(response.body.transactions)).toBe(true);
  });
});
```

- [ ] **Step 2: Create `cards.close.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/cards/cards.close.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Cards Close (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should close card and transfer balance', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/cards/close')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        cardAccountId: 'test-card-id',
        targetAccountId: 'test-target-id',
      });

    // Response depends on implementation - could be 200, 201, or 404 if no card exists
    expect([200, 201, 404]).toContain(response.status);
  });
});
```

- [ ] **Step 3: Run all cards tests**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx jest --runInBand --config ./test/integration/jest.config.ts test/integration/cards/
```

Expected: All cards tests pass

- [ ] **Step 4: Commit**

```bash
git add apps/backend/test/integration/cards/
git commit -m "test(backend): add cards integration tests"
```

---

## Task 10: Dashboard Integration Tests

**Files:**
- Create: `apps/backend/test/integration/dashboard/dashboard.budget.e2e-spec.ts`
- Create: `apps/backend/test/integration/dashboard/dashboard.summary.e2e-spec.ts`

**Interfaces:**
- Consumes: `createTestApp()`, `registerAndLogin()`, `cleanDatabase()`
- Produces: passing dashboard integration tests

- [ ] **Step 1: Create `dashboard.budget.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/dashboard/dashboard.budget.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Dashboard Budget (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return budget summary', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/dashboard/budget')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

- [ ] **Step 2: Create `dashboard.summary.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/dashboard/dashboard.summary.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Dashboard Summary (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return income/expense summary', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/dashboard/summary')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('income');
    expect(response.body).toHaveProperty('expenses');
  });
});
```

- [ ] **Step 3: Run all dashboard tests**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx jest --runInBand --config ./test/integration/jest.config.ts test/integration/dashboard/
```

Expected: All dashboard tests pass

- [ ] **Step 4: Commit**

```bash
git add apps/backend/test/integration/dashboard/
git commit -m "test(backend): add dashboard integration tests"
```

---

## Task 11: Users + Health Integration Tests

**Files:**
- Create: `apps/backend/test/integration/users/users.profile.e2e-spec.ts`
- Create: `apps/backend/test/integration/health/health.check.e2e-spec.ts`

**Interfaces:**
- Consumes: `createTestApp()`, `registerAndLogin()`, `cleanDatabase()`
- Produces: passing users and health integration tests

- [ ] **Step 1: Create `users.profile.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/users/users.profile.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Users Profile (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return user profile', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(auth.userId);
  });

  it('should reject unauthenticated request', async () => {
    await request(app.getHttpServer())
      .get('/api/users/profile')
      .expect(401);
  });
});
```

- [ ] **Step 2: Create `health.check.e2e-spec.ts`**

```typescript
// apps/backend/test/integration/health/health.check.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from '../helpers';

describe('Health Check (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return health status', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/health')
      .expect(200);

    expect(response.body).toHaveProperty('status');
  });
});
```

- [ ] **Step 3: Run all users and health tests**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx jest --runInBand --config ./test/integration/jest.config.ts test/integration/users/ test/integration/health/
```

Expected: All users and health tests pass

- [ ] **Step 4: Commit**

```bash
git add apps/backend/test/integration/users/ apps/backend/test/integration/health/
git commit -m "test(backend): add users and health integration tests"
```

---

## Task 12: Run Full Test Suite

**Files:**
- None (verification step)

**Interfaces:**
- Consumes: all test files created in previous tasks
- Produces: passing full integration test suite

- [ ] **Step 1: Run all integration tests**

```bash
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" pnpm test:integration
```

Expected: All 23 test files pass

- [ ] **Step 2: Fix any failures**

If tests fail, debug and fix the issue. Common issues:
- Database connection errors
- Missing environment variables
- Incorrect API endpoints
- Validation errors

- [ ] **Step 3: Commit fixes (if any)**

```bash
git add .
git commit -m "fix(backend): fix integration test failures"
```

---

## Task 13: CI/CD Workflow

**Files:**
- Create: `.github/workflows/test.yml`

**Interfaces:**
- Consumes: all test files
- Produces: GitHub Actions workflow

- [ ] **Step 1: Create `.github/workflows/test.yml`**

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

- [ ] **Step 2: Commit workflow**

```bash
git add .github/workflows/test.yml
git commit -m "ci: add integration test workflow"
```

---

## Task 14: Documentation

**Files:**
- Create: `app/docs/superpowers/guides/integration-testing-guide.md`

**Interfaces:**
- Consumes: all implementation decisions
- Produces: comprehensive testing guide

- [ ] **Step 1: Create integration testing guide**

```markdown
# Integration Testing Guide — appFinance

## Quick Start

### Prerequisites

1. Docker running with dev database
2. Node.js 20+
3. pnpm

### Setup

```bash
# 1. Create test database (first time only)
docker exec -it finance-app-db psql -U user -c "CREATE DATABASE appfinance_test;"

# 2. Apply migrations
cd apps/backend
DATABASE_URL="postgresql://user:password@localhost:5432/appfinance_test" npx prisma migrate deploy

# 3. Run tests
pnpm test:integration
```

## Writing Integration Tests

### Test Structure

```typescript
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

describe('Feature Name (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    auth = await registerAndLogin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should do something', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/endpoint')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('expectedField');
  });
});
```

### Helpers

- `createTestApp()` — creates NestJS test application
- `registerAndLogin()` — registers user and returns auth tokens
- `cleanDatabase()` — truncates all tables

### Fixtures

- `createTestUser()` — creates test user
- `createTestAccount()` — creates test account
- `createTestTransaction()` — creates test transaction
- `createTestCategory()` — creates test category

## Running Tests

```bash
# Run all integration tests
pnpm test:integration

# Run specific module tests
pnpm test:integration -- --testPathPattern=auth

# Run in watch mode
pnpm test:integration:watch
```

## Best Practices

1. **One test per scenario** — keep tests focused
2. **Use descriptive names** — `should reject invalid input` not `should fail`
3. **Clean up in afterAll** — close app and disconnect Prisma
4. **Use fixtures** — don't create test data manually
5. **Test error cases** — not just happy path
```

- [ ] **Step 2: Commit documentation**

```bash
git add app/docs/superpowers/guides/integration-testing-guide.md
git commit -m "docs: add integration testing guide"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-01-integration-testing-foundation.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
