// src/features/recurrences/components/recurrences-dashboard-skeleton.tsx
"use client";

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { recurrenceColumns } from "./columns";

export function RecurrencesDashboardSkeleton() {
  return <DataTableSkeleton columnCount={recurrenceColumns.length} />;
}
