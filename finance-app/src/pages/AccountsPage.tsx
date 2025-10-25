// src/pages/AccountsPage.tsx

import type { FC } from "hono/jsx";

import type { Account } from "@/generated/prisma";
import { AccountCard } from "@/components/accounts/AccountCard";

interface AccountsPageData {
  accounts: Account[];
}

import type { FC } from "hono/jsx";
import type { Account } from "@/generated/prisma";
import { AccountCard } from "@/components/accounts/AccountCard";

interface AccountsPageData {
  accounts: Account[];
}

const EmptyState: FC = () => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-16 text-center">
    <div class="text-6xl mb-4">💳</div>
    <h3 class="text-2xl font-bold uppercase tracking-wider mb-2">No Accounts Yet</h3>
    <p class="text-muted-foreground mb-6">Create your first account to start tracking your finances.</p>
    <button
      class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
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
    <>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold uppercase tracking-wider">Accounts</h1>
        <button
          class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
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
    </>
  );
};
