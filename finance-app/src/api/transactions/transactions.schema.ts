// src/api/transactions/transactions.schema.ts
import { z } from "zod";
import { TransactionType } from "../../generated/prisma";

export const createTransactionSchema = z.object({
  type: z.nativeEnum(TransactionType),
  amount: z.number().positive("Amount must be positive"),
  date: z.string().datetime("Invalid date format"),
  description: z.string().min(1, "Description is required").max(255),
  categoryId: z.number().int().optional(),
  sourceAccountId: z.number().int().optional(),
  targetAccountId: z.number().int().optional(),
  recurrenceId: z.number().int().optional(),
  metadata: z.any().optional(), // For additional flexible data
});

export const updateTransactionSchema = createTransactionSchema.partial();

export const transactionFilterSchema = z.object({
  startDate: z.string().datetime("Invalid start date format").optional(),
  endDate: z.string().datetime("Invalid end date format").optional(),
  type: z.nativeEnum(TransactionType).optional(),
  categoryId: z.number().int().optional(),
  sourceAccountId: z.number().int().optional(),
  targetAccountId: z.number().int().optional(),
  recurrenceId: z.number().int().optional(),
  limit: z.string().transform(Number).optional(),
  offset: z.string().transform(Number).optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type TransactionFilter = z.infer<typeof transactionFilterSchema>;