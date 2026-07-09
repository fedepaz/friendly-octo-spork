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
import { useTranslations } from "next-intl";
import { EmptyState } from "@/components/common/empty-state";

export function AccountDataTable() {
  const adT = useTranslations("AccountDashboard");
  const { data: accounts = [] } = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState<AccountDTO | null>(
    null,
  );
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  const { mutateAsync: createAccount } = useCreateAccount();

  const formCreateAccount = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      type: "BANK",
      currency: "ARS",
      balance: "0",
    },
  });

  const handleView = (row: AccountDTO) => {
    setSelectedAccount(row);
    setSlideOverOpen(true);
  };

  const handleViewCreate = () => {
    setSelectedAccount(null);
    formCreateAccount.reset();
    setSlideOverOpen(true);
  };

  const handleCreate = async (formData: CreateAccountInput) => {
    try {
      await createAccount(formData);
      setSlideOverOpen(false);
      formCreateAccount.reset();
    } catch {}
  };

  const handleCancel = () => {
    setSelectedAccount(null);
    setSlideOverOpen(false);
  };

  if (!accounts || accounts.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <DataTable
        columns={accountColumns}
        data={accounts}
        title={adT("title")}
        description={adT("description")}
        tableName="accounts"
        totalCount={accounts.length}
        onView={handleView}
        toolbarContent={
          <Button
            variant="outline"
            className="h-9 w-9 p-0 bg-primary/5 border-primary/20 hover:border-primary/60 hover:bg-primary/10 rounded-none transition-premium group"
            onClick={handleViewCreate}
            aria-label={adT("createLabel")}
          >
            <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
        }
      />

      {slideOverOpen && (
        <SlideOverForm<CreateAccountInput>
          formId="account-create-form"
          open={slideOverOpen}
          onOpenChange={setSlideOverOpen}
          title={
            selectedAccount
              ? adT("viewTitle", { name: selectedAccount.name })
              : adT("createTitle")
          }
          description={
            selectedAccount
              ? adT("viewDesc", { currency: selectedAccount.currency, type: selectedAccount.type })
              : adT("createDesc")
          }
          onCancel={handleCancel}
          saveLabel={adT("saveLabel")}
          mode={selectedAccount ? "view" : "create"}
          form={formCreateAccount}
        >
          {selectedAccount ? (
            <AccountViewForm selectedAccount={selectedAccount} />
          ) : (
            <AccountCreateForm
              onSubmit={handleCreate}
              onCancel={handleCancel}
              formId="account-create-form"
              form={formCreateAccount}
            />
          )}
        </SlideOverForm>
      )}
    </>
  );
}
