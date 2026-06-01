// src/features/createTransaction/components/stepReview-form.tsx

import { CreateTransactionInput } from "@repo/shared";
import { UseFormReturn } from "react-hook-form";

interface StepReviewProps {
  formCreateTransaction: UseFormReturn<CreateTransactionInput>;
  error?: string | null;
}

export function StepReviewComponent({
  formCreateTransaction,
  error,
}: StepReviewProps) {
  const watched = formCreateTransaction.watch();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Confirm transaction
      </h3>

      <div className="border-2 border-border divide-y divide-border">
        {[
          { label: "Type", value: watched.type },
          {
            label: "Amount",
            value: watched.amount ? `${watched.amount}` : "—",
          },
          {
            label: "Date",
            value: watched.date
              ? new Date(watched.date).toLocaleDateString()
              : "—",
          },
          { label: "Description", value: watched.description ?? "—" },
          { label: "From", value: watched.sourceAccountId ?? "—" },
          { label: "To", value: watched.targetAccountId ?? "—" },
          { label: "Category", value: watched.categoryId ?? "None" },
          {
            label: "Recurring",
            value: watched.isRecurrence
              ? `Yes — ${watched.frequency ?? ""}${watched.totalParts ? ` x${watched.totalParts}` : ""}`
              : "No",
          },
        ]
          .filter(({ value }) => value !== "—")
          .map(({ label, value }) => (
            <div key={label} className="flex justify-between px-4 py-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                {label}
              </span>
              <span className="text-sm font-mono font-bold text-foreground">
                {value}
              </span>
            </div>
          ))}
      </div>

      {error && (
        <div className="border-2 border-destructive bg-destructive/10 px-4 py-3">
          <p className="text-xs font-mono text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
}
