// src/features/transactions/components/transactions-dashboard-skeleton.tsx
"use client";

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { transactionsColumns } from "./columns";

export function TransactionsDashboardSkeleton() {
  return <DataTableSkeleton columnCount={transactionsColumns.length} />;
}
