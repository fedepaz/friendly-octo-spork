import { z } from "zod";
import {
  BudgetCategory,
  BudgetCategorySchema,
  CardType,
  CardTypeSchema,
  RecurrenceTypeSchema,
  TransactionType,
  TransactionTypeSchema,
} from "../enums";
import type { CategoryDTO } from "./categories.schema";
import { categorySchema } from "./categories.schema";
import type { AccountDTO } from "./accounts.schema";
import type { RecurrenceDTO } from "./recurrences.schema";

export interface TransactionDTO {
  id: string;
  userId: string;
  type: TransactionType;
  amount: string;
  date: Date;
  description?: string | null;
  categoryId?: string | null;
  sourceAccountId?: string | null;
  targetAccountId?: string | null;
  recurrenceId?: string | null;
  recurrencePartNumber?: number | null;
  isBudgetedExpense?: boolean | null;
  budgetCategory?: BudgetCategory | null;
  isCardExpense?: boolean | null;
  cardType?: CardType | null;
  source?: string | null;
  metadata?: unknown | null;
  createdAt: Date;
  updatedAt: Date;

  category?: CategoryDTO | null;
  sourceAccount?: AccountDTO | null;
  targetAccount?: AccountDTO | null;
  recurrence?: RecurrenceDTO | null;
}

export const transactionSchema: z.ZodType<TransactionDTO> = z.object({
  id: z.string(),
  userId: z.string(),
  type: TransactionTypeSchema,
  amount: z.string(),
  date: z.date(),
  description: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  sourceAccountId: z.string().optional().nullable(),
  targetAccountId: z.string().optional().nullable(),
  recurrenceId: z.string().optional().nullable(),
  recurrenceName: z.string().optional().nullable(),
  recurrencePartNumber: z.number().int().nullable(),
  isBudgetedExpense: z.boolean().nullable(),
  budgetCategory: BudgetCategorySchema.nullable(),
  isCardExpense: z.boolean().nullable(),
  cardType: CardTypeSchema.nullable(),
  source: z.string().optional().nullable(),
  metadata: z.unknown().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),

  category: z.lazy(() => categorySchema.nullable()),
  sourceAccount: z.lazy(() => z.any().nullable()),
  targetAccount: z.lazy(() => z.any().nullable()),
  recurrence: z.lazy(() => z.any().nullable()),
}) as z.ZodType<TransactionDTO>;

// ─── 1. BASE SCHEMA (raw ZodObject) ─────────────────────────────────────
const createTransactionSchemaBase = z.object({
  type: TransactionTypeSchema,
  amount: z
    .preprocess((val) => String(val), z.string())
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Amount must be a positive number",
    ),
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
  recurrenceName: z
    .preprocess((val) => (val === "" ? null : val), z.string().nullable())
    .optional(),
  metadata: z.unknown().optional().nullable(),

  isRecurrence: z
    .preprocess((val) => val === "on" || val === true, z.boolean())
    .optional()
    .default(false),
  isFirstPayment: z
    .preprocess((val) => val === "on" || val === true, z.boolean())
    .optional()
    .default(false),
  isCardExpense: z
    .preprocess((val) => val === "on" || val === true, z.boolean())
    .default(false),
  cardType: CardTypeSchema.nullable(),
  frequency: RecurrenceTypeSchema.optional(),
  totalParts: z.coerce.number().int().optional(),
});

// ─── 2. CREATE SCHEMA (with cross-field validation) ─────────────────────
export const createTransactionSchema = createTransactionSchemaBase.superRefine(
  (data, ctx) => {
    if (
      data.isRecurrence &&
      (!data.recurrenceName || !data.recurrenceName.trim())
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recurrence name is required",
        path: ["recurrenceName"],
      });
    }
    // Add more cross-field rules here if needed
  },
);

// ─── 3. UPDATE SCHEMA (partial, no create-specific validation) ──────────
export const updateTransactionSchema = createTransactionSchemaBase.partial();

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
