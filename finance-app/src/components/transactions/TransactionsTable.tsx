// src/components/transactions/TransactionsTable.tsx

import type { FC } from "hono/jsx";
import type { Transaction } from "@/generated/prisma";
import { TransactionRow } from "./TransactionRow";
interface TransactionTableProps {
  transactions: Transaction[];
}

import type { FC } from "hono/jsx";

import type { Transaction } from "@/generated/prisma";

import { TransactionRow } from "./TransactionRow";

interface TransactionTableProps {

  transactions: Transaction[];

}



const ClipboardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`;



const EmptyState: FC = () => (

  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-16 text-center">

    <div class="text-6xl mb-4" dangerouslySetInnerHTML={{ __html: ClipboardIcon }} />

    <h3 class="text-2xl font-bold uppercase tracking-wider mb-2">No Transactions Yet</h3>

    <p class="text-muted-foreground mb-6">Start tracking your finances by adding your first transaction above.</p>

  </div>

);



export const TransactionTable: FC<TransactionTableProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return <EmptyState />;
  }

  const total = transactions.reduce((sum, t) => {
    if (t.type === "INCOME") return sum + Number(t.amount);
    if (t.type === "EXPENSE") return sum - Number(t.amount);
    return sum;
  }, 0);

  return (
    <div class="border-2 border-border shadow-[var(--shadow-lg)] overflow-hidden">
      <table class="w-full">
        <thead class="bg-primary text-primary-foreground">
          <tr>
            <th class="p-4 text-left font-bold uppercase">Date</th>
            <th class="p-4 text-left font-bold uppercase">Type</th>
            <th class="p-4 text-right font-bold uppercase">Amount</th>
            <th class="p-4 text-left font-bold uppercase">Description</th>
            <th class="p-4 text-left font-bold uppercase">Category</th>
            <th class="p-4 text-left font-bold uppercase">Source Account</th>
            <th class="p-4 text-left font-bold uppercase">Target Account</th>
            <th class="p-4 text-right font-bold uppercase" style={{ width: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody id="transaction-list" class="bg-card">
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
        <tfoot>
          <tr class="bg-muted">
            <th colSpan={7} class="p-4 text-right font-bold uppercase">Total Balance</th>
            <th
              class={`p-4 font-mono text-right ${
                total >= 0 ? "text-primary-foreground" : "text-destructive-foreground"
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
