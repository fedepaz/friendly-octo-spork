// src/components/accounts/AccountsList.tsx

import type { Account } from "@/generated/prisma";
import { AccountCard } from "./AccountCard";

export function AccountsList({ accounts }: { accounts: Account[] }) {
  if (accounts.length === 0) {
    return (
      <div id="accounts-list" class="neo-card text-center p-12">
        <div class="text-6xl mb-4">📋</div>
        <h3 class="text-2xl font-bold mb-2">NO ACCOUNTS YET</h3>
        <p class="text-muted-foreground mb-6">
          CREATE YOUR FIRST ACCOUNT TO START TRACKING YOUR FINANCES.
        </p>
        <button 
          class="neo-btn bg-primary text-primary-foreground"
          hx-get="/api/accounts/new"
          hx-target="#modal-content"
          hx-swap="innerHTML"
          data-toggle="modal"
          data-target="#htmx-modal"
        >
          CREATE ACCOUNT
        </button>
      </div>
    );
  }

  return (
    <div id="accounts-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accounts.map((account) => (
        <AccountCard account={account} />
      ))}
    </div>
  );
}
