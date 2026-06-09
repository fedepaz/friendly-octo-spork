// src/features/transactions/components/transactions-data-table.tsx
"use client";

import { useState } from "react";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { useTransactionsByMonth } from "../hooks/transactionsHooks";
import { transactionsColumns } from "./columns";
import { TransactionDTO } from "@repo/shared";
import { TransactionViewForm } from "./transactions-view-form";
import { MonthSelector } from "@/components/data-display/data-table/month-selector";

export function TransactionsDataTable() {
  const [month, setMonth] = useState(new Date().getMonth());
  const year = new Date().getFullYear();
  const { data: transactions = [] } = useTransactionsByMonth(month + 1, year);

  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionDTO | null>(null);

  return (
    <>
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
    </>
  );
}
