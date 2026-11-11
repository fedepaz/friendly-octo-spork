// app/components/data-display/kpi-card/kpi-card-skeleton.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function KPICardSkeleton() {
  return (
    <Card className="overflow-hidden" data-testid="kpi-card-skeleton">
      <CardHeader className="flex flex-row items-center justify-between space-y-(--space-0) px-(--space-3) py-(--space-2)">
        <Skeleton className="h-2.5 w-16" />
        <Skeleton className="h-3.5 w-3.5 rounded-full" />
      </CardHeader>
      <CardContent className="px-(--space-3) pb-(--space-3) pt-(--space-0) space-y-(--space-1)">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-2 w-24" />
      </CardContent>
    </Card>
  );
}
