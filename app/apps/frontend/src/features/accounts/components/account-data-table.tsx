// src/features/accounts/components/account-data-table.tsx
"use client";

import { useState } from "react";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { useAccounts } from "../hooks/accountsHooks";
import { accountColumns } from "./columns";
import {
  AccountDTO,
  CreateAccountInput,
  createAccountSchema,
} from "@repo/shared";
import { AccountViewForm } from "./account-view-form";
import { AccountCreateForm } from "./account-create-form";
import { useCreateAccount } from "../hooks/createAccountHook";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function AccountDataTable() {
  const { data: accounts = [] } = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState<AccountDTO | null>(
    null,
  );
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  const { mutateAsync: createAccount, isPending: isCreatingAccount } =
    useCreateAccount();

  const formCreateAccount = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      type: "BANK",
      currency: "ARS",
    },
  });

  const handleView = (row: AccountDTO) => {
    setSelectedAccount(row);
    setSlideOverOpen(true);
  };

  const handleCreate = async (formData: CreateAccountInput) => {
    try {
      await createAccount(formData);
    } catch {}

    if (!isCreatingAccount) setSlideOverOpen(false);
  };

  return (
    <>
      <DataTable
        columns={accountColumns}
        data={accounts}
        title="Cuentas"
        description="Gestión de cuentas del sistema"
        tableName="accounts"
        totalCount={accounts.length}
        onView={handleView}
        toolbarContent={
          <Button
            variant="outline"
            className="h-8 w-8 p-0 bg-background/40 border-border/40 hover:border-primary/40 rounded-none transition-premium"
            onClick={() => setSlideOverOpen(true)}
            aria-label="Crear nueva cuenta"
          >
            <Plus className="h-4 w-4" />
          </Button>
        }
      />

      {slideOverOpen && (
        <SlideOverForm
          open={slideOverOpen}
          onOpenChange={setSlideOverOpen}
          title="Detalles de Cuenta"
          description={selectedAccount?.name}
        >
          <div className="space-y-2">
            {selectedAccount ? (
              <AccountViewForm selectedAccount={selectedAccount} />
            ) : (
              <AccountCreateForm
                onSubmit={handleCreate}
                onCancel={() => setSlideOverOpen(false)}
                formId="account-create-form"
                form={formCreateAccount}
              />
            )}
          </div>
        </SlideOverForm>
      )}
    </>
  );
}
