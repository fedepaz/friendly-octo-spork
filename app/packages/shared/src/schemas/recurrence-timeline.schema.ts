// packages/shared/src/schemas/recurrence-timeline.schema.ts

import { z } from "zod";
import {
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
import { recurrenceSchema } from "./recurrences.schema";
import type { TransactionDTO } from "./transactions.schema";
import { transactionSchema } from "./transactions.schema";

export interface RecurrenceTimelineDTO extends RecurrenceDTO {
  paidThisMonth: boolean;
  lastPaidAt: Date | null;
  projectedDates: Date[];
  transactions: TransactionDTO[];
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
