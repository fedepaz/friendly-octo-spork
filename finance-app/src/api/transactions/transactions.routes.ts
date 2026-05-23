// src/api/transactions/transactions.routes.ts

import { Hono } from "hono";
import { TransactionsController } from "./transactions.controller";
import { zValidator } from "@hono/zod-validator";
import { createTransactionSchema } from "./transactions.schema";
import type z from "zod";

const transactionsRoutes = new Hono();
const transactionsController = new TransactionsController();

transactionsRoutes.get("/", transactionsController.getTransactionsData);
transactionsRoutes.post(
  "/",
  zValidator("form", createTransactionSchema, (result, c) => {
    if (!result.success) {
      const err = result.error as z.ZodError;
      console.error("Validation failed:", err.flatten());
      return c.json({ error: err.flatten() }, 400);
    }
  }),
  transactionsController.createTransaction,
);

export default transactionsRoutes;
