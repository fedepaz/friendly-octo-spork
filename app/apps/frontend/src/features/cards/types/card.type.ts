// src/features/cards/types/card.type.ts

import { RecurrenceDTO, TransactionDTO } from "@repo/shared";

export type CardRowSource = "transaction" | "pending";

export interface CardStatementRow {
  id: string;
  source: CardRowSource;
  description: string;
  amount: string;
  date: Date;
  type: string;
  installmentInfo: string | null; // 3/12 or null
  cardType: string | null;
  category: {
    id: string;
    name: string;
    color?: string | null;
  } | null;
  sourceAccount: {
    id: string;
    name: string;
  } | null;
  targetAccount: {
    id: string;
    name: string;
  } | null;
  _raw: TransactionDTO | RecurrenceDTO;
}

export function mapTransactionToCardRow(t: TransactionDTO): CardStatementRow {
  const isInstallment = t.recurrence?.frequency === "INSTALLMENT";
  const installmentInfo =
    isInstallment && t.recurrencePartNumber && t.recurrence?.totalParts
      ? `${t.recurrencePartNumber}/${t.recurrence?.totalParts}`
      : null;

  return {
    id: t.id,
    source: "transaction",
    description: t.description ?? "Card Expense",
    amount: t.amount,
    date: t.date,
    type: t.type,
    installmentInfo,
    cardType: t.cardType ?? null,
    category: t.category ?? null,
    sourceAccount: t.sourceAccount
      ? { id: t.sourceAccount.id, name: t.sourceAccount.name }
      : null,
    targetAccount: t.targetAccount
      ? { id: t.targetAccount.id, name: t.targetAccount.name }
      : null,
    _raw: t,
  };
}

export function mapRecurrenceToCardRow(r: RecurrenceDTO): CardStatementRow {
  const isInstallment = r.frequency === "INSTALLMENT";
  // For pending recurrences, the next part is currentPart + 1
  const nextPart = (r.currentPart ?? 0) + 1;
  const installmentInfo =
    isInstallment && r.totalParts
      ? `${nextPart}/${r.totalParts}`
      : null;

  return {
    id: r.id,
    source: "pending",
    description: r.name,
    amount: r.amount,
    date: r.nextDate ?? r.startDate,
    type: r.type,
    installmentInfo,
    cardType: r.cardType ?? null,
    category: r.category ?? null,
    sourceAccount: r.sourceAccount
      ? { id: r.sourceAccount.id, name: r.sourceAccount.name }
      : null,
    targetAccount: r.targetAccount
      ? { id: r.targetAccount.id, name: r.targetAccount.name }
      : null,
    _raw: r,
  };
}
