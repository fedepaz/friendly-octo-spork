// src/features/accounts/components/AccountDashboard.tsx

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { Suspense } from "react";
import { accountColumns } from "./columns";
import { AccountDataTable } from "./account-data-table";

export function AccountDashboard() {
  return (
    <div className="flex flex-col gap-3">
      <Suspense
        fallback={<DataTableSkeleton columnCount={accountColumns.length} />}
      >
        <AccountDataTable />
      </Suspense>
    </div>
  );
}
