// src/features/recurrences/components/RecurrencesDashboard.tsx

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { Suspense } from "react";
import { recurrenceColumns } from "./columns";
import { RecurrencesDataTable } from "./recurrences-data-table";

export function RecurrencesDashboard() {
  return (
    <div className="flex flex-col gap-3">
      <Suspense
        fallback={<DataTableSkeleton columnCount={recurrenceColumns.length} />}
      >
        <RecurrencesDataTable />
      </Suspense>
    </div>
  );
}
