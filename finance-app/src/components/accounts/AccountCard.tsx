// src/components/accounts/AccountCard.tsx

import type { Account } from "@/generated/prisma";
import type { FC } from "hono/jsx";

import type { Account } from "@/generated/prisma";
import type { FC } from "hono/jsx";

const typeColorMap: Record<string, string> = {
  BANK: "accent",
  CASH: "primary",
  CARD: "secondary",
  INVESTMENT: "destructive",
};

export const AccountCard: FC<{ account: Account }> = ({ account }) => {
  const color = typeColorMap[account.type] || "muted";

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-xl)] transition-all">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-bold uppercase tracking-wider mb-1">{account.name}</h3>
          <span class={`inline-flex items-center gap-2 px-2 py-1 border-2 border-${color} bg-${color}/20 text-${color} text-xs font-bold uppercase tracking-wider`}>
            {account.type}
          </span>
        </div>
        <span class="text-muted-foreground font-mono font-bold text-sm">{account.currency}</span>
      </div>

      <div class={`font-mono font-bold text-3xl mb-4 ${account.balance >= 0 ? "text-primary" : "text-destructive"}`}>
        ${Math.abs(account.balance).toFixed(2)}
      </div>

      <div class="flex gap-2">
        <button
          class="bg-secondary text-secondary-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-2 text-xs font-bold uppercase hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150 flex-1"
          hx-get={`/api/accounts/${account.id}/edit`}
          hx-target="#modal-content"
          aria-label={`Edit ${account.name}`}
        >
          Edit
        </button>
        <button
          class="bg-destructive text-destructive-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-2 text-xs font-bold uppercase hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150"
          hx-delete={`/api/accounts/${account.id}`}
          hx-confirm="Delete this account? This action cannot be undone."
          aria-label={`Delete ${account.name}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
