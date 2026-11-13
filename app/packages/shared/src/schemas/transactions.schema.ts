// packages/shared/schemas/transactions.schema.ts

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
  recurrenceName?: string | null;
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
  source: z.string().optional().nullable(),
  metadata: z.unknown().optional().nullable(),

  isBudgetedExpense: z
    .preprocess((val) => val === "on" || val === true, z.boolean())
    .optional()
    .default(false),
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
  budgetCategory: BudgetCategorySchema.optional().nullable(),
  cardType: CardTypeSchema.optional().nullable(),
  frequency: RecurrenceTypeSchema.optional().nullable(),
  totalParts: z.coerce.number().int().optional().nullable(),
  shouldStopRecurrence: z.boolean().optional().default(false),
});

// ─── 2. CREATE SCHEMA (with cross-field validation) ─────────────────────

// Single source of truth for which transaction types need which account
// roles. Used by the superRefine below AND by the wizard's accounts step
// (the superRefine only runs once the base schema parses, which is not
// true mid-wizard — e.g. `description` is filled in a later step).
export const SOURCE_REQUIRED_TRANSACTION_TYPES = [
  "EXPENSE",
  "TRANSFER",
  "INVESTMENT",
  "PAYMENT",
] as const;

export const TARGET_REQUIRED_TRANSACTION_TYPES = [
  "INCOME",
  "TRANSFER",
  "INVESTMENT",
  "RETURN",
] as const;

/** Returns an error message when a transaction type is missing a
 *  required account, or null when the requirements are satisfied. */
export function getAccountRequirementError(data: {
  type?: string | null;
  sourceAccountId?: string | null;
  targetAccountId?: string | null;
}): string | null {
  if (
    data.type &&
    (SOURCE_REQUIRED_TRANSACTION_TYPES as readonly string[]).includes(
      data.type,
    ) &&
    !data.sourceAccountId
  ) {
    return `${data.type} requires a source account`;
  }
  if (
    data.type &&
    (TARGET_REQUIRED_TRANSACTION_TYPES as readonly string[]).includes(
      data.type,
    ) &&
    !data.targetAccountId
  ) {
    return `${data.type} requires a target account`;
  }
  return null;
}

export const createTransactionSchema = createTransactionSchemaBase.superRefine(
  (data, ctx) => {
    // ─── Recurrence validation ───────────────────────────────────────────
    if (data.isRecurrence) {
      if (!data.recurrenceName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Recurrence name is required when creating a recurrence",
          path: ["recurrenceName"],
        });
      }
      if (!data.frequency) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Frequency is required when creating a recurrence",
          path: ["frequency"],
        });
      }
      // INSTALLMENT needs a part count
      if (data.frequency === "INSTALLMENT" && !data.totalParts) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Total parts is required for INSTALLMENT recurrences",
          path: ["totalParts"],
        });
      }
    }

    // ─── Card expense validation ─────────────────────────────────────────
    if (data.isCardExpense && !data.cardType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Card type is required for card expenses",
        path: ["cardType"],
      });
    }

    // ─── Type-dependent account validation ───────────────────────────────
    const requiresSource: string[] = [...SOURCE_REQUIRED_TRANSACTION_TYPES];
    const requiresTarget: string[] = [...TARGET_REQUIRED_TRANSACTION_TYPES];

    if (requiresSource.includes(data.type) && !data.sourceAccountId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${data.type} requires a source account`,
        path: ["sourceAccountId"],
      });
    }
    if (requiresTarget.includes(data.type) && !data.targetAccountId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${data.type} requires a target account`,
        path: ["targetAccountId"],
      });
    }

    // ─── Budgeted Expense Validation ─────────────────────────────────────────
    if (data.isBudgetedExpense) {
      if (data.type !== "EXPENSE") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Budgeted expenses can only be used for expenses",
          path: ["isBudgetedExpense"],
        });
      }
      if (!data.budgetCategory) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Budget category is required for budgeted expenses",
          path: ["budgetCategory"],
        });
      }
    }
  },
);

// ─── 3. UPDATE SCHEMA (partial, no create-specific validation) ──────────
export const updateTransactionSchema = createTransactionSchemaBase.partial();

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
