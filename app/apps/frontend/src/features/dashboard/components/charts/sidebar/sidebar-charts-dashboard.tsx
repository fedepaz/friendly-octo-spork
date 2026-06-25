// src/features/dashboard/components/charts/sidebar-charts-dashboard.tsx

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SidebarChartsAccounts } from "./sidebar-charts-accounts";
import { SidebarChartsBudget } from "./sidebar-charts-budget";
import { SidebarChartsRecentTransactions } from "./sidebar-charts-recTrans";

function SidebarCardSkeleton() {
  return (
    <Card className="bg-card/40 border-border/40 rounded-none shrink-0 max-h-[25%] min-h-16">
      <CardHeader className="pb-2 px-5 pt-4">
        <Skeleton className="h-2.5 w-36" />
      </CardHeader>
      <CardContent className="space-y-3 px-5 pb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-2.5 w-24" />
              <Skeleton className="h-2 w-16" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function SidebarChartsDashboard() {
  return (
    <div className="lg:col-span-4 flex flex-col gap-3 min-h-0">
      <Suspense fallback={<SidebarCardSkeleton />}>
        <SidebarChartsAccounts />
      </Suspense>
      <Suspense fallback={<SidebarCardSkeleton />}>
        <SidebarChartsBudget />
      </Suspense>
      <Suspense fallback={<SidebarCardSkeleton />}>
        <SidebarChartsRecentTransactions />
      </Suspense>
    </div>
  );
}
