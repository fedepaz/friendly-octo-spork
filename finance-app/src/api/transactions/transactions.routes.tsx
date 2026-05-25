// src/api/transactions/transactions.routes.tsx

import { Hono } from "hono";
import { TransactionsController } from "./transactions.controller";
import { zValidator } from "@hono/zod-validator";
import { createTransactionSchema } from "./transactions.schema";
import type z from "zod";
import { Toast } from "@/components/shared/Toast";

const transactionsRoutes = new Hono();
const transactionsController = new TransactionsController();

const validateTransaction = zValidator(
  "form",
  createTransactionSchema,
  (result, c) => {
    if (!result.success) {
      const fieldErrors = (result.error as z.ZodError).flatten().fieldErrors;
      const message = Object.entries(fieldErrors).flatMap(([field, errors]) =>
        (errors as string[]).map((e) => `${field}: ${e}`),
      );
      return c.html(<Toast message={message} type="error" />, 400);
    }
  },
);

transactionsRoutes.get("/", transactionsController.getTransactionsPage);
transactionsRoutes.get("/new", transactionsController.getTransactionForm);
transactionsRoutes.post(
  "/",
  validateTransaction,
  transactionsController.createTransaction,
);

transactionsRoutes.get(
  "/new-recurrence",
  transactionsController.getTransactionNewRecurrenceForm,
);
transactionsRoutes.post(
  "/new-recurrence",
  validateTransaction,
  transactionsController.createTransactionWithNewRecurrence,
);

transactionsRoutes.get(
  "/link-recurrence/:recurrenceId",
  transactionsController.getTransactionLinkRecurrenceForm,
);
transactionsRoutes.post(
  "/link-recurrence/:recurrenceId",
  validateTransaction,
  transactionsController.createTransactionLinkRecurrence,
);

transactionsRoutes.get("/:id", transactionsController.getTransactionById);

export default transactionsRoutes;
