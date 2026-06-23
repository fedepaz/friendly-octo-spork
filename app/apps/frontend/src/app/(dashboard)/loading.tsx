// src/app/(dashboard)/loading.tsx

import { DashboardKPIsSkeleton } from "@/features/dashboard/components/kpis/dashboard-kpis-skeleton";
import { DashboardChartsSkeleton } from "@/features/dashboard/components/charts/dashboard-charts-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-3 min-h-0 overflow-hidden mb-3">
      <DashboardKPIsSkeleton />
      <DashboardChartsSkeleton />
    </div>
  );
}
