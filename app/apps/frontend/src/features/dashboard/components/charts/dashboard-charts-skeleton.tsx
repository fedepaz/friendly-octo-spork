import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardChartsSkeleton() {
  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-12 gap-3 min-h-0">
      <div className="lg:col-span-8 flex flex-col gap-3">
        <Card className="flex-1 bg-card/20 border-border/40 rounded-none min-h-75 flex flex-col">
          <CardHeader className="pb-4 px-5 pt-5 shrink-0 space-y-1">
            <Skeleton className="h-3 w-56" />
            <Skeleton className="h-2.5 w-40" />
          </CardHeader>
          <CardContent className="flex-1 px-4 pb-4">
            <Skeleton className="h-full w-full rounded-none" />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-4 flex flex-col gap-3">
        <Card className="bg-card/40 border-border/40 rounded-none shrink-0 max-h-[25%]">
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
        <Card className="bg-card/40 border-border/40 rounded-none shrink-0 max-h-[35%]">
          <CardHeader className="pb-2 px-5 pt-4">
            <Skeleton className="h-2.5 w-36" />
          </CardHeader>
          <CardContent className="space-y-4 px-5 pb-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-2.5 w-20" />
                  <Skeleton className="h-2.5 w-8" />
                </div>
                <Skeleton className="h-1.5 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-3 w-14" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="bg-card/40 border-border/40 rounded-none shrink-0 max-h-[25%]">
          <CardHeader className="pb-2 px-5 pt-4">
            <Skeleton className="h-2.5 w-36" />
          </CardHeader>
          <CardContent className="space-y-3 px-5 pb-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
