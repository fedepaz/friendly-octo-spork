// src/features/createTransaction/components/transactions-wizard-skeleton.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function CreateTransactionsWizardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-75" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    </div>
  );
}
