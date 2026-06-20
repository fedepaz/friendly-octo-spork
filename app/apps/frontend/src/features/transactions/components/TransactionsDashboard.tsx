// src/features/transactions/components/TransactionsDashboard.tsx

import { Suspense } from "react";
import { TransactionsDataTable } from "./transactions-data-table";
import { DataTableSkeleton } from "@/components/data-display/data-table";
import { transactionsColumns } from "./columns";

export function TransactionsDashboard() {
  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0 animate-premium-in">
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
