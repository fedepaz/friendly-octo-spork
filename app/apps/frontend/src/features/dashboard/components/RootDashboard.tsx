//src/features/dashboard/components/RootDashboard.tsx
"use client";

import { Suspense, useEffect } from "react";
import { KPIsDashboard } from "./kpis/kpis-dashboard";
import { MainChartsDashboard } from "./charts/main-charts-dashboard";
import { DashboardKPIsSkeleton } from "./kpis/dashboard-kpis-skeleton";
import { DashboardChartsSkeleton } from "./charts/dashboard-charts-skeleton";
import { useWizard } from "@/providers/wizard-form-provider";

export function RootDashboard() {
  const { openTransaction } = useWizard();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        openTransaction();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openTransaction]);

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
