// src/components/transactions/TransactionsTable.tsx

import type { FC } from "hono/jsx";
import type { Transaction } from "@/generated/prisma";
import { TransactionRow } from "./TransactionRow";
interface TransactionTableProps {
  transactions: Transaction[];
}

export const TransactionTable: FC<TransactionTableProps> = ({
  transactions,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="neo-card text-center" style={{ padding: "64px 24px" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>📋</div>
        <h3 className="font-bold uppercase mb-2" style={{ fontSize: "24px" }}>
          No Transactions Yet
        </h3>
        <p className="text-muted" style={{ fontSize: "16px" }}>
          Start tracking your finances by adding your first transaction above.
        </p>
      </div>
    );
  }

  const total = transactions.reduce((sum, t) => {
    if (t.type === "INCOME") return sum + Number(t.amount);
    if (t.type === "EXPENSE") return sum - Number(t.amount);
    return sum;
  }, 0);

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="neo-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Category</th>
            <th className="text-right">Amount</th>
            <th style={{ width: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody id="transaction-list">
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
        <tfoot>
          <tr style={{ background: "var(--muted)" }}>
            <th colSpan={4} className="text-right uppercase">
              Total Balance
            </th>
            <th
              className={`text-right text-mono ${
                total >= 0 ? "text-success" : "text-destructive"
              }`}
            >
              ${Math.abs(total).toFixed(2)}
            </th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
