// src/schemas/investments.schema.ts

import { z } from "zod";
import { createTransactionSchema } from "../transactions/transactions.schema";

export const createInvestmentSchema = createTransactionSchema
  .extend({
    type: z.literal("INVESTMENT"),
    sourceAccountId: z.coerce.number().int().optional(),
    categoryId: z.coerce.number().int().optional(),
  })
  .omit({ targetAccountId: true });

export type CreateInvestmentInput = z.infer<typeof createInvestmentSchema>;
