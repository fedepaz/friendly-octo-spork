// src/features/transactions/components/transactions-data-table.tsx
"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { useTransactionsByMonth } from "../hooks/transactionsHooks";
import { transactionsColumns } from "./columns";
import { TransactionDTO } from "@repo/shared";
import { TransactionViewForm } from "./transactions-view-form";
import { MonthSelector } from "@/components/data-display/data-table/month-selector";
import { DataTableFacetedFilter } from "@/components/data-display/data-table/column-filters";
import { getCurrentMonth, getCurrentYear } from "@/lib/date-utils";

const TRANSACTION_TYPES = [
  "EXPENSE",
  "INCOME",
  "TRANSFER",
  "INVESTMENT",
  "RETURN",
  "PAYMENT",
] as const;

export function TransactionsDataTable() {
  const tdT = useTranslations("TransactionsDashboard");
  const tcT = useTranslations("TransactionColumns");
  const [month, setMonth] = useState(getCurrentMonth() - 1);
  const [year, setYear] = useState(getCurrentYear());
  const { data: transactions = [] } = useTransactionsByMonth(month + 1, year);

  // #57: facet options derived from the loaded rows
  const typeOptions = useMemo(
    () =>
      TRANSACTION_TYPES.map((type) => ({
        label: tcT(type.toLowerCase()),
        value: type,
      })),
    [tcT],
  );
  const accountOptions = useMemo(() => {
    const names = new Set<string>();
    for (const tx of transactions) {
      if (tx.sourceAccount?.name) names.add(tx.sourceAccount.name);
      if (tx.targetAccount?.name) names.add(tx.targetAccount.name);
    }
    return [...names].sort().map((name) => ({ label: name, value: name }));
  }, [transactions]);
  const categoryOptions = useMemo(() => {
    const names = new Set<string>();
    for (const tx of transactions) {
      if (tx.category?.name) names.add(tx.category.name);
    }
    return [...names].sort().map((name) => ({ label: name, value: name }));
  }, [transactions]);

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
        toolbarContent={(table) => (
          <div className="flex gap-2">
            <DataTableFacetedFilter
              column={table.getColumn("type")}
              title={tcT("typeHeader")}
              options={typeOptions}
            />
            <DataTableFacetedFilter
              column={table.getColumn("account")}
              title={tcT("account")}
              options={accountOptions}
            />
            <DataTableFacetedFilter
              column={table.getColumn("category")}
              title={tcT("category")}
              options={categoryOptions}
            />
            <MonthSelector
              month={month}
              year={year}
              onMonthChange={setMonth}
              onYearChange={setYear}
            />
          </div>
        )}
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
