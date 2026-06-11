// src/features/createTransaction/components/steps/stepRecurrence-form.tsx
"use client";

import { CreateTransactionInput } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { useRecurrenceById } from "@/features/recurrences/hooks/recurrenceHooks";

export function StepRecurrenceComponent() {
  const { setValue, watch } = useFormContext<CreateTransactionInput>();
  const watched = watch();
  const recurrenceId = watched.recurrenceId;
  const { data: recurrence } = useRecurrenceById(recurrenceId || "");

  // Toggle handler for isRecurrence
  const toggleRecurrence = (value: boolean) => {
    setValue("isRecurrence", value);
    if (!value) {
      // Clear recurrence-specific fields when toggled off
      setValue("recurrenceName", undefined);
      setValue("frequency", undefined);
      setValue("totalParts", undefined);
      setValue("isFirstPayment", false);
    }
  };

  const toggleStopRecurrence = (value: boolean) => {
    setValue("shouldStopRecurrence", value);
  };

  return (
    <div className="flex flex-col gap-4">
      {recurrence && (
        <div className="p-3 border border-border/40 bg-background/40 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">
            Referencia de Recurrencia
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[9px] font-bold text-muted-foreground/40 uppercase">Nombre</p>
              <p className="text-xs font-mono font-bold">{recurrence.name}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-muted-foreground/40 uppercase">Frecuencia</p>
              <p className="text-xs font-mono font-bold">{recurrence.frequency}</p>
            </div>
            {recurrence.totalParts && (
              <div>
                <p className="text-[9px] font-bold text-muted-foreground/40 uppercase">Progreso</p>
                <p className="text-xs font-mono font-bold">
                  {recurrence.currentPart} / {recurrence.totalParts}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Does this ends?
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => toggleRecurrence(true)}
          className={`p-4 border-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
            ${
              watched.isRecurrence
                ? "border-foreground bg-muted"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => toggleRecurrence(false)}
          className={`p-4 border-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
            ${
              !watched.isRecurrence
                ? "border-foreground bg-muted"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
        >
          No
        </button>
      </div>

      {/* STOP RECURRENCE SECTION */}
      <div className="mt-4 p-4 border-2 border-destructive/20 bg-destructive/5 space-y-3">
        <p className="text-xs font-black uppercase tracking-widest text-destructive">
          Zona de Peligro
        </p>
        <p className="text-[10px] text-muted-foreground/60 leading-relaxed font-sans">
          Si activas esta opción, la recurrencia se marcará como inactiva después de este pago. 
          No volverá a aparecer en tu panel de pendientes.
        </p>
        <button
          type="button"
          onClick={() => toggleStopRecurrence(!watched.shouldStopRecurrence)}
          className={`w-full p-3 border-2 font-mono font-black text-[10px] uppercase tracking-tighter transition-all cursor-pointer
            ${watched.shouldStopRecurrence
              ? "bg-destructive text-destructive-foreground border-destructive"
              : "border-destructive/40 text-destructive/60 hover:bg-destructive/10"
            }`}
        >
          {watched.shouldStopRecurrence ? "Detener Recurrencia ✓" : "Detener después de este pago"}
        </button>
      </div>
    </div>
  );
}
