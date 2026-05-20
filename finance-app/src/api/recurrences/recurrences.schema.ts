// src/schemas/recurrences.schema.ts

import { z } from "zod";
import { RecurrenceType, TransactionType } from "../../generated/prisma";

export const recurrenceSchema = z.object({
  id: z.number(),
  userId: z.string(),
  name: z.string(),
  type: z.nativeEnum(TransactionType),
  amount: z.number(),
  frequency: z.nativeEnum(RecurrenceType),
  totalParts: z.number().int().nullable(),
  currentPart: z.number().int().nullable(),
  startDate: z.date(),
  nextDate: z.date().nullable(),
  active: z.boolean(),
});

export const createRecurrenceSchema = z.object({
  name: z
    .string()
    .min(1, "Recurrence name is required")
    .max(255, "Recurrence name is too long"),
  type: z.nativeEnum(TransactionType, {
    error: () => ({ message: "Invalid recurrence type" }),
  }),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  frequency: z.nativeEnum(RecurrenceType, {
    error: () => ({ message: "Invalid recurrence frequency" }),
  }),
  totalParts: z.number().optional().default(1),
  currentPart: z.number().optional().default(1),
  startDate: z.coerce.date(),
  active: z.boolean().optional().default(true),
});

export const updateRecurrenceSchema = createRecurrenceSchema.partial();

export const recurrenceFilterSchema = z.object({
  frequency: z
    .nativeEnum(RecurrenceType, {
      error: () => ({ message: "Invalid recurrence frequency" }),
    })
    .optional(),
  active: z.boolean().optional().default(true),
});

export type CreateRecurrenceInput = z.infer<typeof createRecurrenceSchema>;
export type UpdateRecurrenceInput = z.infer<typeof updateRecurrenceSchema>;
export type RecurrenceFilterInput = z.infer<typeof recurrenceFilterSchema>;

export enum RecurrenceFrequency {
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  YEARLY = "YEARLY",
  INSTALLMENT = "INSTALLMENT",
}
