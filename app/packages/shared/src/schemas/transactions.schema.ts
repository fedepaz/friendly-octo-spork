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
    const requiresSource = [
      "EXPENSE",
      "TRANSFER",
      "INVESTMENT",
      "RETURN",
      "PAYMENT",
    ];
    const requiresTarget = ["INCOME", "TRANSFER", "INVESTMENT", "RETURN"];

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
