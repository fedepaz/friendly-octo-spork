// src/features/recurrences/components/RecurrencesDashboard.tsx

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { Suspense } from "react";
import { recurrenceColumns } from "./columns";
import { RecurrencesDataTable } from "./recurrences-data-table";

export function RecurrencesDashboard() {
  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0 animate-premium-in">
      <Suspense
        fallback={<DataTableSkeleton columnCount={recurrenceColumns.length} />}
      >
        <RecurrencesDataTable />
      </Suspense>
    </div>
  );
}
