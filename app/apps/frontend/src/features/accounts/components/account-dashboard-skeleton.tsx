// src/features/accounts/components/account-dashboard-skeleton.tsx
"use client";

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { accountColumns } from "./columns";

export function AccountDashboardSkeleton() {
  return <DataTableSkeleton columnCount={accountColumns.length} />;
}
