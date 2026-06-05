// src/features/createTransaction/components/steps/stepBudget-form.tsx
"use client";

import { Label } from "@/components/ui/label";
import { BudgetCategory, CreateTransactionInput } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { InLineError } from "../inLineError";

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
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Is this a budgeted expense?
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => toggleBudgetedExpense(true)}
          className={`p-4 border-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
            ${
              watched.isBudgetedExpense
                ? "border-foreground bg-muted"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => toggleBudgetedExpense(false)}
          className={`p-4 border-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
            ${
              !watched.isBudgetedExpense
                ? "border-foreground bg-muted"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
        >
          No
        </button>
      </div>

      {watched.isBudgetedExpense && (
        <div className="flex flex-col gap-3 border-2 border-border p-3">
          {/* Budget Category Selection */}
          <div>
            <Label>Budget Category</Label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setValue("budgetCategory", c as BudgetCategory);
                  }}
                  className={`p-3 border-2 font-mono text-xs uppercase tracking-wider transition-all
                    ${
                      watched.budgetCategory === c
                        ? "border-foreground bg-muted font-bold"
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
