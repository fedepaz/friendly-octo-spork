import { Hono } from "hono";
import { AccountsController } from "./accounts.controller";
import { zValidator } from "@hono/zod-validator";
import { createAccountSchema } from "./accounts.schema";

const accountsRoutes = new Hono();

const accountController = new AccountsController();

accountsRoutes.get("/", accountController.getLoginPage);
accountsRoutes.post(
  "/",
  zValidator("json", createAccountSchema),
  accountController.getCreatePage
);

export default accountsRoutes;
