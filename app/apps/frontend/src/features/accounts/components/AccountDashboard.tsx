// src/features/accounts/components/AccountDashboard.tsx

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { Suspense } from "react";
import { accountColumns } from "./columns";
import { AccountDataTable } from "./account-data-table";

export function AccountDashboard() {
  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0 animate-premium-in">
      <Suspense
        fallback={<DataTableSkeleton columnCount={accountColumns.length} />}
      >
        <AccountDataTable />
      </Suspense>
    </div>
  );
}
