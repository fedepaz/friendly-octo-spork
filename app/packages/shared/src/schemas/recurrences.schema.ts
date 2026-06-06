import { z } from "zod";
import {
  CardType,
  CardTypeSchema,
  RecurrenceType,
  RecurrenceTypeSchema,
  TransactionType,
  TransactionTypeSchema,
} from "../enums";
import type { CategoryDTO } from "./categories.schema";
import { categorySchema } from "./categories.schema";
import type { AccountDTO } from "./accounts.schema";
import { TransactionDTO, transactionSchema } from "./transactions.schema";

export interface RecurrenceDTO {
  id: string;
  userId: string;
  name: string;
  type: TransactionType;
  amount: string;
  frequency: RecurrenceType;
  totalParts: number | null;
  currentPart: number | null;
  startDate: Date;
  nextDate: Date | null;
  endDate: Date | null;
  active: boolean;
  categoryId?: string | null;
  sourceAccountId?: string | null;
  targetAccountId?: string | null;
  isCardExpense?: boolean | null;
  cardType?: CardType | null;
  metadata?: unknown | null;

  category?: CategoryDTO | null;
  sourceAccount?: AccountDTO | null;
  targetAccount?: AccountDTO | null;
}

export const recurrenceSchema: z.ZodType<RecurrenceDTO> = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: TransactionTypeSchema,
  amount: z.string(),
  frequency: RecurrenceTypeSchema,
  totalParts: z.number().int().nullable().optional(),
  currentPart: z.number().int().nullable().optional(),
  startDate: z.date(),
  nextDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  active: z.boolean(),
  categoryId: z.string().nullable().optional(),
  sourceAccountId: z.string().nullable().optional(),
  targetAccountId: z.string().nullable().optional(),
  isCardExpense: z.boolean().nullable().optional(),
  cardType: CardTypeSchema.nullable().optional(),
  metadata: z.unknown().nullable().optional(),

  category: z.lazy(() => categorySchema.nullable().optional()),
  sourceAccount: z.lazy(() => z.any().nullable().optional()),
  targetAccount: z.lazy(() => z.any().nullable().optional()),
}) as z.ZodType<RecurrenceDTO>;

export const createRecurrenceSchema = z.object({
  name: z
    .string()
    .min(1, "Recurrence name is required")
    .max(255, "Recurrence name is too long"),
  type: TransactionTypeSchema,
  amount: z
    .preprocess((val) => String(val), z.string())
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Amount must be a positive number",
    ),
  frequency: RecurrenceTypeSchema,
  totalParts: z.number().optional().default(1),
  currentPart: z.number().optional().default(1),
  startDate: z.coerce.date(),
  active: z.boolean().optional().default(true),
  categoryId: z.string().optional(),
  sourceAccountId: z.string().optional(),
  targetAccountId: z.string().optional(),
  isCardExpense: z.boolean().optional(),
  cardType: CardTypeSchema.optional(),
});

export const updateRecurrenceSchema = createRecurrenceSchema.partial();

export const recurrenceFilterSchema = z.object({
  frequency: RecurrenceTypeSchema.optional(),
  active: z.boolean().optional().default(true),
});

export type CreateRecurrenceInput = z.infer<typeof createRecurrenceSchema>;
export type UpdateRecurrenceInput = z.infer<typeof updateRecurrenceSchema>;
export type RecurrenceFilterInput = z.infer<typeof recurrenceFilterSchema>;

// ─── Timeline DTO ────────────────────────────────────────────────────────────
export interface RecurrenceTimelineDTO extends RecurrenceDTO {
  paidThisMonth: boolean;
  lastPaidAt: Date | null;
  projectedDates: Date[];
  transactions: TransactionDTO[]; // the last 3
}

export const recurrenceTimelineSchema: z.ZodType<RecurrenceTimelineDTO> =
  z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    type: TransactionTypeSchema,
    amount: z.string(),
    frequency: RecurrenceTypeSchema,
    totalParts: z.number().int().nullable().optional(),
    currentPart: z.number().int().nullable().optional(),
    startDate: z.date(),
    nextDate: z.date().nullable().optional(),
    endDate: z.date().nullable().optional(),
    active: z.boolean(),
    categoryId: z.string().nullable().optional(),
    sourceAccountId: z.string().nullable().optional(),
    targetAccountId: z.string().nullable().optional(),
    isCardExpense: z.boolean().nullable().optional(),
    cardType: CardTypeSchema.nullable().optional(),
    metadata: z.unknown().nullable().optional(),

    category: z.lazy(() => categorySchema.nullable().optional()),
    sourceAccount: z.lazy(() => z.any().nullable().optional()),
    targetAccount: z.lazy(() => z.any().nullable().optional()),
    paidThisMonth: z.boolean(),
    lastPaidAt: z.date().nullable().optional(),
    projectedDates: z.array(z.date()).nullable().optional(),
    transactions: z
      .array(z.lazy(() => transactionSchema))
      .nullable()
      .optional(),
  }) as z.ZodType<RecurrenceTimelineDTO>;
