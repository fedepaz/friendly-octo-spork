// src/components/dashboard/BudgetProgressCard.tsx

import type { FC } from "hono/jsx";
import {
  AlertTriangleIcon,
  WalletIcon,
  SadFaceIcon,
  HappyFaceIcon,
} from "@/components/icons";

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
    <div
      class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6
             relative overflow-hidden
             transition-all duration-150
             hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-xl)]"
    >
      {/* Background Icon */}
      <div class="absolute top-4 right-4 text-6xl opacity-60">
        {isOverBudget ? <AlertTriangleIcon /> : <WalletIcon />}{" "}
      </div>

      <div class="text-xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
        Monthly Budget
      </div>

      <div class="font-mono font-bold text-4xl mb-4 flex items-baseline gap-2">
        <span
          class={
            isOverBudget ? "text-[var(--destructive)]" : "text-[var(--accent)]"
          }
        >
          {currency}
          {spent.toFixed(2)}
        </span>
        <span class="text-muted-foreground text-2xl">
          / {currency}
          {limit.toFixed(2)}
        </span>
      </div>

      <div
        class="w-full h-8 bg-secondary/20 border-2 border-border relative overflow-hidden mb-4"
        style={{ '--progress-width': `${percentage}%` }}
      >
        <div
          class={`h-full transition-all duration-300 w-[var(--progress-width)] ${
            isOverBudget
              ? "bg-[var(--destructive)]"
              : percentage > 90
              ? "bg-[var(--secondary)]"
              : "bg-[var(--primary)]"
          }`}
        />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <span
            class={`font-mono font-bold text-2xl ${
              isOverBudget
                ? "text-[var(--destructive)]"
                : "text-[var(--accent)]"
            }`}
          >
            {currency}
            {Math.abs(remaining).toFixed(2)}
          </span>
          <span class="text-sm text-muted-foreground ml-2">
            {isOverBudget ? "over budget" : "remaining"}
          </span>
        </div>
        <span class="text-2xl">
          {isOverBudget ? (
            <SadFaceIcon class="text-[var(--destructive)]" />
          ) : (
            <HappyFaceIcon class="text-[var(--accent)]" />
          )}{" "}
        </span>
      </div>
    </div>
  );
};
