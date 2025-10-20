// src/api/accounts/accounts.routes.ts
import { Hono } from "hono";
import { AccountsController } from "./accounts.controller";

const accountsRoutes = new Hono();
const controller = new AccountsController();

// Page route
accountsRoutes.get("/", controller.getAccountsPage);

// API routes
accountsRoutes.get("/api/accounts", controller.listAccounts);
accountsRoutes.post("/api/accounts", ...controller.createAccount);
accountsRoutes.get("/api/accounts/:id", controller.getAccount);
accountsRoutes.put("/api/accounts/:id", ...controller.updateAccount);
accountsRoutes.delete("/api/accounts/:id", controller.deleteAccount);

export default accountsRoutes;
