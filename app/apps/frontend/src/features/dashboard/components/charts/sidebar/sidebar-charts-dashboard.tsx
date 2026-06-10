// src/features/dashboard/components/charts/sidebar-charts-dashboard.tsx

import { SidebarChartsAccounts } from "./sidebar-charts-accounts";
import { SidebarChartsBudget } from "./sidebar-charts-budget";
import { SidebarChartsRecentTransactions } from "./sidebar-charts-recTrans";

interface SidebarChartsDashboardProps {
  onPayClick: (recurrenceId: string) => void;
}

export function SidebarChartsDashboard({
  onPayClick,
}: SidebarChartsDashboardProps) {
  return (
    <div className="lg:col-span-4 flex flex-col gap-3 min-h-0">
      {/* Sidebar Section Accounts */}
      <SidebarChartsAccounts />
      {/* Sidebar Section Budgets */}
      <SidebarChartsBudget />
      {/* Sidebar Section Recent Transactions */}
      <SidebarChartsRecentTransactions onPayClick={onPayClick} />
    </div>
  );
}
