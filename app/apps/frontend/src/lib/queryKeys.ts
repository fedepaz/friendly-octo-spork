// src/lib/queryKeys.ts
// Centralized query key factories — single source of truth for all cache keys.

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authQueryKeys = {
  all: () => ["auth"] as const,
  profile: () => [...authQueryKeys.all(), "profile"] as const,
};

export const permissionsQueryKeys = {
  all: () => ["permissions"] as const,
  me: () => [...permissionsQueryKeys.all(), "me"] as const,
};

// ─── Transactions ────────────────────────────────────────────────────────────
export const transactionProfileQueryKeys = {
  all: () => ["transactions"] as const,
  byId: (id: string) =>
    [...transactionProfileQueryKeys.all(), "byId", id] as const,
  byMonth: (month: number, year: number) =>
    [...transactionProfileQueryKeys.all(), "byMonth", month, year] as const,
};

// ─── Accounts ────────────────────────────────────────────────────────────────
export const accountProfileQueryKeys = {
  all: () => ["accounts"] as const,
  byId: (id: string) =>
    [...accountProfileQueryKeys.all(), "byId", id] as const,
};

// ─── Cards ───────────────────────────────────────────────────────────────────
export const cardProfileQueryKeys = {
  all: () => ["cards"] as const,
  byId: (id: string) => [...cardProfileQueryKeys.all(), id] as const,
  byMonth: (year: number, month: number) =>
    [...cardProfileQueryKeys.all(), year, month] as const,
};

// ─── Recurrences ─────────────────────────────────────────────────────────────
import type { TransactionType } from "@repo/shared";

export const recurrenceProfileQueryKeys = {
  all: () => ["recurrences"] as const,
  byId: (id: string) =>
    [...recurrenceProfileQueryKeys.all(), "byId", id] as const,
  byMonth: (month: number, year: number, type: TransactionType) =>
    [
      ...recurrenceProfileQueryKeys.all(),
      "byMonth",
      month,
      year,
      type,
    ] as const,
};

// ─── Users ───────────────────────────────────────────────────────────────────
export const userProfileQueryKeys = {
  all: () => ["users"] as const,
  byId: (id: string) =>
    [...userProfileQueryKeys.all(), "byId", id] as const,
  byUserName: (username: string) =>
    [...userProfileQueryKeys.all(), "byUserName", username] as const,
  byTenantId: (tenantId: string) =>
    [...userProfileQueryKeys.all(), "byTenantId", tenantId] as const,
  admin: () => ["users", "allAdmin"] as const,
};

// ─── Dashboard ───────────────────────────────────────────────────────────────
export const dashboardQueryKeys = {
  all: () => ["dashboard"] as const,
  budgetSummary: () => [...dashboardQueryKeys.all(), "budget"] as const,
  recentAccounts: () =>
    [...dashboardQueryKeys.all(), "recentAccounts"] as const,
  incomeExpense: (months: number) =>
    [...dashboardQueryKeys.all(), "incomeExpense", months] as const,
  recurrencesToPay: () => [...dashboardQueryKeys.all(), "toPay"] as const,
};

// ─── Categories ──────────────────────────────────────────────────────────────
export const categoryProfileQueryKeys = {
  all: () => ["categories"] as const,
  byId: (id: string) =>
    [...categoryProfileQueryKeys.all(), "byId", id] as const,
};

// ─── Admin Permissions ─────────────────────────────────────────────────────
export const adminPermissionsQueryKeys = {
  all: ["adminPermissions"] as const,
  tables: () => [...adminPermissionsQueryKeys.all, "tables"] as const,
  tableByName: (name: string) =>
    [...adminPermissionsQueryKeys.tables(), name] as const,
  byUserId: (userId: string) =>
    [...adminPermissionsQueryKeys.all, "user", userId] as const,
  byEntityId: (entityId: string) =>
    [...adminPermissionsQueryKeys.all, "entity", entityId] as const,
};

// ─── Audit Log ─────────────────────────────────────────────────────────────
export const auditLogQueryKeys = {
  all: () => ["auditLog"] as const,
};

// ─── Update Card Balance ─────────────────────────────────────────────────────
export const updateCardProfileQueryKeys = {
  all: () => ["updateCard"] as const,
  close: () => [...updateCardProfileQueryKeys.all(), "close"] as const,
  closeByMonth: (year: number, month: number) =>
    [...updateCardProfileQueryKeys.all(), "close", year, month] as const,
};

// ─── Investments ──────────────────────────────────────────────────────────
export const investmentQueryKeys = {
  all: () => ["investments"] as const,
};
