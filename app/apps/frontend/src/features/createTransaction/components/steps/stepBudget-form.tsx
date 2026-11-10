// src/features/createTransaction/components/steps/stepBudget-form.tsx
"use client";

import { Label } from "@/components/ui/label";
import { BudgetCategory, CreateTransactionInput } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { InLineError } from "@/components/ui/in-line-error";

const CATEGORIES = [
  "DAILY_EXPENSES",
  "FOOD_GROCERIES",
  "ENTERTAINMENT",
  "TRANSPORTATION",
  "HEALTH",
  "UTILITIES",
] as const;

export function StepBudgetComponent() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateTransactionInput>();
  const watched = watch();
  const sbT = useTranslations("StepBudgetForm");

  const watchedTransactionType = watched.type !== "EXPENSE";

  // Toggle handler for isBudgetedExpense
  const toggleBudgetedExpense = (value: boolean) => {
    setValue("isBudgetedExpense", value);
    if (!value) {
      // Clear budget-specific fields when toggled off
      setValue("budgetCategory", null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-black uppercase tracking-widest text-foreground">
        {sbT("title")}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => toggleBudgetedExpense(true)}
          disabled={watchedTransactionType}
          className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 p-4 border-2 font-mono font-black text-sm uppercase tracking-widest transition-all
            ${
              watched.isBudgetedExpense
                ? "border-foreground bg-muted"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
        >
          {sbT("yes")}
        </button>
        <button
          type="button"
          onClick={() => toggleBudgetedExpense(false)}
          className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 p-4 border-2 font-mono font-black text-sm uppercase tracking-widest transition-all
            ${
              !watched.isBudgetedExpense
                ? "border-foreground bg-muted"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
        >
          {sbT("no")}
        </button>
      </div>

      {watched.isBudgetedExpense && (
        <div className="flex flex-col gap-3 border-2 border-border p-3">
          {/* Budget Category Selection */}
          <div>
            <Label>{sbT("budgetCategoryLabel")}</Label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setValue("budgetCategory", c as BudgetCategory);
                  }}
                  className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 p-3 border-2 font-mono text-xs font-black uppercase tracking-widest transition-all
                    ${
                      watched.budgetCategory === c
                        ? "border-foreground bg-muted font-black"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
            {errors.budgetCategory && (
              <InLineError message={errors.budgetCategory.message} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
