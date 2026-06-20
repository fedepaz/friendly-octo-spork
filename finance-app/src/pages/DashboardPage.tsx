// src/pages/DashboardPage.tsx

import type { DashboardInput } from "@/api/dashboard/dashboard.schema";
import { BudgetProgressCard } from "@/components/dashboard/BudgetProgressCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/shared/Button";
import Layout from "@/components/shared/Layout";
import type { FC } from "hono/jsx";

interface DashboardPageProps {
  data: DashboardInput;
}

export const DashboardPage: FC<DashboardPageProps> = ({ data }) => (
  <Layout activeNavItem="/dashboard">
    <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
      Dashboard
    </h1>

    <div class="flex items-center gap-3 flex-wrap mb-8">
      <Button
        type="button"
        hxGet="/transactions/new"
        hxTarget="#modal-content"
        hxSwap="innerHTML"
      >
        Add Transaction
      </Button>

      <Button
        type="button"
        hxGet="/transactions/new-recurrence"
        hxTarget="#modal-content"
        hxSwap="innerHTML"
      >
        New Recurring
      </Button>

      {/* This third button lives on the recurrences list, not here —
      <Button
  type="button"
  hxGet={`/transactions/link-recurrence/${recurrence.id}`}
  hxTarget="#modal-content"
  hxSwap="innerHTML"
>
  Pay
</Button>
          but wired the same way when you get there: */}

      {/* hxGet="/transactions/link-recurrence/RECURRENCE_ID" */}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <BudgetProgressCard
        spent={data.monthlySpent}
        limit={data.monthlyBudget}
      />
      <StatCard
        title="This Month"
        value={`$${data.monthlySpent.toFixed(2)}`}
        subtitle={`${data.expenseCount} transactions`}
        color="primary"
      />
      <StatCard
        title="Daily Average"
        value={`$${data.dailyAverage.toFixed(2)}`}
        subtitle="Based on this month"
        color="accent"
      />
    </div>
  </Layout>
);
