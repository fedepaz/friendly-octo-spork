// src/constants/routes.ts
export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USERS: "/users",
  ACCOUNTS: "/accounts",
  RECURRENCES: "/recurrences",
  TRANSACTIONS: "/transactions",
  CARDS: "/cards",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
