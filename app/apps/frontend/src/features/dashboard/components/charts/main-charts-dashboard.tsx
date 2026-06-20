// src/features/dashboard/components/charts/main-charts-dashboard.tsx

import { AnalyticChartsDashboard } from "./analytics/analytic-charts-dashboard";
import { SidebarChartsDashboard } from "./sidebar/sidebar-charts-dashboard";

export function MainChartsDashboard() {
  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-y-auto lg:overflow-hidden pr-1 custom-scrollbar">
      {/* Analytics Section (Span 8) */}
      <AnalyticChartsDashboard />

      {/* Sidebar Section (Span 4) */}
      <SidebarChartsDashboard />
    </div>
  );
}
