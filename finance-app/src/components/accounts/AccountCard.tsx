// src/components/accounts/AccountCard.tsx

import type { Account } from "@/generated/prisma";

const accountTypeIcons: Record<string, string> = {
  BANK: "🏦",
  WALLET: "👛",
  CASH: "💵",
  CARD: "💳",
  INVESTMENT: "📈",
};

const accountTypeColors: Record<string, string> = {
  BANK: "bg-blue-100 text-blue-800",
  WALLET: "bg-purple-100 text-purple-800",
  CASH: "bg-green-100 text-green-800",
  CARD: "bg-orange-100 text-orange-800",
  INVESTMENT: "bg-indigo-100 text-indigo-800",
};

export function AccountCard({ account }: { account: Account }) {
  return (
    <div id={`account-${account.id}`} class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h3 class="card-title mb-1">
              <span class="me-2">{accountTypeIcons[account.type]}</span>
              {account.name}
            </h3>
            <span class={`badge ${accountTypeColors[account.type]} me-2`}>
              {account.type}
            </span>
            <span class="badge bg-secondary">{account.currency}</span>
          </div>
          <div class="text-end">
            <div class="h2 mb-0">
              {account.currency} {Number(account.balance).toFixed(2)}
            </div>
            <div class="text-muted small">Balance</div>
          </div>
        </div>
        <div class="mt-3 d-flex gap-2">
          <button
            class="btn btn-sm btn-outline-primary"
            hx-get={`/api/accounts/${account.id}`}
            hx-target="#account-modal"
            hx-swap="innerHTML"
          >
            View Details
          </button>
          <button
            class="btn btn-sm btn-outline-secondary"
            hx-get={`/api/accounts/${account.id}/edit`}
            hx-target={`#account-${account.id}`}
            hx-swap="outerHTML"
          >
            Edit
          </button>
          <button
            class="btn btn-sm btn-outline-danger"
            hx-delete={`/api/accounts/${account.id}`}
            hx-target={`#account-${account.id}`}
            hx-swap="outerHTML swap:1s"
            hx-confirm="Are you sure you want to delete this account?"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
