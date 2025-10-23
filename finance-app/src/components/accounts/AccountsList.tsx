// src/components/accounts/AccountsList.tsx

import type { Account } from "@/generated/prisma";
import { AccountCard } from "./AccountCard";

export function AccountsList({ accounts }: { accounts: Account[] }) {
  if (accounts.length === 0) {
    return (
      <div id="accounts-list" class="text-center py-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-lg text-muted mb-3"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="7" y1="15" x2="7.01" y2="15" />
          <line x1="11" y1="15" x2="13" y2="15" />
        </svg>
        <h3 class="text-muted">No accounts yet</h3>
        <p class="text-muted">
          Create your first account to start tracking your finances.
        </p>
      </div>
    );
  }

  return (
    <div id="accounts-list" class="row row-cards">
      {accounts.map((account) => (
        <div class="col-md-6 col-lg-4">
          <AccountCard account={account} />
        </div>
      ))}
    </div>
  );
}
