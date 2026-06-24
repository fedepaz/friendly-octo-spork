// src/features/transactions/components/transactions-data-table.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { useTransactionsByMonth } from "../hooks/transactionsHooks";
import { transactionsColumns } from "./columns";
import { TransactionDTO } from "@repo/shared";
import { TransactionViewForm } from "./transactions-view-form";
import { MonthSelector } from "@/components/data-display/data-table/month-selector";
import { getCurrentMonth, getCurrentYear } from "@/lib/date-utils";

export function TransactionsDataTable() {
  const tdT = useTranslations("TransactionsDashboard");
  const [month, setMonth] = useState(getCurrentMonth() - 1);
  const year = getCurrentYear();
  const { data: transactions = [] } = useTransactionsByMonth(month + 1, year);

  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionDTO | null>(null);

  return (
    <>
      <DataTable
        columns={transactionsColumns}
        data={transactions}
        title={tdT("title")}
        description={tdT("description")}
        tableName="transactions"
        totalCount={transactions.length}
        toolbarContent={<MonthSelector onMonthChange={setMonth} />}
        onView={(row) => setSelectedTransaction(row)}
      />

      <SlideOverForm
        open={!!selectedTransaction}
        onOpenChange={(open) => !open && setSelectedTransaction(null)}
        title={tdT("slideOverTitle")}
        description={selectedTransaction?.category?.name}
      >
        {selectedTransaction && (
          <TransactionViewForm selectedTransaction={selectedTransaction} />
        )}
      </SlideOverForm>
    </>
  );
}
