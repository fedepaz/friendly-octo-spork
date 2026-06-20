// src/features/cards/types/card.type.ts

import { RecurrenceDTO, TransactionDTO } from "@repo/shared";

export type CardRowSource = "recurrence" | "oneTimer" | "payment";

export const SOURCE_LABELS: Record<CardRowSource, string> = {
  recurrence: "CUOTA",
  oneTimer: "CONSUMO",
  payment: "PAGO",
};

export const SOURCE_COLORS: Record<CardRowSource, string> = {
  recurrence: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  oneTimer: "text-rose-400 border-rose-400/40 bg-rose-400/10",
  payment: "text-emerald-500 border-emerald-500/40 bg-emerald-500/10",
};

export interface CardStatementRow {
  id: string;
  source: CardRowSource;
  description: string;
  amount: string;
  date: Date;
  type: string;
  installmentInfo: string | null;
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

export function mapTransactionToCardRow(
  t: TransactionDTO,
  source: Extract<CardRowSource, "oneTimer" | "payment">,
): CardStatementRow {
  const isInstallment = t.recurrence?.frequency === "INSTALLMENT";
  const installmentInfo =
    isInstallment && t.recurrencePartNumber && t.recurrence?.totalParts
      ? `${t.recurrencePartNumber}/${t.recurrence?.totalParts}`
      : null;

  return {
    id: t.id,
    source,
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
  const nextPart = (r.currentPart ?? 0) + 1;
  const installmentInfo =
    isInstallment && r.totalParts
      ? `${nextPart}/${r.totalParts}`
      : null;

  return {
    id: r.id,
    source: "recurrence",
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
