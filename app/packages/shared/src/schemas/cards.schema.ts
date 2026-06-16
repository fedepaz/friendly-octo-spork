// packages/shared/schemas/cards.schema.ts

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

export interface CardDTO {
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

export const cardSchema: z.ZodType<CardDTO> = z.object({
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
}) as z.ZodType<CardDTO>;
