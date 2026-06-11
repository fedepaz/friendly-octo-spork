//src/features/dashboard/components/RootDashboard.tsx
"use client";

import { KPIsDashboard } from "./kpis/kpis-dashboard";
import { MainChartsDashboard } from "./charts/main-charts-dashboard";

export function RootDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-3 min-h-0 overflow-hidden animate-premium-in mb-3">
      <KPIsDashboard />
      {/* Main Bento Grid */}
      <MainChartsDashboard />
    </div>
  );
}
