"use client";

import { useInvestments } from "../hooks/investmentsHooks";
import { investmentColumns } from "./columns";
import { DataTable } from "@/components/data-display/data-table";
import { useTranslations } from "next-intl";

export function InvestmentsDataTable() {
  const idT = useTranslations("InvestmentsDashboard");
  const { data: investments } = useInvestments();

  return (
    <DataTable
      columns={investmentColumns}
      data={investments}
      title={idT("title")}
      tableName="investments"
      description={idT("description")}
      enableSelection={false}
    />
  );
}
