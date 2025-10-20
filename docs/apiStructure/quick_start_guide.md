# 🚀 Quick Start Guide

## Step-by-Step Implementation

### 1️⃣ Setup Base Infrastructure

```bash
# Install dependencies
bun install hono @hono/zod-validator hono/jwt bcrypt
bun install zod
bun install @prisma/client

# Generate Prisma client
bunx prisma generate

# Run initial migration
bunx prisma migrate dev --name init

# Seed some test data (optional)
bunx prisma db seed
```

### 2️⃣ Create Prisma Client Helper

**File: `src/lib/prisma.ts`**
```typescript
import { PrismaClient } from '../generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### 3️⃣ Create Layout Component

**File: `src/components/shared/Layout.tsx`**
```typescript
export function Layout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Finance Tracker</title>
        
        {/* Tabler CSS */}
        <link 
          href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css" 
          rel="stylesheet" 
        />
        
        {/* HTMX */}
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        
        {/* Custom styles */}
        <style>{`
          .htmx-indicator {
            display: none;
          }
          .htmx-request .htmx-indicator {
            display: inline-block;
          }
        `}</style>
      </head>
      <body>
        <div class="page">
          <header class="navbar navbar-expand-md navbar-light d-print-none">
            <div class="container-xl">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                <span class="navbar-toggler-icon"></span>
              </button>
              <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                <a href="/dashboard">Finance Tracker</a>
              </h1>
              <div class="navbar-nav flex-row order-md-last">
                <div class="nav-item">
                  <a href="/api/logout" class="nav-link">Sign Out</a>
                </div>
              </div>
            </div>
          </header>
          
          <div class="navbar-expand-md">
            <div class="collapse navbar-collapse" id="navbar-menu">
              <div class="navbar navbar-light">
                <div class="container-xl">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" href="/dashboard">
                        <span class="nav-link-icon">📊</span>
                        <span class="nav-link-title">Dashboard</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/transactions">
                        <span class="nav-link-icon">💸</span>
                        <span class="nav-link-title">Transactions</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/accounts">
                        <span class="nav-link-icon">🏦</span>
                        <span class="nav-link-title">Accounts</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/categories">
                        <span class="nav-link-icon">🏷️</span>
                        <span class="nav-link-title">Categories</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/recurrences">
                        <span class="nav-link-icon">🔄</span>
                        <span class="nav-link-title">Recurrences</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="page-wrapper">
            {children}
          </div>
        </div>
        
        {/* Tabler JS */}
        <script src="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/js/tabler.min.js"></script>
      </body>
    </html>
  );
}
```

### 4️⃣ Test Your First Module (Accounts)

```bash
# Start the dev server
bun run dev

# Test in browser or with curl (after logging in to get a session cookie)
curl http://localhost:3000/api/accounts

# Create an account (after logging in to get a session cookie)
curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Main Checking",
    "type": "BANK",
    "currency": "ARS",
    "balance": 50000
  }'
```

### 5️⃣ Verify Database

```bash
# Open Prisma Studio
bunx prisma studio

# Check your data visually at http://localhost:5555
```

### 6️⃣ Add Seed Data for Testing

**File: `prisma/seed.ts`**
```typescript
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const testUserId = 1;

  // Create user
  await prisma.user.upsert({
    where: { id: testUserId },
    update: {},
    create: {
      id: testUserId,
      name: 'Test User',
      email: 'test@example.com',
    },
  });

  // Create accounts
  const cashAccount = await prisma.account.create({
    data: {
      userId: testUserId,
      name: 'Cash',
      type: 'CASH',
      currency: 'ARS',
      balance: 50000,
    },
  });

  const bankAccount = await prisma.account.create({
    data: {
      userId: testUserId,
      name: 'Bank Account',
      type: 'BANK',
      currency: 'ARS',
      balance: 200000,
    },
  });

  // Create categories
  const foodCategory = await prisma.category.create({
    data: {
      userId: testUserId,
      name: 'Food',
      type: 'GASTO',
      color: '#FF6B6B',
    },
  });

  const salaryCategory = await prisma.category.create({
    data: {
      userId: testUserId,
      name: 'Salary',
      type: 'INGRESO',
      color: '#4ECDC4',
    },
  });

  // Create transactions
  await prisma.transaction.create({
    data: {
      userId: testUserId,
      type: 'INCOME',
      amount: 500000,
      date: new Date('2025-10-01'),
      description: 'Monthly Salary',
      categoryId: salaryCategory.id,
      targetAccountId: bankAccount.id,
    },
  });

  await prisma.transaction.create({
    data: {
      userId: testUserId,
      type: 'EXPENSE',
      amount: 27500,
      date: new Date('2025-10-05'),
      description: 'Groceries',
      categoryId: foodCategory.id,
      sourceAccountId: cashAccount.id,
    },
  });

  console.log('✅ Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Add to `package.json`:**
```json
{
  "prisma": {
    "seed": "bun run prisma/seed.ts"
  }
}
```

**Run seed:**
```bash
bunx prisma db seed
```

---

## 🧪 Testing Workflow

### Test Each Endpoint Manually

**1. Create Account:**
```bash
curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Savings",
    "type": "BANK",
    "currency": "USD",
    "balance": 1000
  }'
```

**2. List Accounts:**
```bash
curl http://localhost:3000/api/accounts
```

**3. Create Category:**
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Transport",
    "type": "GASTO",
    "color": "#95E1D3"
  }'
```

**4. Create Transaction:**
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "EXPENSE",
    "amount": 500,
    "date": "2025-10-19",
    "description": "Uber to work",
    "categoryId": 1,
    "sourceAccountId": 1
  }'
```

---

## 🐛 Common Issues & Solutions

### Issue: Prisma Client not found
```bash
# Solution:
bunx prisma generate
```

### Issue: Database connection error
```bash
# Check your DATABASE_URL in .env
# Make sure PostgreSQL is running
```

### Environment Variables Needed
```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/finance_tracker"

# Custom Auth
JWT_SECRET="your_strong_jwt_secret"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="your_bcrypt_password_hash"

# App
NODE_ENV="development"
PORT="3000"
FRONTEND_URL="http://localhost:3000"
```

### Issue: HTMX not updating
```bash
# Check browser console for errors
# Verify hx-target and hx-swap attributes
# Make sure HTMX script is loaded
```

---

## 📊 Progress Tracking

Use this checklist as you implement:

- [ ] ✅ Database schema & migrations
- [ ] ✅ Prisma client setup
- [ ] ✅ Base components (Layout, etc.)
- [ ] ✅ Accounts module
- [ ] ⬜ Categories module
- [ ] ⬜ Recurrences module
- [ ] ⬜ Transactions module
- [ ] ⬜ Dashboard module
- [ ] ⬜ Testing
- [ ] ⬜ Deployment

---

## 🎯 Next Steps

1. **Start with Accounts module** - It's the foundation
2. **Test each endpoint** before moving to the next module
3. **Build UI components** after backend is working
4. **Add tests** incrementally
5. **Deploy** when core features are stable