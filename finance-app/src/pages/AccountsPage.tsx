// src/pages/AccountsPage.tsx

import type { FC } from "hono/jsx";

import type { Account } from "@/generated/prisma";
import { AccountsList } from "@/components/accounts/AccountsList";

interface AccountsPageProps {
  accounts: Account[];
}

export const AccountsPage: FC<AccountsPageProps> = ({ accounts }) => {
  return (
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
  );
};
