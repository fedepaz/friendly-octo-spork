//src/features/dashboard/components/RootDashboard.tsx
"use client";

import { Suspense } from "react";
import { KPIsDashboard } from "./kpis/kpis-dashboard";
import { MainChartsDashboard } from "./charts/main-charts-dashboard";
import { DashboardKPIsSkeleton } from "./kpis/dashboard-kpis-skeleton";
import { DashboardChartsSkeleton } from "./charts/dashboard-charts-skeleton";

export function RootDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-3 min-h-0 overflow-hidden animate-premium-in mb-3">
      <Suspense fallback={<DashboardKPIsSkeleton />}>
        <KPIsDashboard />
      </Suspense>
      <Suspense fallback={<DashboardChartsSkeleton />}>
        <MainChartsDashboard />
      </Suspense>
    </div>
  );
}
