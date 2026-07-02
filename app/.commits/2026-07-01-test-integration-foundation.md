test(backend): add integration testing foundation with CI/CD

Phase 2 of testing strategy: API-level integration tests using Supertest
against a real PostgreSQL database, with GitHub Actions CI pipeline.

Infrastructure:
- Jest config, PrismaClient setup, app/auth/db helpers, fixtures
- .env.test with dedicated test database credentials
- test:integration and test:integration:watch scripts

Tests (15 files, 44 tests across all 9 modules):
- Auth: register, login, refresh, change-password
- Accounts: create, list, get-by-id
- Transactions: create, list (paginated + by month)
- Cards: statement (by month, by account, close/pay)
- Recurrences: list (by month/type)
- Categories: list
- Dashboard: summary (budget, recent, income-expense, toPay)
- Users: profile
- Health: check (public + auth)

CI/CD:
- GitHub Actions workflow with separate unit + integration jobs
- PostgreSQL service for integration tests
- Runs on every PR to main

Docs:
- Integration testing design spec, implementation plan, and guide

Lint:
- Fixed ESLint config to cover .e2e-spec.ts and test/**/*.ts files
- Removed unused prisma imports from 14 test files
