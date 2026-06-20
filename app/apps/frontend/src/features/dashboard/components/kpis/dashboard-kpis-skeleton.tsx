import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardKPIsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-hidden">
      <div className="lg:col-span-8 grid md:grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="bg-card/40 border-border/40 rounded-none">
            <CardHeader className="pb-1 px-4 pt-4">
              <Skeleton className="h-2.5 w-28" />
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-2.5 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="lg:col-span-4">
        <Skeleton className="h-10 w-full rounded-none" />
      </div>
    </div>
  );
}
