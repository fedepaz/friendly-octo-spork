// src/features/transactions/components/transactions-view-form.tsx
"use client";

import { TransactionDTO } from "@repo/shared";
import { formatCurrency, getTransactionTypeStyles, cn } from "@/lib/utils";
import { formatShortDate } from "@/lib/date-utils";

interface TransactionViewFormProps {
  selectedTransaction: TransactionDTO;
}

export function TransactionViewForm({
  selectedTransaction,
}: TransactionViewFormProps) {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-background border-l-4 border-primary">
        <p className="text-2.5 uppercase font-bold text-muted-foreground mb-1">
          Fecha de Operación
        </p>
        <p className="text-sm font-semibold">
          {formatShortDate(selectedTransaction.date)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted/30 border border-border">
          <p className="text-2.5 uppercase font-bold text-muted-foreground opacity-50">
            Tipo
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
            Categoría
          </p>
          <p className="text-xs font-semibold">
            {selectedTransaction.categoryId || "SIN CATEGORÍA"}
          </p>
        </div>
      </div>

      <div className="p-4 bg-primary/5 border border-primary/20 text-center">
        <p className="text-2.5 uppercase font-bold text-primary mb-1">Monto</p>
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
          Flujo de Fondos
        </h4>
        <div className="grid grid-cols-2 gap-2 text-2.75 font-mono">
          <div className="opacity-50">ORIGEN:</div>
          <div className="text-right">
            {selectedTransaction.sourceAccountId || "N/A"}
          </div>
          <div className="opacity-50">DESTINO:</div>
          <div className="text-right">
            {selectedTransaction.targetAccountId || "N/A"}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 border border-dashed border-border text-2.5 font-bold">
          <span className="opacity-60">GASTO CON TARJETA</span>
          <span
            className={
              selectedTransaction.isCardExpense ? "text-accent" : "opacity-20"
            }
          >
            {selectedTransaction.isCardExpense ? "CONFIRMADO" : "NO"}
          </span>
        </div>
        <div className="flex items-center justify-between p-2 border border-dashed border-border text-2.5 font-bold">
          <span className="opacity-60">PRESUPUESTADO</span>
          <span
            className={
              selectedTransaction.isBudgetedExpense
                ? "text-primary"
                : "opacity-20"
            }
          >
            {selectedTransaction.isBudgetedExpense ? "SÍ" : "NO"}
          </span>
        </div>
      </div>
    </div>
  );
}
