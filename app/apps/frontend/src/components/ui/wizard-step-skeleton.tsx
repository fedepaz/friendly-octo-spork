// src/components/ui/wizard-step-skeleton.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function WizardStepSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-premium-in">
      <Skeleton className="h-6 w-48" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
