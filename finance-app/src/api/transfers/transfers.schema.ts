// src/schemas/transfers.schema.ts

import { z } from "zod";
import { createTransactionSchema } from "../transactions/transactions.schema";

export const createTransferSchema = createTransactionSchema
  .extend({
    type: z.literal("TRANSFER"),
    sourceAccountId: z.coerce.number().int().optional(),
    targetAccountId: z.coerce.number().int().optional(),
  })
  .omit({ categoryId: true });

export type CreateTransferInput = z.infer<typeof createTransferSchema>;
