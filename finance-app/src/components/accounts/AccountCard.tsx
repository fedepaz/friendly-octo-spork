// src/components/accounts/AccountCard.tsx

import type { Account } from "@/generated/prisma";
import type { FC } from "hono/jsx";

const typeStyleMap: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  BANK: {
    bg: "bg-accent/20",
    text: "text-accent-foreground",
    border: "border-accent",
  },
  CASH: {
    bg: "bg-primary/20",
    text: "text-primary-foreground",
    border: "border-primary",
  },
  CARD: {
    bg: "bg-secondary/20",
    text: "text-secondary-foreground",
    border: "border-secondary",
  },
  INVESTMENT: {
    bg: "bg-destructive/20",
    text: "text-destructive-foreground",
    border: "border-destructive",
  },
};

export const AccountCard: FC<{ account: Account }> = ({ account }) => {
  const typeStyles = typeStyleMap[account.type] || {
    bg: "bg-muted/20",
    text: "text-muted-foreground",
    border: "border-muted",
  };

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-xl)] transition-all">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-bold uppercase tracking-wider mb-1">
            {account.name}
          </h3>
          <span
            class={`inline-flex items-center gap-2 px-2 py-1 border-2 ${typeStyles.border} ${typeStyles.bg} ${typeStyles.text} text-xs font-bold uppercase tracking-wider`}
          >
            {account.type}
          </span>
        </div>
        <span class="text-muted-foreground font-mono font-bold text-sm">
          {account.currency}
        </span>
      </div>

      <div
        class={`font-mono font-bold text-3xl mb-4 ${
          account.balance >= 0
            ? "text-primary-foreground"
            : "text-destructive-foreground"
        }`}
      >
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
