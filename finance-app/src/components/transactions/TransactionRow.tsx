// src/components/transactions/TransactionRow.tsx

import type { FC } from "hono/jsx";
import type { Transaction, Category, Account } from "@/generated/prisma";
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
    text: "text-primary-foreground",
    border: "border-primary",
    amountText: "text-primary-foreground",
  },
  EXPENSE: {
    bg: "bg-destructive/20",
    text: "text-destructive-foreground",
    border: "border-destructive",
    amountText: "text-destructive-foreground",
  },
  TRANSFER: {
    bg: "bg-accent/20",
    text: "text-accent-foreground",
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
      <td class="p-4 text-sm font-mono text-muted-foreground">{formattedDate}</td>
      <td class="p-4 text-sm">
        <span
          class={`inline-flex items-center px-2 py-1 border-2 ${typeStyles.border} ${typeStyles.bg} ${typeStyles.text} text-xs font-semibold uppercase tracking-wide rounded-none`}
        >
          {transaction.type}
        </span>
      </td>

      <td class="p-4 text-sm">{transaction.description || "-"}</td>
      <td class="p-4 text-sm flex gap-2 justify-end">
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
        <Button
          type="button" // Explicitly set type to "button"
          class="bg-destructive text-destructive-foreground"
          hxDelete={`/api/transactions/${transaction.id}`}
          hxTarget={`#transaction-${transaction.id}`}
          hxSwap="outerHTML swap:1s"
          hxConfirm="Are you sure you want to delete this transaction?"
          aria-label={`Delete transaction ${transaction.description}`}
        >
        DELETE
        </Button>
      </td>
    </tr>
  );
};
