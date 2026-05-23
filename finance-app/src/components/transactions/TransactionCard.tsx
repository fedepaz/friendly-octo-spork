// src/components/transactions/TransactionCard.tsx

import type { TransactionDTO } from "@/api/transactions/transactions.schema";
import type { FC } from "hono/jsx";

interface TransactionCardProps {
  transaction: TransactionDTO;
}

export const TransactionCard: FC<TransactionCardProps> = ({ transaction }) => {
  const isPositive =
    transaction.type === "INCOME" || transaction.type === "RETURN";
  const isNegative =
    transaction.type === "EXPENSE" || transaction.type === "PAYMENT";
  const amountSign = isPositive ? "+" : isNegative ? "-" : "";

  const currency =
    transaction.sourceAccount?.currency ||
    transaction.targetAccount?.currency ||
    "USD";

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(transaction.amount);

  const categoryColor = transaction.category?.color || "#6b7280";

  return (
    <div
      class="bg-card text-card-foreground border-4 border-border shadow-[var(--shadow-lg)] p-8 relative overflow-hidden w-full max-w-md mx-auto"
      style="min-width: 320px;"
    >
      {/* Neo-brutalism decorative corner */}
      <div class="absolute -top-6 -right-6 w-12 h-12 bg-primary rotate-45 border-4 border-border"></div>

      <div class="flex justify-between items-start mb-8">
        <div>
          <h3 class="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
            Transaction Details
          </h3>
          <div
            class={`inline-flex items-center px-3 py-1 text-xs font-black border-2 border-border shadow-[var(--shadow-sm)] uppercase tracking-tighter
            ${
              transaction.type === "INCOME"
                ? "bg-emerald-500 text-white"
                : transaction.type === "EXPENSE"
                  ? "bg-rose-500 text-white"
                  : "bg-blue-500 text-white"
            }`}
          >
            {transaction.type}
          </div>
        </div>
        <div class="text-right">
          <div class="text-xs font-bold text-muted-foreground uppercase mb-1">
            Date
          </div>
          <div class="font-mono font-bold">
            {new Date(transaction.date).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div class="mb-8 p-4 bg-muted/30 border-2 border-border shadow-inner">
        <div class="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
          Amount
        </div>
        <div
          class={`font-mono text-5xl font-black ${
            isPositive
              ? "text-emerald-500"
              : isNegative
                ? "text-rose-500"
                : "text-foreground"
          }`}
        >
          {amountSign}
          {formattedAmount}
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="p-4 border-2 border-border bg-card shadow-[var(--shadow-sm)]">
          <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
            Category
          </div>
          <div class="flex items-center gap-2">
            <span
              class="w-3 h-3 border border-border"
              style={{ backgroundColor: categoryColor }}
            ></span>
            <span class="font-bold text-sm">
              {transaction.category?.name || "None"}
            </span>
          </div>
        </div>
        <div class="p-4 border-2 border-border bg-card shadow-[var(--shadow-sm)]">
          <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
            Account
          </div>
          <div class="font-bold text-sm truncate">
            {transaction.sourceAccount?.name ||
              transaction.targetAccount?.name ||
              "-"}
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <div class="text-xs font-black uppercase tracking-widest text-muted-foreground">
          Description
        </div>
        <p class="font-bold text-lg leading-tight">
          {transaction.description || "No description provided."}
        </p>
      </div>

      {transaction.recurrencePartNumber && (
        <div class="mt-6 pt-4 border-t-2 border-border border-dashed">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-black border-2 border-border">
            RECURRENCE PART: {transaction.recurrencePartNumber}
          </div>
        </div>
      )}
    </div>
  );
};
