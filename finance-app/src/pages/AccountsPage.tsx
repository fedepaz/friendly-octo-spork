// src/pages/AccountsPage.tsx

import { AccountCard } from "@/components/accounts/AccountCard";
import Layout from "@/components/shared/Layout";
import type { Account } from "@/generated/prisma";
import type { FC } from "hono/jsx";

interface AccountsPageData {
  accounts: Account[];
}

const CreditCardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`;

const EmptyState: FC = () => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-12 text-center">
    <div
      class="text-6xl mb-4"
      dangerouslySetInnerHTML={{ __html: CreditCardIcon }}
    />

    <h3 class="text-2xl font-bold mb-2">No Accounts Yet</h3>

    <p class="text-muted-foreground mb-6">
      Create your first account to start tracking your finances.
    </p>
    <button
      class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 text-base transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
      hx-get="/accounts/new"
      hx-target="#modal-content"
      hx-swap="innerHTML"
      data-toggle="modal"
      data-target="#htmx-modal"
    >
      Add Your First Account
    </button>
  </div>
);

export const AccountsPage: FC<AccountsPageData> = ({ accounts }) => {
  return (
    <Layout activeNavItem="/accounts">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Accounts
        </h1>
        <button
          class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 text-base transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
          hx-get="/accounts/new"
          hx-target="#modal-content"
          hx-swap="innerHTML"
          data-toggle="modal"
          data-target="#htmx-modal"
        >
          Add Account
        </button>
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
