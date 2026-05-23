// src/components/transactions/TransactionRow.tsx

import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button";
import type { TransactionDTO } from "@/api/transactions/transactions.schema";

interface TransactionRowProps {
  transaction: TransactionDTO;
}

export const TransactionRow: FC<TransactionRowProps> = ({ transaction }) => {
  const dateObj = new Date(transaction.date);
  const dayNumber = dateObj.toLocaleDateString("en-US", { day: "2-digit" });
  const weekdayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

  const currency =
    transaction.sourceAccount?.currency ||
    transaction.targetAccount?.currency ||
    "USD";

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(transaction.amount);

  const isPositive =
    transaction.type === "INCOME" || transaction.type === "RETURN";
  const isNegative =
    transaction.type === "EXPENSE" || transaction.type === "PAYMENT";
  const amountSign = isPositive ? "+" : isNegative ? "-" : "";

  const amountClass = isPositive
    ? "text-emerald-600 font-bold font-mono text-base"
    : isNegative
      ? "text-rose-600 font-bold font-mono text-base"
      : "text-foreground font-semibold font-mono text-base";

  const typeStyles: Record<string, string> = {
    INCOME: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    EXPENSE: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    TRANSFER: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    INVESTMENT: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    RETURN: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    PAYMENT: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };

  const currentTypeStyle =
    typeStyles[transaction.type] ||
    "bg-muted text-muted-foreground border-border";

  const categoryColor = transaction.category?.color || "#6b7280";

  return (
    <tr
      id={`transaction-${transaction.id}`}
      class="border-b border-border hover:bg-muted/50 transition-all duration-200 "
    >
      {/* Date Card Column */}
      <td class="p-4 align-middle text-center w-20">
        <div class="inline-flex flex-col items-center justify-center bg-card shadow-[var(--shadow-sm)] rounded-lg p-1.5 w-12 h-12 border-2 border-border select-none">
          <span class="text-[9px] uppercase font-black tracking-wider text-muted-foreground leading-none">
            {weekdayName}
          </span>
          <span class="text-base font-black text-foreground font-mono leading-none mt-1">
            {dayNumber}
          </span>
        </div>
      </td>

      {/* Amount Column */}
      <td class="p-4 align-middle text-right whitespace-nowrap">
        <span class={amountClass}>
          {amountSign}
          {formattedAmount}
        </span>
      </td>

      {/* Description & Type Column */}
      <td class="p-4 align-middle text-left max-w-xs">
        <div class="flex flex-col gap-1.5">
          <span class="font-semibold text-foreground leading-snug truncate">
            {transaction.description || "Unspecified Description"}
          </span>
          <div class="flex items-center gap-1.5">
            <span
              class={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wider ${currentTypeStyle}`}
            >
              {transaction.type}
            </span>
            {transaction.recurrencePartNumber &&
              transaction.type === "EXPENSE" && (
                <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full border border-border bg-card text-muted-foreground font-mono">
                  Part {transaction.recurrencePartNumber}
                </span>
              )}
          </div>
        </div>
      </td>

      {/* Category Pill Column */}
      <td class="p-4 align-middle text-left">
        {transaction.category ? (
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border shadow-[var(--shadow-sm)]"
            style={{
              backgroundColor: `${categoryColor}15`,
              color: categoryColor,
              borderColor: `${categoryColor}30`,
            }}
          >
            <span
              class="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: categoryColor }}
            ></span>
            {transaction.category.name}
          </span>
        ) : (
          <span class="text-xs text-muted-foreground font-medium italic">
            Uncategorized
          </span>
        )}
      </td>

      {/* Source & Target Accounts Column */}
      <td class="p-4 align-middle text-left">
        {transaction.type === "TRANSFER" &&
        transaction.sourceAccount &&
        transaction.targetAccount ? (
          <div class="flex items-center gap-2">
            <span class="font-semibold text-foreground text-sm border-b-2 border-dashed border-border pb-0.5">
              {transaction.sourceAccount.name}
            </span>
            <span class="text-muted-foreground font-black text-xs">➔</span>
            <span class="font-semibold text-foreground text-sm border-b-2 border-dashed border-border pb-0.5">
              {transaction.targetAccount.name}
            </span>
          </div>
        ) : (
          <div class="flex items-center gap-1.5">
            <span class="font-semibold text-muted-foreground text-sm">
              {transaction.sourceAccount?.name ||
                transaction.targetAccount?.name ||
                "-"}
            </span>
          </div>
        )}
      </td>

      {/* Actions Column */}
      <td class="p-4 align-middle text-center w-32">
        <Button
          type="button"
          class="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded border border-border shadow-[var(--shadow-sm)] hover:shadow-none hover:translate-y-[1px] transition-all"
          hxGet={`/transactions/${transaction.id}`}
          hxTarget="#modal-content"
          hxSwap="innerHTML"
          dataToggle="modal"
          dataTarget="#htmx-modal"
          aria-label={`View transaction ${transaction.description}`}
        >
          VIEW
        </Button>
      </td>
    </tr>
  );
};
