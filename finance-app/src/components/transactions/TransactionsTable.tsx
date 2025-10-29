// src/components/transactions/TransactionsTable.tsx

import type { Transaction } from "@/generated/prisma";
import type { FC } from "hono/jsx";
import { TransactionRow } from "./TransactionRow";
import { Icon } from "@/components/shared/Icon"; // New import

interface TransactionTableProps {
  transactions: Transaction[];
}

const EmptyState: FC = () => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-12 text-center rounded-none">
    <Icon name="clipboard" class="text-6xl mb-4" aria-label="No transactions icon" />
    <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
      No Transactions Yet
    </h3>
    <p class="text-muted-foreground">
      Start tracking your finances by adding your first transaction above.
    </p>
  </div>
);

export const TransactionTable: FC<TransactionTableProps> = ({
  transactions,
}) => {
  if (transactions.length === 0) {
    return <EmptyState />;
  }

  const total = transactions.reduce((sum, t) => {
    if (t.type === "INCOME") return sum + Number(t.amount);
    if (t.type === "EXPENSE") return sum - Number(t.amount);
    return sum;
  }, 0);

  return (
    <div class="border-2 border-border shadow-[var(--shadow)] overflow-hidden rounded-none">
      <table class="w-full">
        <thead class="bg-primary text-primary-foreground text-sm">
          <tr>
            <th class="p-4 text-left font-bold uppercase tracking-wide">Date</th>
            <th class="p-4 text-left font-bold uppercase tracking-wide">Type</th>
            <th class="p-4 text-right font-bold uppercase tracking-wide">Amount</th>
            <th class="p-4 text-left font-bold uppercase tracking-wide">Description</th>
            <th class="p-4 text-left font-bold uppercase tracking-wide">Category</th>
            <th class="p-4 text-left font-bold uppercase tracking-wide">Source Account</th>
            <th class="p-4 text-left font-bold uppercase tracking-wide">Target Account</th>
            <th
              class="p-4 text-right font-bold uppercase tracking-wide w-[200px]"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody id="transaction-list" class="bg-card">
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
        <tfoot>
          <tr class="bg-muted">
            <th colSpan={7} class="p-4 text-right font-bold uppercase tracking-wide text-sm">
              Total Balance
            </th>
            <th
              class={`p-4 font-mono text-right text-sm ${
                total >= 0
                  ? "text-primary-foreground"
                  : "text-destructive-foreground"
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
