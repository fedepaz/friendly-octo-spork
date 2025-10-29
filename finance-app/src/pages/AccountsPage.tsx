// src/pages/AccountsPage.tsx

import { AccountCard } from "@/components/accounts/AccountCard";
import Layout from "@/components/shared/Layout";
import { Button } from "@/components/shared/Button"; // New import
import { Icon } from "@/components/shared/Icon"; // New import
import type { Account } from "@/generated/prisma";
import type { FC } from "hono/jsx";

interface AccountsPageData {
  accounts: Account[];
}

const EmptyState: FC = () => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-12 text-center rounded-none">
    <Icon name="credit-card" class="text-6xl mb-4" aria-label="No accounts icon" />

    <h3 class="text-2xl md:text-3xl font-bold mb-2">No Accounts Yet</h3>

    <p class="text-muted-foreground mb-6">
      Create your first account to start tracking your finances.
    </p>
    <Button
      type="button" // Explicitly set type to "button"
      hxGet="/accounts/new"
      hxTarget="#modal-content"
      hxSwap="innerHTML"
      dataToggle="modal"
      dataTarget="#htmx-modal"
    >
      Add Your First Account
    </Button>
  </div>
);

export const AccountsPage: FC<AccountsPageData> = ({ accounts }) => {
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

      {accounts.length === 0 ? (
        <EmptyState />
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      )}

      <div id="modal-content"></div>
    </Layout>
  );
};
