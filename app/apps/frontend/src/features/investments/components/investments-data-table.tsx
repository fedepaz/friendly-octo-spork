"use client";

import { useInvestments } from "../hooks/investmentsHooks";
import { investmentColumns } from "./columns";
import { DataTable } from "@/components/data-display/data-table";

export function InvestmentsDataTable() {
  const { data: investments } = useInvestments();

  return (
    <DataTable
      columns={investmentColumns}
      data={investments}
      title="Inversiones"
      tableName="investments"
      description="Reservas e inversiones activas"
      enableSelection={false}
    />
  );
}
