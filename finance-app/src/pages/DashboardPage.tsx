// src/pages/DashboardPage.tsx

import { BudgetProgressCard } from "@/components/dashboard/BudgetProgressCard";
import { StatCard } from "@/components/dashboard/StatCard";
import Layout from "@/components/shared/Layout";
import { LinkButton } from "@/components/shared/LinkButton"; // New import
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionTable } from "@/components/transactions/TransactionsTable";
import type { Account, Category, Transaction } from "@/generated/prisma";
import type { FC } from "hono/jsx";

interface DashboardData {
  monthlySpent: number;
  monthlyBudget: number;
  dailyAverage: number;
  expenseCount: number;
  categories: Category[];
  accounts: Account[];
  recentTransactions: Transaction[];
}

const RecentTransactions: FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-4 rounded-none
    transition-all duration-150
    hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
  >
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Recent Transactions
      </h2>
      <LinkButton href="/transactions">
        View All
      </LinkButton>
    </div>
    <TransactionTable transactions={transactions} />
  </div>
);

export const DashboardPage: FC<{ data: DashboardData }> = ({ data }) => (
  <Layout activeNavItem="/dashboard">
    <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <BudgetProgressCard
        spent={data.monthlySpent}
        limit={data.monthlyBudget}
      />
      <StatCard
        title="This Month"
        value={`$${data.monthlySpent.toFixed(2)}`}
        subtitle={`${data.expenseCount} transactions`}
        color="destructive"
      />
      <StatCard
        title="Daily Average"
        value={`$${data.dailyAverage.toFixed(2)}`}
        subtitle="Based on this month"
        color="accent"
      />
    </div>

    <TransactionForm categories={data.categories} accounts={data.accounts} />

    <RecentTransactions transactions={data.recentTransactions} />
  </Layout>
);
