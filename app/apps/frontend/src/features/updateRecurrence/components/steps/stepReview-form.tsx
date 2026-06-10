// src/features/createTransaction/components/steps/stepReview-form.tsx
"use client";

import { useAccountById } from "@/features/accounts/hooks/accountsHooks";
import { CreateTransactionInput, Currency } from "@repo/shared";
import { useFormContext } from "react-hook-form";

import { formatCurrency } from "@/lib/utils";
import { useCategorieById } from "@/features/createTransaction/hooks/useCategoriesHook";

export function StepReviewComponent() {
  const { watch } = useFormContext<CreateTransactionInput>();
  const watched = watch();
  const { data: sourceAccount } = useAccountById(watched.sourceAccountId ?? "");
  const { data: targetAccount } = useAccountById(watched.targetAccountId ?? "");
  const { data: category } = useCategorieById(watched.categoryId ?? "");

  const categoryName = category?.name;
  const sourceAccountName = sourceAccount?.name;
  const targetAccountName = targetAccount?.name;
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
          {
            label: "Category",
            value: categoryName ?? "None",
          },
          {
            label: "Budget",
            value: watched.isBudgetedExpense
              ? `Yes — ${watched.budgetCategory ?? ""}`
              : "No",
          },
          {
            label: "Card Type",
            value: watched.isCardExpense ? (watched.cardType ?? "Yes") : "No",
          },
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
    </div>
  );
}
