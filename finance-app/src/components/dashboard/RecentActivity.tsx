// src/components/dashboard/RecentActivity.tsx

import type { FC } from "hono/jsx";
import type { Transaction, Category, Account } from "@/generated/prisma";
import { TransactionRow } from "@/components/transactions/TransactionRow";
import { Icon } from "@/components/shared/Icon"; // New import

interface RecentActivityProps {
  recentActivity: (Transaction & {
    category?: Category;
    sourceAccount?: Account;
    targetAccount?: Account;
  })[];
}

const EmptyState: FC = () => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-12 text-center rounded-none">
    <Icon name="sparkles" class="text-6xl mb-4" aria-label="No recent activity icon" />
    <h3 class="text-2xl md:text-3xl font-bold mb-2">
      NO RECENT ACTIVITY
    </h3>
    <p class="text-muted-foreground">
      ADD SOME TRANSACTIONS TO SEE YOUR RECENT ACTIVITY HERE.
    </p>
  </div>
);

export const RecentActivity: FC<RecentActivityProps> = ({ recentActivity }) => {
  if (recentActivity.length === 0) {
    return <EmptyState />;
  }

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none">
      <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
        RECENT ACTIVITY
      </h3>
      <div class="border-2 border-border shadow-[var(--shadow)] overflow-hidden rounded-none">
        <table class="w-full table-auto">
          <thead class="bg-primary text-primary-foreground uppercase text-left text-sm">
            <tr>
              <th class="p-4 font-bold">Date</th>
              <th class="p-4 font-bold">Type</th>
              <th class="p-4 font-bold text-right">Amount</th>
              <th class="p-4 font-bold">Description</th>
              <th class="p-4 font-bold">Category</th>
              <th class="p-4 font-bold">Source Account</th>
              <th class="p-4 font-bold">Target Account</th>
              <th class="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-card">
            {recentActivity.map((transaction) => (
              <TransactionRow transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
