// src/features/createTransaction/components/stepAmount-form.tsx

import { getLocalDateStr } from "@/lib/date-utils";
import { CreateTransactionInput } from "@repo/shared";
import { UseFormReturn } from "react-hook-form";
import { FieldError } from "./wizardModal";
import { Label } from "@/components/ui/label";

interface StepAmountProps {
  formCreateTransaction: UseFormReturn<CreateTransactionInput>;
}

export function StepAmountComponent({
  formCreateTransaction,
}: StepAmountProps) {
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
          {...formCreateTransaction.register("amount")}
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          autoFocus
          className="w-full bg-background border-2 border-border px-4 py-3 text-2xl font-mono text-right focus:outline-none focus:border-foreground transition-colors"
        />
        <FieldError
          message={formCreateTransaction.formState.errors.amount?.message}
        />
      </div>
      <div>
        <Label>Date</Label>
        <input
          {...formCreateTransaction.register("date")}
          type="date"
          className="w-full bg-background border-2 border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
          value={today}
          disabled
        />
        <FieldError
          message={formCreateTransaction.formState.errors.date?.message}
        />
      </div>
    </div>
  );
}
