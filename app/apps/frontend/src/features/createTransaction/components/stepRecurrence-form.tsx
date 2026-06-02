// src/features/createTransaction/components/stepRecurrence-form.tsx

import { Label } from "@/components/ui/label";
import { CreateTransactionInput } from "@repo/shared";
import { UseFormReturn } from "react-hook-form";

const FREQUENCIES = ["MONTHLY", "WEEKLY", "YEARLY", "INSTALLMENT"] as const;

interface StepRecurrenceProps {
  formCreateTransaction: UseFormReturn<CreateTransactionInput>;
}

export function StepRecurrenceComponent({
  formCreateTransaction,
}: StepRecurrenceProps) {
  const watched = formCreateTransaction.watch();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Does this repeat?
      </h3>

      <div className="grid  gap-3">
        <button
          type="button"
          onClick={() => formCreateTransaction.setValue("isRecurrence", true)}
          className={`p-4 border-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
            ${watched.isRecurrence ? "border-foreground bg-muted" : "border-border text-muted-foreground hover:bg-muted"}`}
        >
          Yes
        </button>
      </div>

      {watched.isRecurrence && (
        <div className="flex flex-col gap-3 border-2 border-border p-3">
          <div>
            <Label>Frequency</Label>
            <div className="grid grid-cols-2 gap-2">
              {FREQUENCIES.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => formCreateTransaction.setValue("frequency", f)}
                  className={`p-3 border-2 font-mono text-xs uppercase tracking-wider transition-all
                    ${
                      watched.frequency === f
                        ? "border-foreground bg-muted font-bold"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {watched.frequency && (
            <div>
              <Label>Total Parts</Label>
              <input
                {...formCreateTransaction.register("totalParts")}
                type="number"
                min="1"
                placeholder="e.g. 9"
                className="w-full bg-background border-2 border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
