//src/features/dashboard/components/RootDashboard.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { KPIsDashboard } from "./kpis/kpis-dashboard";
import { MainChartsDashboard } from "./charts/main-charts-dashboard";
import { DashboardKPIsSkeleton } from "./kpis/dashboard-kpis-skeleton";
import { useWizard } from "@/providers/wizard-form-provider";
import { MonthSelector } from "@/components/data-display/data-table/month-selector";
import { getCurrentMonth, getCurrentYear } from "@/lib/date-utils";

export function RootDashboard() {
  const { openTransaction } = useWizard();
  // #64: selected dashboard period — scopes KPIs and charts
  const [month, setMonth] = useState(getCurrentMonth() - 1);
  const [year, setYear] = useState(getCurrentYear());

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
      {/* #64: month navigation — same control as the list screens */}
      <div className="flex items-center justify-end shrink-0">
        <MonthSelector
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>
      <Suspense fallback={<DashboardKPIsSkeleton />}>
        <KPIsDashboard month={month} year={year} />
      </Suspense>
      <MainChartsDashboard month={month} year={year} />
    </div>
  );
}
