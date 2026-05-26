import { z } from "zod";
import {
  CardTypeSchema,
  RecurrenceTypeSchema,
  TransactionTypeSchema,
} from "../enums";

export const recurrenceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: TransactionTypeSchema,
  amount: z.number(),
  frequency: RecurrenceTypeSchema,
  totalParts: z.number().int().nullable(),
  currentPart: z.number().int().nullable(),
  startDate: z.date(),
  nextDate: z.date().nullable(),
  endDate: z.date().nullable(),
  active: z.boolean(),
  categoryId: z.string().optional().nullable(),
  sourceAccountId: z.string().optional().nullable(),
  targetAccountId: z.string().optional().nullable(),
  isCardExpense: z.boolean().optional().nullable(),
  cardType: CardTypeSchema.optional().nullable(),
  metadata: z.any().optional(),
});

export const createRecurrenceSchema = z.object({
  name: z
    .string()
    .min(1, "Recurrence name is required")
    .max(255, "Recurrence name is too long"),
  type: TransactionTypeSchema,
  amount: z.coerce.number().positive("Amount must be a positive number"),
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
export type RecurrenceDTO = z.infer<typeof recurrenceSchema>;
