// src/components/dashboard/AccountsSummary.tsx

import type { FC } from "hono/jsx";
import type { AccountDTO } from "@/api/accounts/accounts.schema";
import {
  LandmarkIcon,
  WalletIcon,
  CreditCardIcon,
  BankIcon,
} from "@/components/icons";

interface AccountsSummaryProps {
  accounts: AccountDTO[];
}

const getAccountIcon = (type: string) => {
  switch (type) {
    case "BANK":
      return <LandmarkIcon />;
    case "WALLET":
      return <WalletIcon />;
    case "CARD":
      return <CreditCardIcon />;
    case "INVESTMENT":
      return <BankIcon />;
    default:
      return <WalletIcon />;
  }
};

export const AccountsSummary: FC<AccountsSummaryProps> = ({ accounts }) => {
  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none h-full">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
          <LandmarkIcon /> Accounts
        </h3>
        <div class="text-right">
          <p class="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">
            Total Balance
          </p>
          <p class="text-2xl font-mono font-bold text-accent">
            ${totalBalance.toFixed(2)}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {accounts.map((acc) => (
          <div class="border-2 border-border p-3 flex items-center justify-between gap-4 transition-all duration-150 hover:bg-muted/10 group">
            <div class="flex items-center gap-3">
              <div class="text-xl text-primary group-hover:scale-110 transition-transform duration-150">
                {getAccountIcon(acc.type)}
              </div>
              <div>
                <p class="font-bold uppercase text-sm leading-tight">
                  {acc.name}
                </p>
                <p class="text-[10px] text-muted-foreground uppercase font-semibold">
                  {acc.type} • {acc.currency}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-mono font-bold text-lg leading-none">
                ${acc.balance.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
