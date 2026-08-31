import { Suspense } from "react";
import { InvestmentsDataTable } from "./investments-data-table";
import { InvestmentsDashboardSkeleton } from "./investments-dashboard-skeleton";

export function InvestmentsDashboard() {
  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0 animate-premium-in">
      <Suspense fallback={<InvestmentsDashboardSkeleton />}>
        <InvestmentsDataTable />
      </Suspense>
    </div>
  );
}
