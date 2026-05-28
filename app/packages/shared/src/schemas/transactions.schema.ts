import { z } from "zod";
import {
  BudgetCategorySchema,
  CardTypeSchema,
  RecurrenceTypeSchema,
  TransactionTypeSchema,
} from "../enums";
import { categorySchema } from "./categories.schema";
import { accountSchema } from "./accounts.schema";
import { recurrenceSchema } from "./recurrences.schema";

export const transactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: TransactionTypeSchema,
  amount: z.number().positive(),
  date: z.date(),
  description: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  sourceAccountId: z.string().optional().nullable(),
  targetAccountId: z.string().optional().nullable(),
  recurrenceId: z.string().optional().nullable(),
  recurrencePartNumber: z.number().int().nullable(),
  isBudgetedExpense: z.boolean().nullable(),
  budgetCategory: BudgetCategorySchema.nullable(),
  isCardExpense: z.boolean().nullable(),
  cardType: CardTypeSchema.nullable(),
  source: z.string().optional().nullable(),
  metadata: z.unknown().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),

  category: categorySchema.nullable(),
  sourceAccount: accountSchema.nullable(),
  targetAccount: accountSchema.nullable(),
  recurrence: recurrenceSchema.nullable(),
});

export const createTransactionSchema = z.object({
  type: TransactionTypeSchema,
  amount: z.coerce.number().positive("Amount must be a positive number"),
  date: z.coerce.date(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(255, "Description is too long"),
  categoryId: z
    .preprocess((val) => (val === "" ? null : val), z.string().nullable())
    .optional(),
  sourceAccountId: z
    .preprocess((val) => (val === "" ? null : val), z.string().nullable())
    .optional(),
  targetAccountId: z
    .preprocess((val) => (val === "" ? null : val), z.string().nullable())
    .optional(),
  recurrenceId: z
    .preprocess((val) => (val === "" ? null : val), z.string().nullable())
    .optional(),
  metadata: z.unknown().optional().nullable(),

  isRecurrence: z
    .preprocess((val) => val === "on" || val === true, z.boolean())
    .optional()
    .default(false),
  frequency: RecurrenceTypeSchema.optional(),
  totalParts: z.coerce.number().int().optional(),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type TransactionDTO = z.infer<typeof transactionSchema>;
