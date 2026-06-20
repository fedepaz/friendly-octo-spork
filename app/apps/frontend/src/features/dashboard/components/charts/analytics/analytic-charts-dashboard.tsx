// src/features/dashboard/components/charts/analytic-charts-dashboard.tsx

import { AnalyticChartsBottom } from "./analytic-charts-bottom";
import { AnalyticChartsMain } from "./analytic-charts-main";

export function AnalyticChartsDashboard() {
  return (
    <div className="lg:col-span-8 flex flex-col gap-3 min-h-0">
      <AnalyticChartsMain />
      <AnalyticChartsBottom />
    </div>
  );
}
