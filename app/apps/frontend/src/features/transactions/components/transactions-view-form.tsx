// src/features/transactions/components/transactions-view-form.tsx
"use client";

import { useTranslations } from "next-intl";
import { TransactionDTO } from "@repo/shared";
import { formatCurrency, getTransactionTypeStyles, cn } from "@/lib/utils";
import { formatShortDate } from "@/lib/date-utils";

interface TransactionViewFormProps {
  selectedTransaction: TransactionDTO;
}

export function TransactionViewForm({
  selectedTransaction,
}: TransactionViewFormProps) {
  const tvfT = useTranslations("TransactionsViewForm");

  return (
    <div className="space-y-6">
      <div className="p-4 bg-background border-l-4 border-primary">
        <p className="text-2.5 uppercase font-bold text-muted-foreground mb-1">
          {tvfT("operationDate")}
        </p>
        <p className="text-sm font-semibold">
          {formatShortDate(selectedTransaction.date)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted/30 border border-border">
          <p className="text-2.5 uppercase font-bold text-muted-foreground opacity-50">
            {tvfT("type")}
          </p>
          <p
            className={cn(
              "text-xs font-black uppercase tracking-tighter",
              getTransactionTypeStyles(selectedTransaction.type).color,
            )}
          >
            {selectedTransaction.type}
          </p>
        </div>
        <div className="p-3 bg-muted/30 border border-border text-right">
          <p className="text-2.5 uppercase font-bold text-muted-foreground opacity-50">
            {tvfT("category")}
          </p>
          <p className="text-xs font-semibold">
            {selectedTransaction.category?.name || tvfT("noCategory")}
          </p>
        </div>
      </div>

      <div className="p-4 bg-primary/5 border border-primary/20 text-center">
        <p className="text-2.5 uppercase font-bold text-primary mb-1">{tvfT("amount")}</p>
        <p
          className={cn(
            "text-3xl font-mono font-black tabular-nums",
            selectedTransaction.type === "EXPENSE"
              ? "text-destructive"
              : "text-secondary",
          )}
        >
          {formatCurrency(selectedTransaction.amount)}
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="text-2.5 font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-1">
          {tvfT("fundFlow")}
        </h4>
        <div className="grid grid-cols-2 gap-2 text-2.75 font-mono">
          <div className="opacity-50">{tvfT("origin")}</div>
          <div className="text-right">
            {selectedTransaction.sourceAccount?.name || tvfT("na")}
          </div>
          <div className="opacity-50">{tvfT("destination")}</div>
          <div className="text-right">
            {selectedTransaction.targetAccount?.name || tvfT("na")}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 border border-dashed border-border text-2.5 font-bold">
          <span className="opacity-60">{tvfT("cardExpense")}</span>
          <div className="flex items-center gap-2">
            {selectedTransaction.cardType && (
              <span className="bg-accent/10 text-accent px-1.5 py-0.5 border border-accent/20">
                {selectedTransaction.cardType}
              </span>
            )}
            <span
              className={
                selectedTransaction.isCardExpense ? "text-accent" : "opacity-20"
              }
            >
              {selectedTransaction.isCardExpense ? tvfT("confirmed") : tvfT("no")}
            </span>
          </div>
        </div>
        {selectedTransaction.recurrence && (
          <div className="flex items-center justify-between p-2 border border-dashed border-border text-2.5 font-bold">
            <span className="opacity-60">{tvfT("recurrence")}</span>
            <div className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary px-1.5 py-0.5 border border-primary/20">
                {selectedTransaction.recurrence.name}
              </span>
              <span className="font-bold">
                {selectedTransaction.recurrence.frequency}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-2 border border-dashed border-border text-2.5 font-bold">
          <span className="opacity-60">{tvfT("budgeted")}</span>
          <div className="flex items-center gap-2">
            {selectedTransaction.budgetCategory && (
              <span className="bg-primary/10 text-primary px-1.5 py-0.5 border border-primary/20">
                {selectedTransaction.budgetCategory}
              </span>
            )}
            <span
              className={
                selectedTransaction.isBudgetedExpense
                  ? "text-primary"
                  : "opacity-20"
              }
            >
              {selectedTransaction.isBudgetedExpense ? tvfT("yes") : tvfT("no")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
