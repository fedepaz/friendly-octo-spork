// src/schemas/expenses.schema.ts

import { z } from "zod";
import { createTransactionSchema } from "../transactions/transactions.schema";

export const createExpenseSchema = createTransactionSchema
  .extend({
    type: z.literal("EXPENSE"),
    sourceAccountId: z.coerce.number().int().optional(),
    categoryId: z.coerce.number().int().optional(),
  })
  .omit({ targetAccountId: true });

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
