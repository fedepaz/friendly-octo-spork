// src/features/cards/components/CardsDashboard.tsx

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { Suspense } from "react";
import { cardColumns } from "./columns";
import { CardsDataTable } from "./cards-data-table";

export function CardsDashboard() {
  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0 animate-premium-in">
      <Suspense
        fallback={<DataTableSkeleton columnCount={cardColumns.length} />}
      >
        <CardsDataTable />
      </Suspense>
    </div>
  );
}
