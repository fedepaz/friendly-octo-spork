// src/pages/AccountsPage.tsx

import type { FC } from "hono/jsx";

import type { Account } from "@/generated/prisma";
import { AccountsList } from "@/components/accounts/AccountsList";

interface AccountsPageProps {
  accounts: Account[];
}

export const AccountsPage: FC<AccountsPageProps> = ({ accounts }) => {
  return (
    <>
      <div class="neo-card p-6 mb-4">
        <h1 class="text-2xl font-bold mb-4">Finance Dashboard</h1>
        <div class="flex gap-2 mb-4">
          <button class="neo-btn">Primary Action</button>
          <button class="neo-btn neo-btn-secondary">Secondary</button>
          <button class="neo-btn neo-btn-accent">Accent</button>
        </div>
        <input
          type="text"
          class="neo-input w-full"
          placeholder="Enter amount..."
        />
      </div>

      <div class="bg-neo-card text-neo-foreground border-neo border-2 shadow-neo p-6 rounded-none">
        <h2 class="text-xl font-bold">Another Card</h2>
        <p class="mt-2">This uses the theme variables via Tailwind classes.</p>
      </div>
      <div class="container-xl">
        <div class="page-header d-print-none">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="page-title">Accounts</h2>
            </div>
          </div>
        </div>
        <div class="page-body">
          <AccountsList accounts={accounts} />
        </div>

        {/* Modal container for HTMX */}
        <div
          id="modals-here"
          class="modal modal-blur fade"
          style="display: none"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div class="modal-content"></div>
          </div>
        </div>
      </div>
    </>
  );
};
