// app/components/data-display/feature-card/feature-card-skeleton.tsx

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FeatureCardSkeleton() {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <Skeleton className="h-5 w-5" />
          </div>
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <CardTitle className="mt-3">
          <Skeleton className="h-4 w-30 sm:w-37.5" />
        </CardTitle>
        <div className="space-y-1.5 mt-2">
          <Skeleton className="h-2.5 w-full" />
          <Skeleton className="h-2.5 w-4/5" />
        </div>
      </CardHeader>
    </Card>
  );
}
