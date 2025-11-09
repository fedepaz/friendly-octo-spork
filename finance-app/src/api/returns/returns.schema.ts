// src/schemas/returns.schema.ts

import { z } from "zod";
import { createTransactionSchema } from "../transactions/transactions.schema";

export const createReturnSchema = createTransactionSchema
  .extend({
    type: z.literal("RETURN"),
    sourceAccountId: z.coerce.number().int().optional(),
    categoryId: z.coerce.number().int().optional(),
  })
  .omit({ targetAccountId: true });

export type CreateReturnInput = z.infer<typeof createReturnSchema>;
