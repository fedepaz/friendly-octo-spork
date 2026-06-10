// src/features/createTransaction/components/steps/stepRecurrence-form.tsx
"use client";

import { CreateTransactionInput } from "@repo/shared";
import { useFormContext } from "react-hook-form";

export function StepRecurrenceComponent() {
  const { setValue, watch } = useFormContext<CreateTransactionInput>();
  const watched = watch();

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

  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
}
