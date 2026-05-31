// src/features/accounts/components/account-data-table.tsx
"use client";

import { useState } from "react";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { useAccounts } from "../hooks/accountsHooks";
import { accountColumns } from "./columns";
import { AccountDTO } from "@repo/shared";
import { AccountViewForm } from "./account-view-form";

export function AccountDataTable() {
  const { data: accounts = [] } = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState<AccountDTO | null>(
    null,
  );

  return (
    <>
      <DataTable
        columns={accountColumns}
        data={accounts}
        title="Cuentas"
        description="Gestión de cuentas del sistema"
        tableName="accounts"
        totalCount={accounts.length}
        onView={(row) => setSelectedAccount(row)}
      />

      <SlideOverForm
        open={!!selectedAccount}
        onOpenChange={(open) => !open && setSelectedAccount(null)}
        title="Detalles de Cuenta"
        description={selectedAccount?.name}
      >
        {selectedAccount && (
          <AccountViewForm selectedAccount={selectedAccount} />
        )}
      </SlideOverForm>
    </>
  );
}
