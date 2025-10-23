// src/api/accounts/accounts.routes.ts

import { Hono } from "hono";
import { AccountsController } from "./accounts.controller";
import { zValidator } from "@hono/zod-validator";
import { createAccountSchema } from "./accounts.schema";

const accountsRoutes = new Hono();

const accountController = new AccountsController();

accountsRoutes.get("/", accountController.getAccountsPage);
accountsRoutes.get("/new", accountController.getAccountForm);
accountsRoutes.post(
  "/",
  zValidator("json", createAccountSchema),
  accountController.createAccount
);

export default accountsRoutes;
