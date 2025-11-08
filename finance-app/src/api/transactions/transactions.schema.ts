// src/schemas/transactions.schema.ts

import { z } from "zod";
import {
  TransactionType,
  AccountType,
  Currency,
  CategoryType,
  RecurrenceType,
} from "@/generated/prisma";

// ========== NESTED OBJECT SCHEMAS ==========

// Category DTO
export const categoryResponseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  type: z.nativeEnum(CategoryType),
  color: z.string().nullable(),
});

// Account DTO
export const accountResponseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  type: z.nativeEnum(AccountType),
  currency: z.nativeEnum(Currency),
  balance: z.number(), // Converted from Decimal
});

// Recurrence DTO
export const recurrenceResponseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  frequency: z.nativeEnum(RecurrenceType),
  totalParts: z.number().int().nullable(),
  currentPart: z.number().int().nullable(),
  startDate: z.date(),
  nextDate: z.date().nullable(),
  active: z.boolean(),
});

// ========== MAIN TRANSACTION RESPONSE SCHEMA ==========

export const transactionResponseSchema = z.object({
  id: z.number().int(),
  type: z.nativeEnum(TransactionType),
  amount: z.number().positive(),
  date: z.date(),
  description: z.string().nullable(),
  metadata: z.object({}).catchall(z.unknown()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Full nested objects (not just IDs)
  category: categoryResponseSchema.nullable(),
  sourceAccount: accountResponseSchema.nullable(),
  targetAccount: accountResponseSchema.nullable(),
  recurrence: recurrenceResponseSchema.nullable(),
});

export type TransactionResponse = z.infer<typeof transactionResponseSchema>;
export type CategoryResponse = z.infer<typeof categoryResponseSchema>;
export type AccountResponse = z.infer<typeof accountResponseSchema>;
export type RecurrenceResponse = z.infer<typeof recurrenceResponseSchema>;

// ========== CREATE SCHEMAS (keep existing) ==========

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
