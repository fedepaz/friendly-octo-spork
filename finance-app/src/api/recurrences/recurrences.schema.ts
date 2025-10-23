// src/schemas/recurrences.schema.ts

import { z } from "zod";
import { RecurrenceType } from "../../generated/prisma";

export const createRecurrenceSchema = z.object({
  name: z
    .string()
    .min(1, "Recurrence name is required")
    .max(255, "Recurrence name is too long"),
  frequency: z.nativeEnum(RecurrenceType, {
    error: () => ({ message: "Invalid recurrence frequency" }),
  }),
  totalParts: z.number().optional().default(1),
  currentPart: z.number().optional().default(1),
  startDate: z.date().optional(),
  nextDate: z.date().optional(),
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
