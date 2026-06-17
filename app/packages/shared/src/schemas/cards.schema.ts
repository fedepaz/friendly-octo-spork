// packages/shared/schemas/cards.schema.ts

import z from "zod";
import { TransactionDTO, transactionSchema } from "./transactions.schema";
import { RecurrenceDTO, recurrenceSchema } from "./recurrences.schema";

// ─── Card Statement DTO ──────────────────────────────────────────────────────
export interface CardStatementDTO {
  transactions: TransactionDTO[];
  pendingRecurrences: RecurrenceDTO[];
}

export const cardStatementSchema: z.ZodType<CardStatementDTO> = z.object({
  transactions: z.array(transactionSchema),
  pendingRecurrences: z.array(recurrenceSchema),
});

export type CardStatementItem = z.infer<typeof cardStatementSchema>;
