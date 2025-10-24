// src/pages/DashboardPage.tsx

import { BudgetProgressCard } from "@/components/dashboard/BudgetProgressCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionTable } from "@/components/transactions/TransactionsTable";
import type { Account, Category, Transaction } from "@/generated/prisma";
import type { FC } from "hono/jsx";

interface DashboardData {
  monthlySpent: number;
  monthlyBudget: number;
  dailyAverage: number;
  expenseCount: number;
}

export const DashboardPage: FC<{ data: DashboardData }> = ({ data }) => (
  <>
    <h1
      className="font-bold uppercase mb-8"
      style={{ fontSize: "48px", letterSpacing: "1px" }}
    >
      Dashboard
    </h1>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 grid-cols-2-md grid-cols-3-md mb-8">
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

    {/* Quick Add Form */}
    <TransactionForm categories={data.categories} accounts={data.accounts} />

    {/* Recent Transactions */}
    <div className="neo-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2
          className="font-bold uppercase"
          style={{ fontSize: "24px", letterSpacing: "0.5px" }}
        >
          Recent Transactions
        </h2>
        <a
          href="/transactions"
          className="neo-btn neo-btn-small neo-btn-accent"
        >
          View All
        </a>
      </div>
      <TransactionTable transactions={data.recentTransactions} />
    </div>
  </>
);
