import { InvestmentsDataTable } from "./investments-data-table";
import { InvestmentsDashboardSkeleton } from "./investments-dashboard-skeleton";
import { LoadingBoundary } from "@/components/common/loading-boundary";

export function InvestmentsDashboard() {
  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0 animate-premium-in">
      <LoadingBoundary
        skeleton={<InvestmentsDashboardSkeleton />}
        name="investments"
      >
        <InvestmentsDataTable />
      </LoadingBoundary>
    </div>
  );
}
