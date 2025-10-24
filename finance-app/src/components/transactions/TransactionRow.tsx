import type { FC } from "hono/jsx";
import type { Transaction, Category, Account } from "@/generated/prisma";

interface TransactionRowProps {
  transaction: Transaction & {
    category?: Category;
    sourceAccount?: Account;
    targetAccount?: Account;
  };
}

export const TransactionRow: FC<TransactionRowProps> = ({ transaction }) => {
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const getTypeColor = (type: string) => {
    switch (type) {
      case "INCOME":
        return "success";
      case "EXPENSE":
        return "destructive";
      case "TRANSFER":
        return "accent";
      case "PAYMENT":
        return "secondary";
      default:
        return "muted";
    }
  };

  return (
    <tr
      id={`transaction-${transaction.id}`}
      class="border-b border-border hover:bg-muted transition-colors duration-150"
    >
      <td class="p-4 text-sm">{formattedDate}</td>
      <span
        className={`text-${getTypeColor(transaction.type)}`}
        style={{
          padding: "4px 8px",
          border: "2px solid currentColor",
          fontSize: "12px",
          fontWeight: "700",
          textTransform: "uppercase",
        }}
      >
        {transaction.type}
      </span>
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
          class="neo-btn text-xs py-1 px-2 bg-secondary text-secondary-foreground"
          hx-get={`/api/transactions/${transaction.id}/edit`}
          hx-target="#modal-content"
          hx-swap="innerHTML"
          data-toggle="modal"
          data-target="#htmx-modal"
        >
          EDIT
        </button>
        <button
          class="neo-btn text-xs py-1 px-2 bg-destructive text-destructive-foreground"
          hx-delete={`/api/transactions/${transaction.id}`}
          hx-target={`#transaction-${transaction.id}`}
          hx-swap="outerHTML swap:1s"
          hx-confirm="Are you sure you want to delete this transaction?"
        >
          DELETE
        </button>
      </td>
    </tr>
  );
};
