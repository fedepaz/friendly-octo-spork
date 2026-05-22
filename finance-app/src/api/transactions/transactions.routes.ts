// src/api/transactions/transactions.routes.ts

import { Hono } from "hono";
import { TransactionsController } from "./transactions.controller";
import { zValidator } from "@hono/zod-validator";
import { createTransactionSchema } from "./transactions.schema";

const transactionsRoutes = new Hono();
const transactionsController = new TransactionsController();

transactionsRoutes.get("/", transactionsController.getTransactionsData);
transactionsRoutes.post(
  "/",
  zValidator("form", createTransactionSchema, (result, c) => {
    if (!result.success) {
      console.error("Validation failed:", result.error.flatten());
      return c.json({ error: result.error.flatten() }, 400);
    }
  }),
  transactionsController.createTransaction,
);

export default transactionsRoutes;
