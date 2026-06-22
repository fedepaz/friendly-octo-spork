// src/features/updateCardBalance/components/steps/stepConfirm-form.tsx
"use client";

import { CardCloseInputDTO } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { useAccountById } from "@/features/accounts/hooks/accountsHooks";
import { getLocalDateStr } from "@/lib/date-utils";
import { useUpdateCardTransactionsForPayStatement } from "../../hooks/updateCardHooks";

export function StepConfirmComponent() {
  const { watch } = useFormContext<CardCloseInputDTO>();
  const watched = watch();
  const { data: account } = useAccountById(watched.cardAccountId);
  const { data: statement } = useUpdateCardTransactionsForPayStatement(
    watched.year,
    watched.month,
  );

  const recurrencesTransactions = watched.recurencesTransactions ?? [];
  const oneTimers = statement?.oneTimers;
  const recurrencesTotal = watched.recurencesTransactions.reduce(
    (sum, t) => sum + Number(t.amount),
    0,
  );
  const oneTimersTotal = statement.summary.totalOneTimers;
  const [showRecurrences, setShowRecurrences] = useState(false);
  const [showOneTimers, setShowOneTimers] = useState(false);

  if (!account) return null;
  const currentBalance = account.balance;

  // Group recurrences by frequency for display
  const installments = recurrencesTransactions.filter(
    (t) => t.frequency === "INSTALLMENT",
  );
  const openEnded = recurrencesTransactions.filter(
    (t) => t.frequency !== "INSTALLMENT",
  );

  const totalToDeduct = recurrencesTotal + parseInt(oneTimersTotal);
  const newBalance = parseInt(currentBalance) - totalToDeduct;
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Resumen del cierre
      </h3>

      {/* Balance summary */}
      <div className="border-2 border-border divide-y divide-border">
        <div className="flex justify-between px-4 py-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Balance actual
          </span>
          <span className="text-sm font-mono font-bold text-foreground">
            {formatCurrency(currentBalance)}
          </span>
        </div>

        {/* Recurrences section */}
        <button
          type="button"
          onClick={() => setShowRecurrences(!showRecurrences)}
          className="flex justify-between items-center px-4 py-3 w-full text-left hover:bg-muted/50 transition-colors"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Cantidad ({recurrencesTransactions.length})
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-bold text-foreground">
              {formatCurrency(recurrencesTotal)}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {showRecurrences ? "▲" : "▼"}
            </span>
          </div>
        </button>

        {showRecurrences && (
          <div className="divide-y divide-border/50">
            {installments.length > 0 && (
              <div className="px-4 py-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Cuotas fijas
                </p>
                {installments.map((t, i) => (
                  <div key={i} className="flex justify-between py-1">
                    <span className="font-mono text-xs text-muted-foreground truncate">
                      {t.description}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground truncate">
                      {getLocalDateStr(t.date)}
                    </span>
                    <span className="font-mono text-xs text-foreground shrink-0 ml-2">
                      {formatCurrency(t.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {openEnded.length > 0 && (
              <div className="px-4 py-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Cuotas abiertas
                </p>
                {openEnded.map((t, i) => (
                  <div key={i} className="flex justify-between py-1">
                    <span className="font-mono text-xs text-muted-foreground truncate">
                      {t.description}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground truncate">
                      {getLocalDateStr(t.date)}
                    </span>
                    <span className="font-mono text-xs text-foreground shrink-0 ml-2">
                      {formatCurrency(t.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* One-timers section */}
        <button
          type="button"
          onClick={() => setShowOneTimers(!showOneTimers)}
          className="flex justify-between items-center px-4 py-3 w-full text-left hover:bg-muted/50 transition-colors"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Gastos Únicos ({oneTimers.length})
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-bold text-foreground">
              {formatCurrency(oneTimersTotal)}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {showOneTimers ? "▲" : "▼"}
            </span>
          </div>
        </button>

        {showOneTimers && (
          <div className="px-4 py-2 divide-y divide-border/50">
            {oneTimers.map((t, i) => (
              <div key={i} className="flex justify-between py-1">
                <span className="font-mono text-xs text-muted-foreground truncate">
                  {t.description ?? "—"}
                </span>
                <span className="font-mono text-xs text-foreground shrink-0 ml-2">
                  {formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Totals */}
        <div className="flex justify-between px-4 py-3 bg-muted/30">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Total a descontar
          </span>
          <span className="text-sm font-mono font-bold text-destructive">
            -{formatCurrency(totalToDeduct)}
          </span>
        </div>

        <div className="flex justify-between px-4 py-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Nuevo saldo
          </span>
          <span className="text-sm font-mono font-bold text-foreground">
            {formatCurrency(newBalance)}
          </span>
        </div>
      </div>
    </div>
  );
}
