// src/components/transactions/TransactionsTable.tsx

import type { Transaction } from "@/generated/prisma";
import type { FC } from "hono/jsx";
import { TransactionRow } from "./TransactionRow";
import { ClipboardIcon } from "../icons";

interface TransactionTableProps {
  transactions: Transaction[];
}

const EmptyState: FC = () => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-16 text-center">
    <ClipboardIcon class="text-6xl mb-4" />
    <h3 class="text-2xl font-bold uppercase tracking-wider mb-2">
      No Transactions Yet
    </h3>
    <p class="text-muted-foreground mb-6">Your transactions will appear here</p>
    <button
      class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] 
             px-6 py-3 font-bold uppercase tracking-wider 
             transition-all duration-150 
             hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]
             active:translate-x-1 active:translate-y-1 active:shadow-none"
      hx-get="/transactions/new"
      hx-target="#modal-content"
      hx-swap="innerHTML"
    >
      Add Your First Transaction
    </button>
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
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6">
      <div class="border-2 border-border shadow-[var(--shadow)] overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-border bg-primary text-primary-foreground">
              <th class="p-4 text-left font-bold uppercase tracking-wider whitespace-nowrap">
                Date
              </th>
              <th class="p-4 text-left font-bold uppercase tracking-wider whitespace-nowrap">
                Type
              </th>
              <th class="p-4 text-right font-bold uppercase tracking-wider whitespace-nowrap">
                Amount
              </th>
              <th class="p-4 text-left font-bold uppercase tracking-wider whitespace-nowrap">
                Description
              </th>
              <th class="p-4 text-left font-bold uppercase tracking-wider whitespace-nowrap">
                Category
              </th>
              <th class="p-4 text-left font-bold uppercase tracking-wider whitespace-nowrap">
                Source Account
              </th>
              <th class="p-4 text-left font-bold uppercase tracking-wider whitespace-nowrap">
                Target Account
              </th>
              <th class="p-4  font-bold uppercase tracking-wider whitespace-nowrap w-[200px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody id="transaction-list" class="divide-y-2 divide-border">
            {transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
          <tfoot>
            <tr class="border-t-2 border-border bg-muted">
              <th
                colSpan={7}
                class="p-4 text-right font-bold uppercase tracking-wider whitespace-nowrap"
              >
                Total Balance
              </th>
              <th
                class={`p-4 font-mono text-right font-bold text-lg whitespace-nowrap ${
                  total >= 0
                    ? "text-[var(--primary)]"
                    : "text-[var(--destructive)]"
                }`}
              >
                ${Math.abs(total).toFixed(2)}
              </th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
