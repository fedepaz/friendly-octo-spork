// src/components/dashboard/BudgetProgressCard.tsx

import type { FC } from "hono/jsx";

interface BudgetProgressCardProps {
  spent: number;
  limit: number;
  currency?: string;
}

export const BudgetProgressCard: FC<BudgetProgressCardProps> = ({
  spent,
  limit,
  currency = "$",
}) => {
  const percentage = Math.min((spent / limit) * 100, 100);
  const remaining = limit - spent;
  const isOverBudget = remaining < 0;

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 rounded-none
      transition-all duration-150
      hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
    >
      <div class="text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
        Monthly Budget
      </div>
      <div class="font-mono font-bold text-3xl md:text-4xl mb-4">
        {currency}
        {spent.toFixed(2)} / {currency}
        {limit.toFixed(2)}
      </div>

      <div class="w-full h-6 bg-muted border-2 border-border relative overflow-hidden rounded-none">
        <div
          style={{ width: `${percentage}%` }}
          class={`h-full transition-all duration-300 rounded-none ${
            percentage > 90 ? "bg-destructive" : "bg-primary"
          }`}
        />
      </div>

      <div class="mt-4">
        <span
          class={`font-mono font-bold text-lg md:text-xl ${
            isOverBudget
              ? "text-destructive-foreground"
              : "text-primary-foreground"
          }`}
        >
          {currency}
          {Math.abs(remaining).toFixed(2)}
        </span>
        <span class="text-sm text-muted-foreground ml-2">
          {isOverBudget ? "over budget" : "remaining"}
        </span>
      </div>
    </div>
  );
};
