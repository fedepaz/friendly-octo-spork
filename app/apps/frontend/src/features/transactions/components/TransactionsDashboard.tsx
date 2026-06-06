// src/features/transactions/components/TransactionsDashboard.tsx

import { TransactionsDataTable } from "./transactions-data-table";

export function TransactionsDashboard() {
  return (
    <div className="flex flex-col gap-3">
      <TransactionsDataTable />
    </div>
  );
}
