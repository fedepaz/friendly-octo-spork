// src/features/updateCardBalance/components/steps/stepUpdate-form.tsx
"use client";

import {
  CardCloseInputDTO,
  CreateTransactionInput,
  RecurrenceDTO,
} from "@repo/shared";
import { useFormContext } from "react-hook-form";

import { useEffect, useState } from "react";
import { useUpdateCardTransactionsForPayStatement } from "../../hooks/updateCardHooks";

function recurrenceToTransactionInput(
  r: RecurrenceDTO,
): CreateTransactionInput {
  return {
    type: r.type,
    amount: r.amount,
    date: new Date(),
    description: r.name,
    categoryId: r.categoryId ?? undefined,
    sourceAccountId: r.sourceAccountId ?? undefined,
    targetAccountId: r.targetAccountId ?? undefined,
    isCardExpense: true,
    cardType: r.cardType ?? undefined,
    recurrenceId: r.id,
    recurrenceName: r.name,
    isRecurrence: true,
    frequency: r.frequency,
    totalParts: r.totalParts ?? undefined,
    isBudgetedExpense: false,
    isFirstPayment: false,
    shouldStopRecurrence: false,
  };
}

export function StepUpdateComponent() {
  const { watch, setValue } = useFormContext<CardCloseInputDTO>();
  const watched = watch();
  const { data: statement } = useUpdateCardTransactionsForPayStatement(
    watched.year,
    watched.month,
  );

  const openEnded = statement?.recurrences.filter(
    (r) => r.frequency !== "INSTALLMENT",
  );

  // Track which open-ended recurrences have edited amounts
  const [editedAmounts, setEditedAmounts] = useState<Record<string, string>>(
    {},
  );
  const [enabledIds, setEnabledIds] = useState<Set<string>>(new Set());

  // On mount: build recurrencesTransactions from ALL recurrences
  useEffect(() => {
    if (statement?.recurrences.length === 0) return;

    const transactions: CreateTransactionInput[] = statement.recurrences.map(
      (r) => recurrenceToTransactionInput(r),
    );
    setValue("recurrencesTransactions", transactions, { shouldValidate: false });
  }, [statement, setValue]);

  const toggleEnabled = (id: string) => {
    setEnabledIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAmountChange = (id: string, newAmount: string) => {
    setEditedAmounts((prev) => ({ ...prev, [id]: newAmount }));

    // Update the corresponding item in recurrencesTransactions
    const current = watch("recurrencesTransactions");
    const updated = current.map((t) =>
      t.recurrenceId === id ? { ...t, amount: newAmount } : t,
    );
    setValue("recurrencesTransactions", updated, { shouldValidate: false });
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Cuotas abiertas
      </h3>
      <p className="text-xs font-mono text-muted-foreground">
        Solo cuotas mensuales/semanales/anuales. Las cuotas fijas ya tienen
        monto asignado.
      </p>

      {openEnded.length === 0 ? (
        <p className="text-xs font-mono text-muted-foreground p-3 border-2 border-border">
          No hay cuotas abiertas para este mes
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {openEnded.map((r) => {
            const isEnabled = enabledIds.has(r.id);
            const amount = editedAmounts[r.id] ?? r.amount;

            return (
              <div
                key={r.id}
                className="flex items-center gap-3 p-3 border-2 border-border"
              >
                {/* Toggle button */}
                <button
                  type="button"
                  onClick={() => toggleEnabled(r.id)}
                  className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 shrink-0 w-10 h-6 rounded-none border-2 transition-all ${
                    isEnabled
                      ? "border-foreground bg-foreground"
                      : "border-border bg-background"
                  }`}
                >
                  <div
                    className={`w-4 h-4 transition-all ${
                      isEnabled
                        ? "translate-x-5 bg-background"
                        : "translate-x-0.5 bg-muted-foreground"
                    }`}
                  />
                </button>

                {/* Name + frequency */}
                <div className="flex-1 min-w-0">
                  <span className="font-mono font-bold text-sm truncate block">
                    {r.name}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {r.frequency}
                  </span>
                </div>

                {/* Amount field */}
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  disabled={!isEnabled}
                  onChange={(e) => handleAmountChange(r.id, e.target.value)}
                  className={`w-28 bg-background border-2 px-3 py-2 text-sm font-mono text-right transition-all
                    ${isEnabled ? "border-foreground focus:outline-none" : "border-border opacity-60"}
                  `}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
