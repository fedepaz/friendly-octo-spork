// src/components/accounts/AccountCard.tsx

import type { FC } from "hono/jsx";
import {
  BankIcon,
  WalletIcon,
  CreditCardIcon,
  TrendingUpIcon,
} from "@/components/icons";
import { typeStyleMap } from "@/types/typesStyleMap";
import type { AccountDTO } from "@/api/accounts/accounts.schema";

interface AccountCardProps {
  account: AccountDTO;
}

export const AccountCard: FC<AccountCardProps> = ({ account }) => {
  const typeStyles = typeStyleMap[account.type] || {
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-border",
    icon: "BankIcon",
  };

  const getAccountIcon = (iconName: string) => {
    switch (iconName) {
      case "BankIcon":
        return <BankIcon class="w-6 h-6" />;
      case "WalletIcon":
        return <WalletIcon class="w-6 h-6" />;
      case "CreditCardIcon":
        return <CreditCardIcon class="w-6 h-6" />;
      case "TrendingUpIcon":
        return <TrendingUpIcon class="w-6 h-6" />;
      default:
        return <BankIcon class="w-6 h-6" />;
    }
  };

  return (
    <div
      class="bg-card text-card-foreground border-4 border-border shadow-[var(--shadow-lg)] p-8 relative overflow-hidden w-full max-w-md mx-auto select-none"
      style="min-width: 320px;"
    >
      {/* Neo-brutalism decorative corner */}
      <div class="absolute -top-6 -right-6 w-12 h-12 bg-primary rotate-45 border-4 border-border"></div>

      <div class="flex justify-between items-start mb-8">
        <div>
          <h3 class="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
            Account Details
          </h3>
          <div
            class={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-black border-2 border-border shadow-[var(--shadow-sm)] uppercase tracking-tight
            ${typeStyles.bg} ${typeStyles.text} ${typeStyles.border}`}
          >
            {getAccountIcon(typeStyles.icon)}
            {account.type}
          </div>
        </div>
        <div class="text-right">
          <div class="text-xs font-bold text-muted-foreground uppercase mb-1">
            Currency
          </div>
          <div class="font-mono font-black text-xl px-3 py-1 bg-secondary/20 border-2 border-border inline-block">
            {account.currency}
          </div>
        </div>
      </div>

      <div class="mb-8 p-6 bg-muted/30 border-2 border-border shadow-inner">
        <div class="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
          Current Balance
        </div>
        <div
          class={`font-mono text-5xl font-black  ${
            Number(account.balance) >= 0 ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {Number(account.balance).toFixed(2)}
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <div class="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
            Account Name
          </div>
          <p class="font-black text-2xl leading-tight uppercase">
            {account.name}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 pt-4 border-t-2 border-border border-dashed">
          <div>
            <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
              Account ID
            </div>
            <div class="font-mono text-[10px] text-muted-foreground truncate">
              {account.id}
            </div>
          </div>
          <div class="text-right">
            <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
              Status
            </div>
            <div class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
