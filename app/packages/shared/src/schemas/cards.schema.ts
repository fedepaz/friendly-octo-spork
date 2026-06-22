// packages/shared/schemas/cards.schema.ts

import z from "zod";
import {
  CreateTransactionInput,
  createTransactionSchema,
  TransactionDTO,
  transactionSchema,
} from "./transactions.schema";
import { RecurrenceDTO, recurrenceSchema } from "./recurrences.schema";

// ─── Card Statement DTO ──────────────────────────────────────────────────────
export interface CardStatementDTO {
  recurrences: RecurrenceDTO[];
  oneTimers: TransactionDTO[];
  payments: TransactionDTO[];
  summary: CardStatementSummaryDTO;
}

export interface CardStatementSummaryDTO {
  totalRecurrences: string;
  totalOneTimers: string;
  totalPayments: string;
  balance: string;
}

export const cardStatementSchema: z.ZodType<CardStatementDTO> = z.object({
  recurrences: z.array(recurrenceSchema),
  oneTimers: z.array(transactionSchema),
  payments: z.array(transactionSchema),
  summary: z.object({
    totalRecurrences: z.string(),
    totalOneTimers: z.string(),
    totalPayments: z.string(),
    balance: z.string(),
  }),
});

export type CardStatementItem = z.infer<typeof cardStatementSchema>;

// ─── Card Close input DTO ──────────────────────────────────────────────────────
export interface CardCloseInputDTO {
  cardAccountId: string;
  year: number;
  month: number;
  recurencesTransactions: CreateTransactionInput[];
}

export const cardCloseSchema: z.ZodType<CardCloseInputDTO> = z.object({
  cardAccountId: z.string(),
  year: z.number(),
  month: z.number(),
  recurencesTransactions: z.array(z.any()) as z.ZodType<
    CreateTransactionInput[]
  >,
});
