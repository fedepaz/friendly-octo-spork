// src/components/accounts/AccountCard.tsx

import type { Account } from "@/generated/prisma";
import type { FC } from "hono/jsx";
import { BankIcon, WalletIcon, CreditCardIcon, TrendingUpIcon } from "@/components/icons";

const typeStyleMap: Record<
  string,
  { bg: string; text: string; border: string; icon: string }
> = {
  BANK: {
    bg: "bg-[var(--accent)]/10",
    text: "text-[var(--accent)]",
    border: "border-[var(--accent)]",
    icon: "BankIcon",
  },
  CASH: {
    bg: "bg-[var(--primary)]/10",
    text: "text-[var(--primary)]",
    border: "border-[var(--primary)]",
    icon: "WalletIcon",
  },

  WALLET: {
    bg: "bg-[var(--secondary)]/10",
    text: "text-[var(--secondary)]",
    border: "border-[var(--secondary)]",
    icon: "WalletIcon",
  },
};

interface AccountCardProps {
  account: Account;
}

export const AccountCard: FC<AccountCardProps> = ({ account }) => {
  const typeStyles = typeStyleMap[account.type] || {
    bg: "bg-muted/20",
    text: "text-muted-foreground",
    border: "border-muted",
    icon: "CreditCardIcon",
  };

  return (
    <div
      class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 relative overflow-hidden
                hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-xl)] transition-all duration-150"
    >
      {/* Background Icon */}
      <div class="absolute top-4 right-4 text-6xl opacity-10">
        {(() => {
          switch (typeStyles.icon) {
            case "BankIcon":
              return <BankIcon />;
            case "WalletIcon":
              return <WalletIcon />;
            case "CreditCardIcon":
              return <CreditCardIcon />;
            case "TrendingUpIcon":
              return <TrendingUpIcon />;
            default:
              return null;
          }
        })()}
      </div>

      <div class="flex justify-between items-start mb-6">
        <div>
          <h3 class="text-xl font-bold uppercase tracking-wider mb-2">
            {account.name}
          </h3>
          <span
            class={`inline-flex items-center gap-2 px-3 py-1.5 
                       text-xs font-bold uppercase tracking-wider
                       ${typeStyles.bg} ${typeStyles.text} border-2 ${typeStyles.border}
                       shadow-[var(--shadow-sm)]`}
          >
            {(() => {
              switch (typeStyles.icon) {
                case "BankIcon":
                  return <BankIcon />;
                case "WalletIcon":
                  return <WalletIcon />;
                case "CreditCardIcon":
                  return <CreditCardIcon />;
                case "TrendingUpIcon":
                  return <TrendingUpIcon />;
                default:
                  return null;
              }
            })()}{" "}
            {account.type}
          </span>
        </div>
        <span class="font-mono text-lg font-bold px-3 py-1 bg-secondary/20 border-2 border-border">
          {account.currency}
        </span>
      </div>

      <div
        class={`font-mono text-4xl font-bold mb-6 ${
          Number(account.balance) >= 0
            ? "text-[var(--primary)]"
            : "text-[var(--destructive)]"
        }`}
      >
        ${Number(account.balance).toFixed(2)}
      </div>

      <div class="flex gap-3">
        <button
          class="flex-1 bg-secondary text-secondary-foreground opacity-80 border-2 border-border shadow-[var(--shadow)]
                 px-6 py-3 font-bold uppercase tracking-wider
                 transition-all duration-150
                 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]
                 active:translate-x-1 active:translate-y-1 active:shadow-none"
          hx-get={`/api/accounts/${account.id}/`}
          hx-target="#modal-content"
          aria-label={`View ${account.name}`}
        >
          View
        </button>
        <button
          class="bg-destructive text-destructive-foreground border-2 border-border shadow-[var(--shadow)]
                 px-6 py-3 font-bold uppercase tracking-wider
                 transition-all duration-150
                 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]
                 active:translate-x-1 active:translate-y-1 active:shadow-none"
          hx-get={`/api/accounts/${account.id}/edit`}
          hx-target="#modal-content"
          aria-label={`Edit ${account.name}`}
        >
          Edit
        </button>
      </div>
    </div>
  );
};
