// src/features/transactions/components/transactions-data-table.tsx
"use client";

import { Suspense, useState } from "react";
import {
  DataTable,
  DataTableSkeleton,
  SlideOverForm,
} from "@/components/data-display/data-table";
import { useTransactionsByMonth } from "../hooks/transactionsHooks";
import { transactionsColumns } from "./columns";
import { TransactionDTO } from "@repo/shared";
import { TransactionViewForm } from "./transactions-view-form";
import { MonthSelector } from "@/components/data-display/data-table/month-selector";

export function TransactionsDataTable() {
  const [month, setMonth] = useState(new Date().getMonth());
  const { data: transactions = [] } = useTransactionsByMonth(month + 1, 2026);

  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionDTO | null>(null);

  return (
    <Suspense
      fallback={<DataTableSkeleton columnCount={transactionsColumns.length} />}
    >
      <DataTable
        columns={transactionsColumns}
        data={transactions}
        title="Transacciones"
        description="Lista de transacciones recientes"
        tableName="transactions"
        totalCount={transactions.length}
        toolbarContent={<MonthSelector onMonthChange={setMonth} />}
        onView={(row) => setSelectedTransaction(row)}
      />

      <SlideOverForm
        open={!!selectedTransaction}
        onOpenChange={(open) => !open && setSelectedTransaction(null)}
        title="Detalle de Transacción"
        description={selectedTransaction?.category?.name}
      >
        {selectedTransaction && (
          <TransactionViewForm selectedTransaction={selectedTransaction} />
        )}
      </SlideOverForm>
    </Suspense>
  );
}
