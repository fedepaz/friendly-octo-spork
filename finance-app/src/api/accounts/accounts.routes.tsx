// src/api/accounts/accounts.routes.ts

import { Hono, type Context } from "hono";
import { AccountsController } from "./accounts.controller";
import { zValidator } from "@hono/zod-validator";
import { createAccountSchema } from "./accounts.schema";
import type z from "zod";
import { Toast } from "@/components/shared/Toast";

const accountsRoutes = new Hono();

const accountController = new AccountsController();

accountsRoutes.get("/", accountController.getAccountsPage);
accountsRoutes.get("/new", accountController.getAccountForm);
accountsRoutes.post(
  "/",
  zValidator("form", createAccountSchema, (result, c) => {
    if (!result.success) {
      const err = result.error as z.ZodError;
      const fieldErrors = err.flatten().fieldErrors;

      const message = Object.entries(fieldErrors).flatMap(([field, errors]) =>
        (errors as string[]).map((e) => `${field}: ${e}`),
      );

      return c.html(<Toast message={message} type="error" />, 400);
    }
  }),
  accountController.createAccount,
);
accountsRoutes.get("/:id", accountController.getAccountById);

export default accountsRoutes;
