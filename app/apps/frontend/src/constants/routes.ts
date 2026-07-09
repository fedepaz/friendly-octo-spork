// src/constants/routes.ts
export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USERS: "/users",
  USER_PERMISSIONS: "/user-permissions",
  ACCOUNTS: "/accounts",
  RECURRENCES: "/recurrences",
  TRANSACTIONS: "/transactions",
  CARDS: "/cards",
  AUDIT_LOGS: "/audit-logs",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
