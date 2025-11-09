// src/schemas/incomes.schema.ts

import { z } from "zod";
import { createTransactionSchema } from "../transactions/transactions.schema";

export const createIncomeSchema = createTransactionSchema
  .extend({
    type: z.literal("INCOME"),
    sourceAccountId: z.coerce.number().int().optional(),
    categoryId: z.coerce.number().int().optional(),
  })
  .omit({ targetAccountId: true });

export type CreateIncomeInput = z.infer<typeof createIncomeSchema>;
