// src/api/recurrences/recurrences.schema.ts
import { z } from "zod";
import { RecurrenceType } from "../../generated/prisma";

export const createRecurrenceSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  frequency: z.nativeEnum(RecurrenceType),
  totalParts: z.number().int().optional(),
  currentPart: z.number().int().optional(),
  startDate: z.string().datetime(),
  nextDate: z.string().datetime().optional(),
  active: z.boolean().optional().default(true),
});

export const updateRecurrenceSchema = createRecurrenceSchema.partial();

export const recurrenceFilterSchema = z.object({
  active: z.boolean().optional(),
  frequency: z.nativeEnum(RecurrenceType).optional(),
});

export type CreateRecurrenceInput = z.infer<typeof createRecurrenceSchema>;
export type UpdateRecurrenceInput = z.infer<typeof updateRecurrenceSchema>;
export type RecurrenceFilter = z.infer<typeof recurrenceFilterSchema>;