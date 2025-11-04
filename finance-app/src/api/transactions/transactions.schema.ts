// src/schemas/transactions.schema.ts

import { z } from "zod";
import { TransactionType } from "../../generated/prisma";

// Schema for creating a transaction (from form)
export const createTransactionSchema = z.object({
  type: z.nativeEnum(TransactionType),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  date: z.coerce.date(),
  description: z.string().min(1, "Description is required"),
  categoryId: z.coerce.number().int().optional().nullable(),
  sourceAccountId: z.coerce.number().int().optional().nullable(),
  targetAccountId: z.coerce.number().int().optional().nullable(),
  recurrenceId: z.coerce.number().int().optional().nullable(),
  metadata: z.object({}).catchall(z.unknown()).optional().nullable(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

// Validation rules based on the transaction type
export const validateTransactionType = (data: CreateTransactionInput) => {
  const errors: Record<string, string> = {};
  switch (data.type) {
    case "EXPENSE":
    case "PAYMENT":
      if (!data.sourceAccountId) {
        errors.sourceAccountId =
          "Source account is required for expenses/payments";
      }
      if (!data.categoryId) {
        errors.categoryId = "Category is required for expenses/payments";
      }
      break;

    case "INCOME":
      if (!data.targetAccountId) {
        errors.targetAccountId = "Target account is required for income";
      }
      if (!data.categoryId) {
        errors.categoryId = "Category is required for income";
      }
      break;

    case "TRANSFER":
      if (!data.sourceAccountId || !data.targetAccountId) {
        errors.accountId =
          "Both source and target accounts are required for transfers";
      }
      if (data.sourceAccountId === data.targetAccountId) {
        errors.accountId = "Source and target accounts must be different";
      }
      break;

    case "INVESTMENT":
    case "RETURN":
      if (!data.sourceAccountId) {
        errors.sourceAccountId = "Source account is required";
      }
      break;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};
