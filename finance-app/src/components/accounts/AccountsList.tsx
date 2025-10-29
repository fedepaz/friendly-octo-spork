// src/components/accounts/AccountsList.tsx

import type { Account } from "@/generated/prisma";
import { AccountCard } from "./AccountCard";
import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button"; // New import
import { Icon } from "@/components/shared/Icon"; // New import

const EmptyState: FC = () => (
  <div
    id="accounts-list"
    class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-12 text-center rounded-none"
  >
    <Icon name="clipboard" class="text-6xl mb-4" aria-label="No accounts icon" />
    <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
      NO ACCOUNTS YET
    </h3>
    <p class="text-muted-foreground">
      CREATE YOUR FIRST ACCOUNT TO START TRACKING YOUR FINANCES.
    </p>
    <Button
      type="button" // Explicitly set type to "button"
      hxGet="/api/accounts/new"
      hxTarget="#modal-content"
      hxSwap="innerHTML"
      dataToggle="modal"
      dataTarget="#htmx-modal"
    >
      CREATE ACCOUNT
    </Button>
  </div>
);

export function AccountsList({ accounts }: { accounts: Account[] }) {
  if (accounts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      id="accounts-list"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {accounts.map((account) => (
        <AccountCard account={account} />
      ))}
    </div>
  );
}
