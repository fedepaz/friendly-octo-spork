// src/components/accounts/AccountsList.tsx

import type { FC } from "hono/jsx";
import type { AccountDTO } from "@/api/accounts/accounts.schema";
import { AccountRow } from "./AccountRow";

interface AccountsListProps {
  accounts: AccountDTO[];
}

export const AccountsList: FC<AccountsListProps> = ({ accounts }) => {
  return (
    <div
      id="accounts-list"
      class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] rounded-xl overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b-2 border-border bg-primary/5 text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">
              <th class="p-4 text-left whitespace-nowrap">Account Name</th>
              <th class="p-4 text-left whitespace-nowrap w-28">Type</th>
              <th class="p-4 text-left whitespace-nowrap w-24">Currency</th>
              <th class="p-4 text-right whitespace-nowrap w-32">Balance</th>
              <th class="p-4 text-center whitespace-nowrap w-24">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y border-border">
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <AccountRow key={account.id} account={account} />
              ))
            ) : (
              <tr>
                <td colspan={5} class="p-8 text-center text-muted-foreground italic font-medium">
                  No accounts registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
