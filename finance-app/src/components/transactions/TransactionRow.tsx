import type { FC } from "hono/jsx";
import type { Transaction, Category, Account } from "@/generated/prisma";

interface TransactionRowProps {
  transaction: Transaction & {
    category?: Category;
    sourceAccount?: Account;
    targetAccount?: Account;
  };
}

import type { FC } from "hono/jsx";
import type { Transaction, Category, Account } from "@/generated/prisma";

interface TransactionRowProps {
  transaction: Transaction & {
    category?: Category;
    sourceAccount?: Account;
    targetAccount?: Account;
  };
}

const typeColorMap: Record<string, string> = {
  INCOME: "primary",
  EXPENSE: "destructive",
  TRANSFER: "accent",
  PAYMENT: "secondary",
};

export const TransactionRow: FC<TransactionRowProps> = ({ transaction }) => {
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const color = typeColorMap[transaction.type] || "muted";

  return (
    <tr
      id={`transaction-${transaction.id}`}
      class="border-b border-border hover:bg-muted transition-colors duration-150"
    >
      <td class="p-4 text-sm">{formattedDate}</td>
      <td class="p-4 text-sm">
        <span
          class={`inline-flex items-center gap-2 px-2 py-1 border-2 border-${color} bg-${color}/20 text-${color} text-xs font-bold uppercase tracking-wider`}
        >
          {transaction.type}
        </span>
      </td>
      <td class={`p-4 font-mono text-right`}>
        {transaction.sourceAccount?.currency ||
          transaction.targetAccount?.currency ||
          "USD"}{" "}
        {Number(transaction.amount).toFixed(2)}
      </td>
      <td class="p-4 text-sm">{transaction.description || "-"}</td>
      <td class="p-4 text-sm">{transaction.category?.name || "-"}</td>
      <td class="p-4 text-sm">{transaction.sourceAccount?.name || "-"}</td>
      <td class="p-4 text-sm">{transaction.targetAccount?.name || "-"}</td>
      <td class="p-4 text-sm flex gap-2 justify-end">
        <button
          class="bg-secondary text-secondary-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-2 text-xs font-bold uppercase hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150"
          hx-get={`/api/transactions/${transaction.id}/edit`}
          hx-target="#modal-content"
          hx-swap="innerHTML"
          data-toggle="modal"
          data-target="#htmx-modal"
          aria-label={`Edit transaction ${transaction.description}`}
        >
          EDIT
        </button>
        <button
          class="bg-destructive text-destructive-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-2 text-xs font-bold uppercase hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150"
          hx-delete={`/api/transactions/${transaction.id}`}
          hx-target={`#transaction-${transaction.id}`}
          hx-swap="outerHTML swap:1s"
          hx-confirm="Are you sure you want to delete this transaction?"
          aria-label={`Delete transaction ${transaction.description}`}
        >
          DELETE
        </button>
      </td>
    </tr>
  );
};
