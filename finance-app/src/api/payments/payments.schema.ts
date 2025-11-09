// src/schemas/payments.schema.ts

import { z } from "zod";
import { createTransactionSchema } from "../transactions/transactions.schema";

export const createPaymentSchema = createTransactionSchema
  .extend({
    type: z.literal("PAYMENT"),
    sourceAccountId: z.coerce.number().int().optional(),
    categoryId: z.coerce.number().int().optional(),
  })
  .omit({ targetAccountId: true });

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
