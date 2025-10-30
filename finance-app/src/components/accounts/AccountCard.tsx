// src/components/accounts/AccountCard.tsx

import type { Account } from "@/generated/prisma";
import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button"; // New import

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
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 rounded-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg md:text-xl font-semibold text-foreground mb-2">
            {account.name}
          </h3>
          <span
            class={`inline-flex items-center px-2 py-1 text-xs font-semibold uppercase tracking-wide rounded-none border-2 ${typeStyles.border} ${typeStyles.bg} ${typeStyles.text}`}
          >
            {account.type}
          </span>
        </div>
        <span class="font-mono font-bold">{account.currency}</span>
      </div>

      <div
        class={`font-mono font-bold text-3xl md:text-4xl ${
          Number(account.balance) >= 0
            ? "text-primary-foreground"
            : "text-destructive-foreground"
        }`}
      >
        ${Number(account.balance).toFixed(2)}
      </div>

      <div class="flex gap-2">
        <Button
          type="button"
          class="flex-1 bg-secondary text-secondary-foreground"
          hx-get={`/api/accounts/${account.id}/edit`}
          hx-target="#modal-content"
          aria-label={`Edit ${account.name}`}
        >
          Edit
        </Button>
        <Button
          type="button"
          class="bg-destructive text-destructive-foreground"
          hx-delete={`/api/accounts/${account.id}`}
          hx-confirm="Delete this account? This action cannot be undone."
          aria-label={`Delete ${account.name}`}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
