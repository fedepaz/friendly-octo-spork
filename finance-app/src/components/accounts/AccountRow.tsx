// src/components/accounts/AccountRow.tsx

import type { AccountDTO } from "@/api/accounts/accounts.schema";
import type { FC } from "hono/jsx";
import { Button } from "../shared/Button";

interface AccountRowProps {
  account: AccountDTO;
}

export const AccountRow: FC<AccountRowProps> = ({ account }) => {
  return (
    <tr
      id={`account-${account.id}`}
      class="border-b border-border hover:bg-muted transition-colors duration-150"
    >
      <td class="p-4 text-sm font-mono text-muted-foreground text-center">
        {account.name}
      </td>

      <td class="p-4 text-sm text-right">{account.type}</td>
      <td class="p-4 text-sm text-left">{account.currency}</td>
      <td
        class={`p-4 text-sm text-left${
          Number(account.balance) >= 0
            ? "text-[var(--primary)]"
            : "text-[var(--destructive)]"
        }`}
      >
        ${Number(account.balance).toFixed(2)}
      </td>

      <td class="p-4 text-sm flex gap-2 justify-center">
        <Button
          type="button"
          class="bg-secondary text-secondary-foreground"
          hxGet={`/api/accounts/${account.id}`}
          hxTarget="#modal-content"
          hxSwap="innerHTML"
          dataToggle="modal"
          dataTarget="#htmx-modal"
          aria-label={`View account ${account.name}`}
        >
          VIEW
        </Button>
      </td>
    </tr>
  );
};
