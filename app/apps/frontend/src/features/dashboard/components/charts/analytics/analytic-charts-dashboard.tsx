// src/features/dashboard/components/charts/analytic-charts-dashboard.tsx

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AnalyticChartsBottom } from "./analytic-charts-bottom";
import { AnalyticChartsMain } from "./analytic-charts-main";

function AnalyticChartSkeleton() {
  return (
    <Card className="flex-1 bg-card/20 border-border/40 rounded-none min-h-60 flex flex-col">
      <CardHeader className="pb-4 px-5 pt-5 shrink-0 space-y-1">
        <Skeleton className="h-3 w-56" />
        <Skeleton className="h-2.5 w-40" />
      </CardHeader>
      <CardContent className="flex-1 px-4 pb-4">
        <Skeleton className="h-full w-full rounded-none" />
      </CardContent>
    </Card>
  );
}

export function AnalyticChartsDashboard() {
  return (
    <div className="lg:col-span-8 flex flex-col gap-3 min-h-0">
      <Suspense fallback={<AnalyticChartSkeleton />}>
        <AnalyticChartsMain />
      </Suspense>
      <Suspense fallback={<AnalyticChartSkeleton />}>
        <AnalyticChartsBottom />
      </Suspense>
    </div>
  );
}
