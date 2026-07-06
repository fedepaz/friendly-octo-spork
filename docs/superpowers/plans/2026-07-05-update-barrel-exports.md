# Update Barrel Export Files Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update all barrel export files (index.ts) in the features directory to have categorized sections (Components, Hooks, Services)

**Architecture:** Each feature's index.ts will be reorganized with categorized export sections: Components, Hooks, Services (API), and Providers where applicable. Only exports that actually exist in the codebase will be included.

**Tech Stack:** TypeScript, barrel exports, named exports

## Global Constraints

- Only export things that actually exist in the codebase
- Maintain existing export names (no renaming)
- Use categorized sections with comments: // Components, // Hooks, // Services
- Preserve the existing export patterns (named exports vs wildcard exports)
- Do not remove any existing exports unless they reference non-existent files

---

### Task 1: Update auth/index.ts

**Files:**
- Modify: `apps/frontend/src/features/auth/index.ts`

**Current exports:**
- AuthSkeleton
- AuthDashboard

**Actual files available:**
- Components: auth-skeleton.tsx, AuthDashboard.tsx, login-form.tsx, register-form.tsx
- Hooks: useRegister.ts, use-permissions.ts, useLogin.ts, useChangePassword.ts, useLogout.ts, useAuth.ts, use-authUser.ts
- API: authService.ts

- [ ] **Step 1: Update auth/index.ts with categorized sections**

```typescript
// src/features/auth/index.ts

// Components
export { AuthSkeleton } from "./components/auth-skeleton";
export { AuthDashboard } from "./components/AuthDashboard";

// Hooks
export { useRegister } from "./hooks/useRegister";
export { usePermissions } from "./hooks/use-permissions";
export { useLogin } from "./hooks/useLogin";
export { useChangePassword } from "./hooks/useChangePassword";
export { useLogout } from "./hooks/useLogout";
export { useAuth } from "./hooks/useAuth";
export { useAuthUser } from "./hooks/use-authUser";

// Services
export { authService } from "./api/authService";
```

- [ ] **Step 2: Commit changes**

```bash
git add apps/frontend/src/features/auth/index.ts
git commit -m "feat(auth): organize barrel exports with categorized sections"
```

---

### Task 2: Update accounts/index.ts

**Files:**
- Modify: `apps/frontend/src/features/accounts/index.ts`

**Current exports:**
- AccountDashboard
- AccountDashboardSkeleton

**Actual files available:**
- Components: account-view-form.tsx, columns.tsx, account-create-form.tsx, account-dashboard-skeleton.tsx, account-data-table.tsx, AccountDashboard.tsx
- Hooks: accountsHooks.ts, createAccountHook.ts
- API: accountService.ts

- [ ] **Step 1: Update accounts/index.ts with categorized sections**

```typescript
// src/features/accounts/index.ts

// Components
export { AccountDashboard } from "./components/AccountDashboard";
export { AccountDashboardSkeleton } from "./components/account-dashboard-skeleton";

// Hooks
export { useAccounts } from "./hooks/accountsHooks";
export { useCreateAccount } from "./hooks/createAccountHook";

// Services
export { accountService } from "./api/accountService";
```

- [ ] **Step 2: Commit changes**

```bash
git add apps/frontend/src/features/accounts/index.ts
git commit -m "feat(accounts): organize barrel exports with categorized sections"
```

---

### Task 3: Update cards/index.ts

**Files:**
- Modify: `apps/frontend/src/features/cards/index.ts`

**Current exports:**
- CardsDashboard
- cards-dashboard-skeleton (wildcard)

**Actual files available:**
- Components: cards-view-form.tsx, columns.tsx, CardsDashboard.tsx, cards-dashboard-skeleton.tsx, cards-data-table.tsx
- Hooks: cardHooks.ts
- API: cardService.ts

- [ ] **Step 1: Update cards/index.ts with categorized sections**

```typescript
// src/features/cards/index.ts

// Components
export * from "./components/CardsDashboard";
export * from "./components/cards-dashboard-skeleton";

// Hooks
export { useCard } from "./hooks/cardHooks";

// Services
export { cardService } from "./api/cardService";
```

- [ ] **Step 2: Commit changes**

```bash
git add apps/frontend/src/features/cards/index.ts
git commit -m "feat(cards): organize barrel exports with categorized sections"
```

---

### Task 4: Update transactions/index.ts

**Files:**
- Modify: `apps/frontend/src/features/transactions/index.ts`

**Current exports:**
- TransactionsDashboard
- transactions-dashboard-skeleton (wildcard)

**Actual files available:**
- Components: columns.tsx, transactions-data-table.tsx, TransactionsDashboard.tsx, transactions-view-form.tsx, transactions-dashboard-skeleton.tsx
- Hooks: transactionsHooks.ts
- API: transactionsService.ts

- [ ] **Step 1: Update transactions/index.ts with categorized sections**

```typescript
// src/features/transactions/index.ts

// Components
export * from "./components/TransactionsDashboard";
export * from "./components/transactions-dashboard-skeleton";

// Hooks
export { useTransactions } from "./hooks/transactionsHooks";

// Services
export { transactionsService } from "./api/transactionsService";
```

- [ ] **Step 2: Commit changes**

```bash
git add apps/frontend/src/features/transactions/index.ts
git commit -m "feat(transactions): organize barrel exports with categorized sections"
```

---

### Task 5: Update recurrences/index.ts

**Files:**
- Modify: `apps/frontend/src/features/recurrences/index.ts`

**Current exports:**
- RecurrencesDashboard
- recurrences-dashboard-skeleton (wildcard)

**Actual files available:**
- Components: columns.tsx, recurrences-data-table.tsx, recurrences-dashboard-skeleton.tsx, RecurrencesDashboard.tsx, recurrence-view-form.tsx
- Hooks: recurrenceHooks.ts
- API: recurrenceService.ts

- [ ] **Step 1: Update recurrences/index.ts with categorized sections**

```typescript
// src/features/recurrences/index.ts

// Components
export * from "./components/RecurrencesDashboard";
export * from "./components/recurrences-dashboard-skeleton";

// Hooks
export { useRecurrence } from "./hooks/recurrenceHooks";

// Services
export { recurrenceService } from "./api/recurrenceService";
```

- [ ] **Step 2: Commit changes**

```bash
git add apps/frontend/src/features/recurrences/index.ts
git commit -m "feat(recurrences): organize barrel exports with categorized sections"
```

---

### Task 6: Update dashboard/index.ts

**Files:**
- Modify: `apps/frontend/src/features/dashboard/index.ts`

**Current exports:**
- RootDashboard

**Actual files available:**
- Components: RootDashboard.tsx, charts/, kpis/
- Hooks: dashboardHooks.ts
- API: dashboardService.ts
- Utils: utils.tsx

- [ ] **Step 1: Update dashboard/index.ts with categorized sections**

```typescript
// src/features/dashboard/index.ts

// Components
export { RootDashboard } from "./components/RootDashboard";

// Hooks
export { useDashboard } from "./hooks/dashboardHooks";

// Services
export { dashboardService } from "./api/dashboardService";

// Utils
export { utils } from "./utils/utils";
```

- [ ] **Step 2: Commit changes**

```bash
git add apps/frontend/src/features/dashboard/index.ts
git commit -m "feat(dashboard): organize barrel exports with categorized sections"
```

---

### Task 7: Update users/index.ts

**Files:**
- Modify: `apps/frontend/src/features/users/index.ts`

**Current exports:**
- UsersDashboard
- UsersDashboardSkeleton

**Actual files available:**
- Components: users-view-form.tsx, columns.tsx, user-dashboard-skeleton.tsx, user-kpi.tsx, UsersDashboard.tsx, user-data-table.tsx
- Hooks: usersHooks.ts
- API: userService.ts

- [ ] **Step 1: Update users/index.ts with categorized sections**

```typescript
// src/features/users/index.ts

// Components
export { UsersDashboard } from "./components/UsersDashboard";
export { UsersDashboardSkeleton } from "./components/user-dashboard-skeleton";

// Hooks
export { useUsers } from "./hooks/usersHooks";

// Services
export { userService } from "./api/userService";
```

- [ ] **Step 2: Commit changes**

```bash
git add apps/frontend/src/features/users/index.ts
git commit -m "feat(users): organize barrel exports with categorized sections"
```

---

### Task 8: Update createTransaction/index.ts

**Files:**
- Modify: `apps/frontend/src/features/createTransaction/index.ts`

**Current exports:**
- FormContainer
- wizard-modal (from @/components/ui/wizard-modal)
- createMutationHooks
- SmartFormProvider

**Actual files available:**
- Components: FormContainer.tsx, steps/
- Hooks: useCategoriesHook.ts, createMutationHooks.ts
- API: categoriesService.ts, createService.ts
- Providers: SmartFormProvider.tsx

- [ ] **Step 1: Update createTransaction/index.ts with categorized sections**

```typescript
// src/features/createTransaction/index.ts

// Components
export { FormContainer } from "./components/FormContainer";

// Hooks
export { useCategoriesHook } from "./hooks/useCategoriesHook";
export { useCreateMutationHooks } from "./hooks/createMutationHooks";

// Services
export { categoriesService } from "./api/categoriesService";
export { createService } from "./api/createService";

// Providers
export { SmartFormProvider } from "./providers/SmartFormProvider";
```

- [ ] **Step 2: Commit changes**

```bash
git add apps/frontend/src/features/createTransaction/index.ts
git commit -m "feat(createTransaction): organize barrel exports with categorized sections"
```

---

### Task 9: Update updateCardBalance/index.ts

**Files:**
- Modify: `apps/frontend/src/features/updateCardBalance/index.ts`

**Current exports:**
- FormContainerCard
- wizard-modal (from @/components/ui/wizard-modal)
- SmartFormProviderCard

**Actual files available:**
- Components: FormContainerCard.tsx, steps/
- Hooks: updateCardHooks.ts, updateCardMutationHooks.ts
- API: updateCardService.ts
- Providers: SmartFormProviderCard.tsx

- [ ] **Step 1: Update updateCardBalance/index.ts with categorized sections**

```typescript
// src/features/updateCardBalance/index.ts

// Components
export { FormContainerCard } from "./components/FormContainerCard";

// Hooks
export { useUpdateCard } from "./hooks/updateCardHooks";
export { useUpdateCardMutation } from "./hooks/updateCardMutationHooks";

// Services
export { updateCardService } from "./api/updateCardService";

// Providers
export { SmartFormProviderCard } from "./providers/SmartFormProviderCard";
```

- [ ] **Step 2: Commit changes**

```bash
git add apps/frontend/src/features/updateCardBalance/index.ts
git commit -m "feat(updateCardBalance): organize barrel exports with categorized sections"
```

---

### Task 10: Update updateRecurrence/index.ts

**Files:**
- Modify: `apps/frontend/src/features/updateRecurrence/index.ts`

**Current exports:**
- FormContainerRecurrence
- wizard-modal (from @/components/ui/wizard-modal)
- SmartFormProviderRecurrence

**Actual files available:**
- Components: FormContainerRecurrence.tsx, steps/
- Hooks: None
- API: None
- Providers: SmartFormProviderRecurrence.tsx

- [ ] **Step 1: Update updateRecurrence/index.ts with categorized sections**

```typescript
// src/features/updateRecurrence/index.ts

// Components
export { FormContainerRecurrence } from "./components/FormContainerRecurrence";

// Providers
export { SmartFormProviderRecurrence } from "./providers/SmartFormProviderRecurrence";
```

- [ ] **Step 2: Commit changes**

```bash
git add apps/frontend/src/features/updateRecurrence/index.ts
git commit -m "feat(updateRecurrence): organize barrel exports with categorized sections"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-05-update-barrel-exports.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**