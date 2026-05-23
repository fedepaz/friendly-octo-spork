// src/schemas/transactions.schema.ts

import { z } from "zod";
import { TransactionType, RecurrenceType } from "@/generated/prisma";
import { categorySchema } from "../categories/categories.schema";
import { accountSchema } from "../accounts/accounts.schema";
import { recurrenceSchema } from "../recurrences/recurrences.schema";

// ========== NESTED OBJECT SCHEMAS ==========

// ========== MAIN TRANSACTION RESPONSE SCHEMA ==========

export const transactionSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(TransactionType),
  amount: z.number().positive(),
  date: z.date(),
  description: z.string().nullable(),
  metadata: z.object({}).catchall(z.unknown()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Full nested objects (not just IDs)
  category: categorySchema.nullable(),
  sourceAccount: accountSchema.nullable(),
  targetAccount: accountSchema.nullable(),
  recurrence: recurrenceSchema.nullable(),
});

// ========== CREATE SCHEMAS (keep existing) ==========

export const createTransactionSchema = z.object({
  type: z.nativeEnum(TransactionType),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  date: z.coerce.date(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(255, "Description is too long"),
  categoryId: z.string().optional().nullable(),
  sourceAccountId: z.string().optional().nullable(),
  targetAccountId: z.string().optional().nullable(),
  recurrenceId: z.string().optional().nullable(),
  metadata: z.object({}).catchall(z.unknown()).optional().nullable(),

  // Automatic recurrence creation fields
  isRecurrence: z
    .preprocess((val) => val === "on" || val === true, z.boolean())
    .optional(),
  frequency: z.nativeEnum(RecurrenceType).optional(),
  totalParts: z.coerce.number().int().optional(),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type TransactionDTO = z.infer<typeof transactionSchema>;

// Validation rules based on the transaction type (keep existing)
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
