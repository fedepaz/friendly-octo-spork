// src/components/transactions/TransactionRow.tsx

import type { FC } from "hono/jsx";
import type { Transaction } from "@/generated/prisma";
import { Button } from "@/components/shared/Button"; // New import

interface TransactionRowProps {
  transaction: Transaction;
}

const typeStyleMap: Record<
  string,
  { bg: string; text: string; border: string; amountText: string }
> = {
  INCOME: {
    bg: "bg-primary/20",
    text: "text-[var(--accent-mint)]",
    border: "border-primary",
    amountText: "text-[var(--accent-mint)]",
  },
  EXPENSE: {
    bg: "bg-destructive/20",
    text: "text-[var(--accent-coral)]",
    border: "border-destructive",
    amountText: "text-[var(--accent-coral)]",
  },
  TRANSFER: {
    bg: "bg-accent/20",
    text: "text-[var(--accent-lavender)]",
    border: "border-accent",
    amountText: "text-accent-foreground",
  },
  PAYMENT: {
    bg: "bg-secondary/20",
    text: "text-secondary-foreground",
    border: "border-secondary",
    amountText: "text-secondary-foreground",
  },
};

export const TransactionRow: FC<TransactionRowProps> = ({ transaction }) => {
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const typeStyles = typeStyleMap[transaction.type] || {
    bg: "bg-muted/20",
    text: "text-muted-foreground",
    border: "border-muted",
    amountText: "text-muted-foreground",
  };

  return (
    <tr
      id={`transaction-${transaction.id}`}
      class="border-b border-border hover:bg-muted transition-colors duration-150"
    >
      <td class="p-4 text-sm font-mono text-muted-foreground">
        {formattedDate}
      </td>
      <td class="p-4 text-sm">
        <span
          class={`inline-flex items-center px-2 py-1 border-2 ${typeStyles.border} ${typeStyles.bg} ${typeStyles.text} text-xs font-semibold uppercase tracking-wide rounded-none`}
        >
          {transaction.type}
        </span>
      </td>
      <td class="p-4 text-sm text-center">
        {transaction.amount.toString() || "-"}
      </td>
      <td class="p-4 text-sm text-start">{transaction.description || "-"}</td>
      <td class="p-4 text-sm text-center"> {transaction.categoryId || "-"}</td>
      <td class="p-4 text-sm text-center">
        {" "}
        {transaction.sourceAccountId || "-"}
      </td>
      <td class="p-4 text-sm text-center">
        {" "}
        {transaction.targetAccountId || "-"}
      </td>

      <td class="p-4 text-sm flex gap-2 justify-center">
        <Button
          type="button" // Explicitly set type to "button"
          class="bg-secondary text-secondary-foreground"
          hxGet={`/api/transactions/${transaction.id}/edit`}
          hxTarget="#modal-content"
          hxSwap="innerHTML"
          dataToggle="modal"
          dataTarget="#htmx-modal"
          aria-label={`Edit transaction ${transaction.description}`}
        >
          EDIT
        </Button>
      </td>
    </tr>
  );
};
