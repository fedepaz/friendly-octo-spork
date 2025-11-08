# 🚀 Complete API Endpoints

## 1️⃣ Accounts API

### Base URL: `/api/accounts`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | List all accounts for user | ✅ |
| POST | `/` | Create new account | ✅ |
| GET | `/:id` | Get account details | ✅ |
| PUT | `/:id` | Update account | ✅ |
| DELETE | `/:id` | Delete account | ✅ |
| GET | `/:id/balance` | Get current balance | ✅ |
| GET | `/:id/history` | Get transaction history | ✅ |

**Query Parameters (GET `/`):**
- `type`: Filter by account type (BANK, WALLET, CASH, CARD, INVESTMENT)
- `currency`: Filter by currency (ARS, USD, USDT)

---

## 2️⃣ Categories API

### Base URL: `/api/categories`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | List all categories for user | ✅ |
| POST | `/` | Create new category | ✅ |
| GET | `/:id` | Get category details | ✅ |
| PUT | `/:id` | Update category | ✅ |
| DELETE | `/:id` | Delete category | ✅ |
| GET | `/:id/stats` | Get spending stats for category | ✅ |

**Query Parameters (GET `/`):**
- `type`: Filter by category type (GASTO, PAGO, INGRESO, RENDIMIENTO)

---

## 3️⃣ Recurrences API

### Base URL: `/api/recurrences`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | List all recurrences for user | ✅ |
| POST | `/` | Create new recurrence | ✅ |
| GET | `/:id` | Get recurrence details | ✅ |
| PUT | `/:id` | Update recurrence | ✅ |
| DELETE | `/:id` | Delete recurrence | ✅ |
| POST | `/:id/execute` | Execute next recurrence transaction | ✅ |
| PUT | `/:id/pause` | Pause recurrence | ✅ |
| PUT | `/:id/resume` | Resume recurrence | ✅ |

**Query Parameters (GET `/`):**
- `active`: Filter by active status (true/false)
- `frequency`: Filter by frequency (MONTHLY, WEEKLY, YEARLY, INSTALLMENT)

---

## 4️⃣ Transactions API

### Base URL: `/api/transactions`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | List all transactions (with filters) | ✅ |
| POST | `/` | Create new transaction | ✅ |
| GET | `/:id` | Get transaction details | ✅ |
| PUT | `/:id` | Update transaction | ✅ |
| GET | `/:id/edit` | Get edit form (HTMX) | ✅ |

**Query Parameters (GET `/`):**
- `startDate`: Filter by start date (ISO string)
- `endDate`: Filter by end date (ISO string)
- `type`: Filter by transaction type (INCOME, EXPENSE, TRANSFER, INVESTMENT, RETURN)
- `categoryId`: Filter by category ID
- `sourceAccountId`: Filter by source account ID
- `targetAccountId`: Filter by target account ID
- `recurrenceId`: Filter by recurrence ID
- `limit`: Pagination limit (default: 50)
- `offset`: Pagination offset (default: 0)

---

## 5️⃣ Dashboard API

### Base URL: `/api/dashboard`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get dashboard page (full render) | ✅ |
| GET | `/stats` | Get monthly stats (HTMX partial) | ✅ |
| GET | `/chart` | Get monthly chart data (HTMX partial) | ✅ |
| GET | `/recent` | Get recent transactions (HTMX partial) | ✅ |

**Query Parameters (GET `/stats`):**
- `month`: Month to query (ISO date, defaults to current month)

---

## 📊 Response Formats

### Success Response (List)
```json
{
  "data": [...],
  "total": 42,
  "hasMore": true
}
```

### Success Response (Single)
```json
{
  "data": {...}
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": {
    "field": ["validation error"]
  }
}
```

---

## 🔐 Authentication

All endpoints require authentication via a custom JWT middleware. The JWT is expected to be present in an `httpOnly` cookie named `auth_token`.

Upon successful authentication, the `userId` is extracted from the JWT payload and made available in the Hono context for filtering queries.