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
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { prisma } from '../setup';

describe('Feature Name (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
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
