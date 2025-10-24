// src/components/dashboard/RecentActivity.tsx

import type { FC } from "hono/jsx";
import type { Transaction, Category, Account } from "@/generated/prisma";
import { TransactionRow } from "@/components/transactions/TransactionRow";

interface RecentActivityProps {
  recentActivity: (Transaction & {
    category?: Category;
    sourceAccount?: Account;
    targetAccount?: Account;
  })[];
}

export const RecentActivity: FC<RecentActivityProps> = ({ recentActivity }) => {
  if (recentActivity.length === 0) {
    return (
      <div class="neo-card text-center p-12">
        <div class="text-6xl mb-4">✨</div>
        <h3 class="text-2xl font-bold mb-2">NO RECENT ACTIVITY</h3>
        <p class="text-muted-foreground mb-6">
          ADD SOME TRANSACTIONS TO SEE YOUR RECENT ACTIVITY HERE.
        </p>
      </div>
    );
  }

  return (
    <div class="neo-card p-6">
      <h3 class="text-xl font-bold uppercase mb-4">RECENT ACTIVITY</h3>
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-primary text-primary-foreground uppercase text-left">
            <th class="p-4">Date</th>
            <th class="p-4">Type</th>
            <th class="p-4 text-right">Amount</th>
            <th class="p-4">Description</th>
            <th class="p-4">Category</th>
            <th class="p-4">Source Account</th>
            <th class="p-4">Target Account</th>
            <th class="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentActivity.map((transaction) => (
            <TransactionRow transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
