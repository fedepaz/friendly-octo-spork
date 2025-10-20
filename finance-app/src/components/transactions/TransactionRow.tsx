// src/components/transactions/TransactionRow.tsx
import { FC } from "hono/jsx";

// Placeholder for Transaction type
interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  description?: string;
  category?: { name: string };
  sourceAccount?: { name: string };
  targetAccount?: { name: string };
}

export const TransactionRow: FC<{ transaction: Transaction }> = ({ transaction }) => {
  const amountClass = transaction.type === "EXPENSE" ? "text-danger" : "text-success";
  const accountName = transaction.sourceAccount?.name || transaction.targetAccount?.name || "N/A";

  return (
    <tr id={`transaction-${transaction.id}`}>
      <td>{new Date(transaction.date).toLocaleDateString()}</td>
      <td>{transaction.description}</td>
      <td>{transaction.type}</td>
      <td>{transaction.category?.name || "N/A"}</td>
      <td>{accountName}</td>
      <td class={`text-end ${amountClass}`}>${transaction.amount.toFixed(2)}</td>
      <td>
        <button
          class="btn btn-sm btn-ghost-secondary"
          hx-get={`/api/transactions/${transaction.id}/edit`}
          hx-target={`#transaction-${transaction.id}`}
          hx-swap="outerHTML"
        >
          Edit
        </button>
        <button
          class="btn btn-sm btn-ghost-danger"
          hx-delete={`/api/transactions/${transaction.id}`}
          hx-target={`#transaction-${transaction.id}`}
          hx-swap="outerHTML swap:1s"
          hx-confirm="Delete this transaction?"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
