// src/features/cards/components/cards-dashboard-skeleton.tsx
"use client";

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { cardColumns } from "./columns";

export function CardsDashboardSkeleton() {
  return <DataTableSkeleton columnCount={cardColumns.length} />;
}
