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
        return <BankIcon class="w-4.5 h-4.5 text-blue-500" />;
      case "CARD":
        return <CreditCardIcon class="w-4.5 h-4.5 text-purple-500" />;
      case "CASH":
      case "WALLET":
        return <WalletIcon class="w-4.5 h-4.5 text-emerald-500" />;
      case "INVESTMENT":
        return <TrendingUpIcon class="w-4.5 h-4.5 text-amber-500" />;
      default:
        return <BankIcon class="w-4.5 h-4.5 text-muted-foreground" />;
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

  const currencyStyles: Record<string, string> = {
    USD: "bg-card text-foreground border-border",
    ARS: "bg-muted/60 text-muted-foreground border-border",
    USDT: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  };

  const currentCurrencyStyle =
    currencyStyles[account.currency] || "bg-card text-foreground border-border";

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: account.currency,
  }).format(account.balance);

  const balanceClass =
    Number(account.balance) >= 0
      ? "text-emerald-600 font-bold font-mono text-base"
      : "text-rose-600 font-bold font-mono text-base";

  return (
    <tr
      id={`account-${account.id}`}
      class="border-b border-border hover:bg-muted/50 transition-all duration-200 "
    >
      {/* Account Name with Icon */}
      <td class="p-4 align-middle text-left">
        <div class="flex items-center gap-2.5">
          <div class="p-2 bg-card rounded-lg border border-border shadow-[var(--shadow-sm)] flex items-center justify-center">
            {getAccountIcon(account.type)}
          </div>
          <span class="font-bold text-foreground leading-snug">
            {account.name}
          </span>
        </div>
      </td>

      {/* Account Type Badge */}
      <td class="p-4 align-middle text-left">
        <span
          class={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wider ${currentTypeStyle}`}
        >
          {account.type}
        </span>
      </td>

      {/* Currency Pill */}
      <td class="p-4 align-middle text-left">
        <span
          class={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded border uppercase tracking-wider font-mono ${currentCurrencyStyle}`}
        >
          {account.currency}
        </span>
      </td>

      {/* Right Aligned Balance */}
      <td class="p-4 align-middle text-right whitespace-nowrap">
        <span class={balanceClass}>{formattedBalance}</span>
      </td>

      {/* Actions Button */}
      <td class="p-4 align-middle text-center w-32">
        <Button
          type="button"
          class="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded border border-border shadow-[var(--shadow-sm)] hover:shadow-none hover:translate-y-[1px] transition-all"
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
