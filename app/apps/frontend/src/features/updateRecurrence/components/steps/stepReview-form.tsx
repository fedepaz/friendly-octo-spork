// src/features/createTransaction/components/steps/stepReview-form.tsx
"use client";

import { useAccountById } from "@/features/accounts/hooks/accountsHooks";
import { CreateTransactionInput, Currency } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { formatCurrency } from "@/lib/utils";
import { useCategorieById } from "@/features/createTransaction/hooks/useCategoriesHook";

export function StepReviewComponent() {
  const { watch } = useFormContext<CreateTransactionInput>();
  const watched = watch();
  const { data: sourceAccount } = useAccountById(watched.sourceAccountId ?? "");
  const { data: targetAccount } = useAccountById(watched.targetAccountId ?? "");
  const { data: category } = useCategorieById(watched.categoryId ?? "");
  const srrT = useTranslations("StepRecReviewForm");

  const categoryName = category?.name;
  const sourceAccountName = sourceAccount?.name;
  const targetAccountName = targetAccount?.name;
  const displayCurrency = (sourceAccount?.currency ||
    targetAccount?.currency ||
    "ARS") as Currency;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        {srrT("title")}
      </h3>

      <div className="border-2 border-border divide-y divide-border">
        {[
          { label: srrT("type"), value: watched.type },
          {
            label: srrT("amount"),
            value: watched.amount
              ? formatCurrency(watched.amount, displayCurrency)
              : "—",
          },
          {
            label: srrT("date"),
            value: watched.date
              ? new Date(watched.date).toLocaleDateString()
              : "—",
          },
          { label: srrT("description"), value: watched.description ?? "—" },
          { label: srrT("from"), value: sourceAccountName ?? "—" },
          { label: srrT("to"), value: targetAccountName ?? "—" },
          {
            label: srrT("category"),
            value: categoryName ?? srrT("none"),
          },
          {
            label: srrT("budget"),
            value: watched.isBudgetedExpense
              ? srrT("budgetYes", { category: watched.budgetCategory ?? "" })
              : srrT("budgetNo"),
          },
          {
            label: srrT("cardType"),
            value: watched.isCardExpense ? (watched.cardType ?? "Yes") : srrT("recurringNo"),
          },
          {
            label: srrT("recurring"),
            value: watched.isRecurrence
              ? srrT("recurringYes", { frequency: watched.frequency ?? "", parts: watched.totalParts ? ` x${watched.totalParts}` : "" })
              : srrT("recurringNo"),
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
