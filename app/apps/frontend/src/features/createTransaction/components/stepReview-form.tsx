// src/features/createTransaction/components/stepReview-form.tsx

import { useAccounts } from "@/features/accounts/hooks/accountsHooks";
import { CreateTransactionInput, Currency } from "@repo/shared";
import { UseFormReturn } from "react-hook-form";
import { useCategorie } from "../hooks/useCategoriesHook";
import { formatCurrency } from "@/lib/utils";

interface StepReviewProps {
  formCreateTransaction: UseFormReturn<CreateTransactionInput>;
  error?: string | null;
}

export function StepReviewComponent({
  formCreateTransaction,
  error,
}: StepReviewProps) {
  const watched = formCreateTransaction.watch();
  const { data: accounts = [] } = useAccounts();
  const { data: categories = [] } = useCategorie();

  const sourceAccount = accounts.find(
    (a) => a.id === watched.sourceAccountId,
  );
  const targetAccount = accounts.find(
    (a) => a.id === watched.targetAccountId,
  );

  const sourceAccountName = sourceAccount?.name;
  const targetAccountName = targetAccount?.name;
  const categoryName = categories.find((c) => c.id === watched.categoryId)
    ?.name;

  const displayCurrency = (sourceAccount?.currency ||
    targetAccount?.currency ||
    "ARS") as Currency;

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
            value: watched.amount
              ? formatCurrency(watched.amount, displayCurrency)
              : "—",
          },
          {
            label: "Date",
            value: watched.date
              ? new Date(watched.date).toLocaleDateString()
              : "—",
          },
          { label: "Description", value: watched.description ?? "—" },
          { label: "From", value: sourceAccountName ?? "—" },
          { label: "To", value: targetAccountName ?? "—" },
          { label: "Category", value: categoryName ?? "None" },
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
