// src/api/accounts/accounts.routes.ts

import { Hono, type Context } from "hono";
import { AccountsController } from "./accounts.controller";
import { zValidator } from "@hono/zod-validator";
import { createAccountSchema } from "./accounts.schema";

const accountsRoutes = new Hono();

const accountController = new AccountsController();

accountsRoutes.get("/", accountController.getAccountsPage);
accountsRoutes.get("/new", accountController.getAccountForm);
accountsRoutes.post(
  "/",
  zValidator("form", createAccountSchema),
  accountController.createAccount,
);
accountsRoutes.get("/:id", accountController.getAccountById);

export default accountsRoutes;
