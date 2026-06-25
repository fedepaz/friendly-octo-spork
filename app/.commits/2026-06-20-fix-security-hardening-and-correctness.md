fix: security hardening, query optimization, and type correctness across all layers

Backend Security:
- Remove DATABASE_URL (contains password) from startup console.log
- Clean .env.example with placeholder secrets and instructions
- Fix IDOR: GET /users now returns only the authenticated user
- Fix default password detection: use bcrypt.compare instead of plaintext ===
- JWT secret fallback changed from ' ' to getOrThrow (fail fast if missing)
- Restrict CORS methods to GET+POST+OPTIONS (API only uses those)

Backend Correctness:
- Register RequestIdMiddleware in AppModule (was defined but never connected)
- Optimize getAccounts() to select only needed fields instead of loading all transactions
- Add ParseIntPipe/ParseUUIDPipe to all controller @Param decorators
- Add FK indexes on Transaction.sourceAccountId and targetAccountId
- Logger level reads from BACKEND_NODE_ENV instead of hardcoded 'debug'

Shared Package:
- Add recurrenceName to TransactionDTO interface (was in Zod schema but missing from type)
- Add explicit INSTALLMENT case in calculateNextDate (was silently falling through to default)
- Move @repo/shared from devDependencies to dependencies (used at runtime)

Frontend:
- Remove hardcoded mock netWorthData, derive real data from income-expense API
- Dynamic month names in KPIs via toLocaleDateString (was hardcoded 'Junio')
- Fix query key collision: rename auth userProfileQueryKeys to authQueryKeys
- Fix pre-existing type errors in sidebar-charts-budget and transactions columns

Prisma:
- Regenerate client to sync Decimal(19,4) and non-nullable email with schema
