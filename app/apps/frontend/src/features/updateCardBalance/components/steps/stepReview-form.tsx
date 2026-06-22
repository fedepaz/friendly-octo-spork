// src/features/updateCardBalance/components/steps/stepReview-form.tsx
"use client";

import { CardCloseInputDTO } from "@repo/shared";
import { useFormContext } from "react-hook-form";

export function StepReviewComponent() {
  const { watch } = useFormContext<CardCloseInputDTO>();
  const watched = watch();

  const recurrencesCount = watched.recurencesTransactions?.length ?? 0;

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  const monthName = monthNames[watched.month - 1] ?? "";

  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center">
        <span className="text-lg">✓</span>
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
      </div>

      <p className="text-xs font-mono text-muted-foreground">
        El saldo de la tarjeta fue actualizado correctamente.
      </p>
    </div>
  );
}
