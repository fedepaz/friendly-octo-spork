// src/features/updateCardBalance/components/steps/stepReview-form.tsx
"use client";

import { CardCloseInputDTO, CardCloseResponseDTO } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { formatCurrency } from "@/lib/utils";

export function StepReviewComponent({
  closeResponse,
}: {
  closeResponse: CardCloseResponseDTO | null;
}) {
  const { watch } = useFormContext<CardCloseInputDTO>();
  const watched = watch();

  const recurrencesCount = watched.recurrencesTransactions?.length ?? 0;

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  const monthName = monthNames[watched.month - 1] ?? "";

  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <div className="w-12 h-12 border-2 border-secondary flex items-center justify-center">
        <span className="text-lg text-secondary">✓</span>
      </div>

      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Cierre realizado
      </h3>

      <div className="w-full border-2 border-border divide-y divide-border text-left">
        <div className="flex justify-between px-4 py-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Mes
          </span>
          <span className="text-sm font-mono font-bold text-foreground">
            {monthName} {watched.year}
          </span>
        </div>

        <div className="flex justify-between px-4 py-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Transacciones
          </span>
          <span className="text-sm font-mono font-bold text-foreground">
            {recurrencesCount}
          </span>
        </div>

        {closeResponse?.accountName && (
          <div className="flex justify-between px-4 py-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Cuenta
            </span>
            <span className="text-sm font-mono font-bold text-foreground">
              {closeResponse.accountName}
            </span>
          </div>
        )}

        {closeResponse?.closeBalance && (
          <div className="flex justify-between px-4 py-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Saldo final
            </span>
            <span className="text-sm font-mono font-bold text-foreground">
              {formatCurrency(parseFloat(closeResponse.closeBalance))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
