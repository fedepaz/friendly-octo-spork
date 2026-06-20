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
    ? "text-emerald-600 font-bold font-mono text-sm"
    : isNegative
      ? "text-rose-600 font-bold font-mono text-sm"
      : "text-foreground font-semibold font-mono text-sm";

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
      class="border-b border-border hover:bg-muted/30 transition-all duration-200 group"
    >
      {/* Date Card Column */}
      <td class="p-4 align-middle text-center w-20">
        <div class="inline-flex flex-col items-center justify-center bg-card shadow-[var(--shadow-sm)] rounded border border-border p-1 w-10 h-10 select-none group-hover:border-primary/30 transition-colors">
          <span class="text-[8px] uppercase font-black tracking-widest text-muted-foreground leading-none">
            {weekdayName}
          </span>
          <span class="text-sm font-black text-foreground font-mono leading-none mt-0.5">
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
        <div class="flex flex-col gap-1">
          <span class="font-bold text-foreground leading-tight truncate">
            {transaction.description || "Untitled"}
          </span>
          <div class="flex items-center gap-1.5">
            <span
              class={`inline-flex items-center px-1.5 py-0.5 text-[8px] font-black rounded border uppercase tracking-widest ${currentTypeStyle}`}
            >
              {transaction.type}
            </span>
            {transaction.recurrencePartNumber && (
              <span class="inline-flex items-center px-1.5 py-0.5 text-[8px] font-black rounded border border-border bg-muted/20 text-muted-foreground font-mono uppercase tracking-widest">
                P{transaction.recurrencePartNumber}
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Category Pill Column */}
      <td class="p-4 align-middle text-left">
        {transaction.category ? (
          <span
            class="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold rounded border shadow-[var(--shadow-sm)]"
            style={{
              backgroundColor: `${categoryColor}10`,
              color: categoryColor,
              borderColor: `${categoryColor}20`,
            }}
          >
            <span
              class="w-1 h-1 rounded-full"
              style={{ backgroundColor: categoryColor }}
            ></span>
            {transaction.category.name}
          </span>
        ) : (
          <span class="text-[10px] text-muted-foreground font-black uppercase tracking-widest italic opacity-50">
            None
          </span>
        )}
      </td>

      {/* Source & Target Accounts Column */}
      <td class="p-4 align-middle text-left">
        <div class="flex items-center gap-1.5">
          <span class="font-bold text-muted-foreground text-[11px] uppercase tracking-tight truncate max-w-[100px]">
            {transaction.sourceAccount?.name ||
              transaction.targetAccount?.name ||
              "-"}
          </span>
          {transaction.type === "TRANSFER" &&
            transaction.sourceAccount &&
            transaction.targetAccount && (
              <>
                <span class="text-muted-foreground/30 font-black text-[10px]">
                  ➔
                </span>
                <span class="font-bold text-muted-foreground text-[11px] uppercase tracking-tight truncate max-w-[100px]">
                  {transaction.targetAccount.name}
                </span>
              </>
            )}
        </div>
      </td>

      {/* Actions Column */}
      <td class="p-4 align-middle text-center w-24">
        <Button
          type="button"
          class="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-black text-[9px] uppercase tracking-widest px-2.5 py-1.5 rounded border border-border shadow-[var(--shadow-sm)] hover:shadow-none hover:translate-y-[1px] transition-all"
          hxGet={`/transactions/${transaction.id}`}
          hxTarget="#modal-content"
          hxSwap="innerHTML"
          aria-label={`View transaction ${transaction.description}`}
        >
          VIEW
        </Button>
      </td>
    </tr>
  );
};
