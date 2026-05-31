// src/features/transactions/components/transactions-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { useTransactions } from "../hooks/transactionsHooks";
import { transactionsColumns } from "./columns";

export function TransactionsDataTable() {
  const { data: transactions = [] } = useTransactions();

  return (
    <>
      <DataTable
        columns={transactionsColumns}
        data={transactions}
        title="Transacciones"
        description="Lista de transacciones pendientes"
        tableName="transactions"
        totalCount={transactions.length}
      />
    </>
  );
}
