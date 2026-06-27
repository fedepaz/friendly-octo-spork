// src/features/createTransaction/components/steps/stepRecurrence-form.tsx
"use client";

import { CardType, CreateTransactionInput } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRecurrenceById } from "@/features/recurrences/hooks/recurrenceHooks";
import { Label } from "@/components/ui/label";
import { InLineError } from "@/components/ui/in-line-error";

export function StepRecurrenceComponent() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateTransactionInput>();
  const watched = watch();
  const recurrenceId = watched.recurrenceId;
  const sreT = useTranslations("StepRecForm");
  const { data: recurrence } = useRecurrenceById(recurrenceId || "");

  // Toggle handler for isRecurrence
  const toggleRecurrence = (value: boolean) => {
    if (value) {
      // Clear recurrence-specific fields when toggled off
      setValue("isRecurrence", value);
    }
  };

  const toggleStopRecurrence = (value: boolean) => {
    setValue("shouldStopRecurrence", value);
  };

  return (
    <div className="flex flex-col gap-4">
      {watched.isCardExpense && (
        <div className="border-t border-border pt-3 mt-2">
          <Label className="text-sm font-mono mb-2 block">{sreT("cardTypeLabel")}</Label>
          <div className="grid grid-cols-2 gap-2">
            {["VISA", "MASTERCARD", "AMEX", "MAESTRO"].map((card) => (
              <button
                key={card}
                type="button"
                onClick={() => setValue("cardType", card as CardType)}
                className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 p-2 border-2 font-mono text-xs uppercase transition-all
                  ${
                    watched.cardType === card
                      ? "border-foreground bg-muted font-bold"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
              >
                {card}
              </button>
            ))}
            {errors.cardType && (
              <InLineError message={errors.cardType.message} />
            )}
          </div>
        </div>
      )}
      {recurrence && (
        <div className="p-3 border border-border/40 bg-background/40 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[9px] font-bold text-muted-foreground/70 uppercase">
                {sreT("name")}
              </p>
              <p className="text-xs font-mono font-bold">{recurrence.name}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-muted-foreground/70 uppercase">
                {sreT("frequency")}
              </p>
              <p className="text-xs font-mono font-bold">
                {recurrence.frequency}
              </p>
            </div>
            {recurrence.totalParts && (
              <div>
                <p className="text-[9px] font-bold text-muted-foreground/70 uppercase">
                  {sreT("progress")}
                </p>
                <p className="text-xs font-mono font-bold">
                  {recurrence.currentPart} / {recurrence.totalParts}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        {sreT("title")}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => toggleRecurrence(true)}
          className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 p-4 border-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
            ${
              !watched.isRecurrence
                ? "border-foreground bg-muted"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
        >
          {sreT("yes")}
        </button>
        <button
          type="button"
          onClick={() => toggleRecurrence(false)}
          className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 p-4 border-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
            ${
              watched.isRecurrence
                ? "border-foreground bg-muted"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
        >
          {sreT("no")}
        </button>
      </div>

      {/* STOP RECURRENCE SECTION */}
      <div className="mt-4 p-4 border-2 border-destructive/20 bg-destructive/5 space-y-3">
        <p className="text-xs font-black uppercase tracking-widest text-destructive">
          {sreT("dangerZone")}
        </p>
        <p className="text-[12px] text-muted-foreground/60 leading-relaxed font-sans">
          {sreT("dangerDesc")}
        </p>
        <button
          type="button"
          onClick={() => toggleStopRecurrence(!watched.shouldStopRecurrence)}
          className={`w-full p-3 border-2 font-mono font-black text-[14px] uppercase tracking-tighter transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2
            ${
              watched.shouldStopRecurrence
                ? "bg-destructive text-destructive-foreground border-destructive"
                : "border-destructive/40 text-destructive/60 hover:bg-destructive/10"
            }`}
        >
          {watched.shouldStopRecurrence
            ? sreT("stopLabelActive")
            : sreT("stopLabel")}
        </button>
      </div>
    </div>
  );
}
