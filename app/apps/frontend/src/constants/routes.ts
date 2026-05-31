// src/constants/routes.ts
export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  USERS: "/users",
  ACCOUNTS: "/accounts",
  RECURRENCES: "/recurrences",
  TRANSACTIONS: "/transactions",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
