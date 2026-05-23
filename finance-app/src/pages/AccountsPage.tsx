// src/pages/AccountsPage.tsx

import Layout from "@/components/shared/Layout";
import { Button } from "@/components/shared/Button";
import type { FC } from "hono/jsx";
import { AccountsList } from "@/components/accounts/AccountsList";
import type { AccountDTO } from "@/api/accounts/accounts.schema";

interface AccountsPageProps {
  accounts: AccountDTO[];
}

export const AccountsPage: FC<AccountsPageProps> = ({ accounts }) => {
  return (
    <Layout activeNavItem="/accounts">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Accounts
        </h1>
        <Button
          type="button" // Explicitly set type to "button"
          hxGet="/accounts/new"
          hxTarget="#modal-content"
          hxSwap="innerHTML"
          dataToggle="modal"
          dataTarget="#htmx-modal"
        >
          Add Account
        </Button>
      </div>

      <AccountsList accounts={accounts} />
    </Layout>
  );
};
