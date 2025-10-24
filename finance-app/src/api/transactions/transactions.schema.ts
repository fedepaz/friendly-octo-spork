// src/schemas/transactions.schema.ts

import { z } from "zod";
import {
  AccountType,
  CategoryType,
  Currency,
  TransactionType,
} from "../../generated/prisma";

export const transactionSchema = z.object({
  id: z.number(),
  userId: z.string(),
  type: z.nativeEnum(TransactionType),
  amount: z.number(),
  date: z.date(),
  description: z.string().optional(),
  categoryId: z.number().optional(),
  sourceAccountId: z.number().optional(),
  targetAccountId: z.number().optional(),
  recurrenceId: z.number().optional(),
  metadata: z.object().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
