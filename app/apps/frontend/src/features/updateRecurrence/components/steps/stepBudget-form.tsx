// src/features/createTransaction/components/steps/stepBudget-form.tsx
"use client";

import { Label } from "@/components/ui/label";
import { InLineError } from "@/components/ui/in-line-error";
import { BudgetCategory, CreateTransactionInput } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { useRecurrenceById } from "@/features/recurrences/hooks/recurrenceHooks";

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
  const { data: recurrence } = useRecurrenceById(watched.recurrenceId || "");

  const watchedTransactionType = watched.type !== "EXPENSE";

  // Type guard for metadata
  const metadata = (recurrence?.metadata as Record<string, unknown>) || {};
  const isBudgetedRef = metadata.isBudgetedExpense === true;
  const budgetCategoryRef = metadata.budgetCategory as string | undefined;

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
      {recurrence && (
        <div className="p-3 border border-border/40 bg-background/40 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">
            Referencia de Presupuesto
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[9px] font-bold text-muted-foreground/40 uppercase">Presupuestado</p>
              <p className="text-xs font-mono font-bold">
                {isBudgetedRef ? "SÍ" : "NO"}
              </p>
            </div>
            {budgetCategoryRef && (
              <div>
                <p className="text-[9px] font-bold text-muted-foreground/40 uppercase">Categoría</p>
                <p className="text-xs font-mono font-bold">
                  {budgetCategoryRef}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Is this a budgeted expense?
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => toggleBudgetedExpense(true)}
          disabled={watchedTransactionType}
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
