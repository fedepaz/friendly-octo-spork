// src/features/createTransaction/components/steps/stepReview-form.tsx
"use client";

import { useAccountById } from "@/features/accounts/hooks/accountsHooks";
import { CreateTransactionInput, Currency } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useCategorieById } from "../../hooks/useCategoriesHook";
import { formatCurrency } from "@/lib/utils";

export function StepReviewComponent() {
  const { watch } = useFormContext<CreateTransactionInput>();
  const watched = watch();
  const { data: sourceAccount } = useAccountById(watched.sourceAccountId ?? "");
  const { data: targetAccount } = useAccountById(watched.targetAccountId ?? "");
  const { data: category } = useCategorieById(watched.categoryId ?? "");
  const rvT = useTranslations("StepReviewForm");

  const categoryName = category?.name;
  const sourceAccountName = sourceAccount?.name;
  const targetAccountName = targetAccount?.name;
  const displayCurrency = (sourceAccount?.currency ||
    targetAccount?.currency ||
    "ARS") as Currency;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        {rvT("title")}
      </h3>

      <div className="border-2 border-border divide-y divide-border">
        {[
          { label: rvT("type"), value: watched.type },
          {
            label: rvT("amount"),
            value: watched.amount
              ? formatCurrency(watched.amount, displayCurrency)
              : "—",
          },
          {
            label: rvT("date"),
            value: watched.date
              ? new Date(watched.date).toLocaleDateString()
              : "—",
          },
          { label: rvT("description"), value: watched.description ?? "—" },
          { label: rvT("from"), value: sourceAccountName ?? "—" },
          { label: rvT("to"), value: targetAccountName ?? "—" },
          {
            label: rvT("category"),
            value: categoryName ?? rvT("none"),
          },
          {
            label: rvT("budget"),
            value: watched.isBudgetedExpense
              ? rvT("budgetYes", { category: watched.budgetCategory ?? "" })
              : rvT("budgetNo"),
          },
          {
            label: rvT("cardType"),
            value: watched.isCardExpense ? watched.cardType ?? "Yes" : rvT("recurringNo"),
          },
          {
            label: rvT("recurring"),
            value: watched.isRecurrence
              ? rvT("recurringYes", { frequency: watched.frequency ?? "", parts: watched.totalParts ? ` x${watched.totalParts}` : "" })
              : rvT("recurringNo"),
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
