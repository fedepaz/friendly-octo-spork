// src/components/accounts/AccountsList.tsx

import type { FC } from "hono/jsx";
import type { Account } from "@/generated/prisma";
import { AccountCard } from "./AccountCard";
import { Button } from "@/components/shared/Button"; // New import
import { ClipboardIcon } from "@/components/icons/ClipboardIcon";

interface AccountsListProps {
  accounts: Account[];
}

export const AccountsList: FC<AccountsListProps> = ({ accounts }) => {
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
