// src/pages/DashboardPage.tsx

import type { DashboardInput } from "@/api/dashboard/dashboard.schema";
import { BudgetProgressCard } from "@/components/dashboard/BudgetProgressCard";
import { StatCard } from "@/components/dashboard/StatCard";
import Layout from "@/components/shared/Layout";
import type { Account } from "@/generated/prisma";
import type { FC } from "hono/jsx";

interface DashboardPageProps {
  data: DashboardInput;
}

export const DashboardPage: FC<DashboardPageProps> = ({ data }) => (
  <Layout activeNavItem="/dashboard">
    <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
      Dashboard
    </h1>

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
