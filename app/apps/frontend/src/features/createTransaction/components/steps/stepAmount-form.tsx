// src/features/createTransaction/components/steps/stepAmount-form.tsx
"use client";

import { Label } from "@/components/ui/label";
import { getLocalDateStr } from "@/lib/date-utils";
import { CreateTransactionInput } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { FieldError } from "../wizardModal";

export function StepAmountComponent() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateTransactionInput>();
  
  const date = new Date();
  const today = getLocalDateStr(date);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        How much?
      </h3>
      <div>
        <Label>Amount</Label>
        <input
          {...register("amount")}
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          autoFocus
          className="w-full bg-background border-2 border-border px-4 py-3 text-2xl font-mono text-right focus:outline-none focus:border-foreground transition-colors"
        />
        <FieldError message={errors.amount?.message} />
      </div>
      <div>
        <Label>Date</Label>
        <input
          {...register("date")}
          type="date"
          className="w-full bg-background border-2 border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
          defaultValue={today}
          disabled
        />
        <FieldError message={errors.date?.message} />
      </div>
    </div>
  );
}
