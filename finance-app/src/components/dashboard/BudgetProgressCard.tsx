// src/components/dashboard/BudgetProgressCard.tsx

import type { FC } from "hono/jsx";

interface BudgetProgressCardProps {
  spent: number;
  limit: number;
  currency?: string;
}

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
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6">
      <div class="text-muted-foreground uppercase font-bold mb-2 text-sm tracking-wider">Monthly Budget</div>
      <div class="font-mono font-bold mb-4 text-3xl">
        {currency}
        {spent.toFixed(2)} / {currency}
        {limit.toFixed(2)}
      </div>

      <div class="w-full h-6 bg-muted border-2 border-border relative overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          class={`h-full transition-all duration-300 ${percentage > 90 ? "bg-destructive" : "bg-primary"}`}
        />
      </div>

      <div class="mt-4">
        <span class={`font-mono font-bold text-lg ${isOverBudget ? "text-destructive-foreground" : "text-primary-foreground"}`}>
          {currency}
          {Math.abs(remaining).toFixed(2)}
        </span>
        <span class="text-muted-foreground ml-2">{isOverBudget ? "over budget" : "remaining"}</span>
      </div>
    </div>
  );
};
