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
    <div className="neo-card">
      <div
        className="text-muted uppercase font-bold mb-2"
        style={{ fontSize: "14px", letterSpacing: "0.5px" }}
      >
        Monthly Budget
      </div>
      <div className="text-mono font-bold mb-4" style={{ fontSize: "28px" }}>
        {currency}
        {spent.toFixed(2)} / {currency}
        {limit.toFixed(2)}
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "24px",
          background: "var(--muted)",
          border: "2px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background:
              percentage > 90 ? "var(--destructive)" : "var(--success)",
            transition: "width 0.3s ease-out",
          }}
        />
      </div>

      <div className="mt-4">
        <span
          className={`text-mono font-bold ${
            isOverBudget ? "text-destructive" : "text-success"
          }`}
          style={{ fontSize: "18px" }}
        >
          {currency}
          {Math.abs(remaining).toFixed(2)}
        </span>
        <span className="text-muted" style={{ marginLeft: "8px" }}>
          {isOverBudget ? "over budget" : "remaining"}
        </span>
      </div>
    </div>
  );
};
