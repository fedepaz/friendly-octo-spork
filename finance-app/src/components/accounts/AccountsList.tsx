// src/components/accounts/AccountsList.tsx

import type { FC } from "hono/jsx";
import { AccountCard } from "./AccountCard";
import type { AccountDTO } from "@/api/accounts/accounts.schema";
import { AccountRow } from "./AccountRow";

interface AccountsListProps {
  accounts: AccountDTO[];
}

export const AccountsList: FC<AccountsListProps> = ({ accounts }) => {
  return (
    <div
      id="accounts-list"
      class="border-2 border-border shadow-[var(--shadow)] overflow-x-auto"
    >
      {/* Accounts Table */}
      <table class="w-full">
        <thead>
          <tr class="border-b-2 border-border bg-primary text-primary-foreground">
            <th class="p-4 text-center font-bold uppercase tracking-wider whitespace-nowrap">
              Name
            </th>
            <th class="p-4 text-center font-bold uppercase tracking-wider whitespace-nowrap">
              Type
            </th>
            <th class="p-4 text-center font-bold uppercase tracking-wider whitespace-nowrap">
              Currency
            </th>
            <th class="p-4 text-center font-bold uppercase tracking-wider whitespace-nowrap">
              Balance
            </th>
            <th class="p-4 font-bold uppercase tracking-wider whitespace-nowrap w-[200px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody id="transaction-list" class="divide-y-2 divide-border">
          {accounts.length > 0 &&
            accounts.map((transaction) => (
              <AccountRow key={transaction.id} account={transaction} />
            ))}
        </tbody>
      </table>
    </div>
  );
};
