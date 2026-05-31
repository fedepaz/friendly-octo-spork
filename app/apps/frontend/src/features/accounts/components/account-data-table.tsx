// src/features/accounts/components/account-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { useAccounts } from "../hooks/accountsHooks";
import { accountColumns } from "./columns";

export function AccountDataTable() {
  const { data: accounts = [] } = useAccounts();

  return (
    <>
      <DataTable
        columns={accountColumns}
        data={accounts}
        title="Cuentas"
        description="Gestión de cuentas del sistema"
        tableName="accounts"
        totalCount={accounts.length}
      />
    </>
  );
}
