// src/features/transactions/components/TransactionsDashboard.tsx

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { Suspense } from "react";
import { transactionsColumns } from "./columns";
import { TransactionsDataTable } from "./transactions-data-table";

export function TransactionsDashboard() {
  return (
    <div className="flex flex-col gap-3">
      <Suspense
        fallback={
          <DataTableSkeleton columnCount={transactionsColumns.length} />
        }
      >
        <TransactionsDataTable />
      </Suspense>
    </div>
  );
}
