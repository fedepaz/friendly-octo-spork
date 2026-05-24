// src/components/accounts/AccountRow.tsx

import type { FC } from "hono/jsx";
import type { AccountDTO } from "@/api/accounts/accounts.schema";
import { Button } from "../shared/Button";
import {
  BankIcon,
  CreditCardIcon,
  WalletIcon,
  TrendingUpIcon,
} from "@/components/icons";

interface AccountRowProps {
  account: AccountDTO;
}

export const AccountRow: FC<AccountRowProps> = ({ account }) => {
  const getAccountIcon = (type: string) => {
    switch (type) {
      case "BANK":
        return <BankIcon class="w-4 h-4 text-blue-500" />;
      case "CARD":
        return <CreditCardIcon class="w-4 h-4 text-purple-500" />;
      case "CASH":
      case "WALLET":
        return <WalletIcon class="w-4 h-4 text-emerald-500" />;
      case "INVESTMENT":
        return <TrendingUpIcon class="w-4 h-4 text-amber-500" />;
      default:
        return <BankIcon class="w-4 h-4 text-muted-foreground" />;
    }
  };

  const typeStyles: Record<string, string> = {
    BANK: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    CARD: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    CASH: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    WALLET: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    INVESTMENT: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };

  const currentTypeStyle =
    typeStyles[account.type] || "bg-muted text-muted-foreground border-border";

  const balanceClass =
    Number(account.balance) >= 0
      ? "text-emerald-600 font-bold font-mono text-sm"
      : "text-rose-600 font-bold font-mono text-sm";

  return (
    <tr
      id={`account-${account.id}`}
      class="border-b border-border hover:bg-muted/30 transition-all duration-200 group"
    >
      {/* Account Name with Icon */}
      <td class="p-4 align-middle text-left">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-card rounded border border-border shadow-[var(--shadow-sm)] flex items-center justify-center group-hover:border-primary/30 transition-colors">
            {getAccountIcon(account.type)}
          </div>
          <span class="font-bold text-foreground tracking-tight">
            {account.name}
          </span>
        </div>
      </td>

      {/* Account Type Badge */}
      <td class="p-4 align-middle text-left">
        <span
          class={`inline-flex items-center px-2 py-0.5 text-[9px] font-black rounded border uppercase tracking-widest shadow-[var(--shadow-sm)] ${currentTypeStyle}`}
        >
          {account.type}
        </span>
      </td>

      {/* Currency Pill */}
      <td class="p-4 align-middle text-left">
        <span class="inline-flex items-center px-2 py-0.5 text-[9px] font-black rounded border border-border bg-muted/20 text-muted-foreground uppercase tracking-widest font-mono">
          {account.currency}
        </span>
      </td>

      {/* Right Aligned Balance */}
      <td class="p-4 align-middle text-right whitespace-nowrap">
        <span class={balanceClass}>{account.balance}</span>
      </td>

      {/* Actions Button */}
      <td class="p-4 align-middle text-center w-24">
        <Button
          type="button"
          class="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-black text-[9px] uppercase tracking-widest px-2.5 py-1.5 rounded border border-border shadow-[var(--shadow-sm)] hover:shadow-none hover:translate-y-[1px] transition-all"
          hxGet={`/accounts/${account.id}`}
          hxTarget="#modal-content"
          hxSwap="innerHTML"
          aria-label={`View account ${account.name}`}
        >
          VIEW
        </Button>
      </td>
    </tr>
  );
};
