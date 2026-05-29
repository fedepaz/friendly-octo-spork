// src/constants/routes.ts
export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  USERS: "/users",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
