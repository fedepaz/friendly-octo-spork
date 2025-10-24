// src/pages/AccountsPage.tsx

import type { FC } from "hono/jsx";

import type { Account } from "@/generated/prisma";
import { AccountCard } from "@/components/accounts/AccountCard";

interface AccountsPageData {
  accounts: Account[];
}

export const AccountsPage: FC<AccountsPageData> = ({ accounts }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <h1
          className="font-bold uppercase"
          style={{ fontSize: "48px", letterSpacing: "1px" }}
        >
          Accounts
        </h1>
        <button className="neo-btn neo-btn-primary">Add Account</button>
      </div>

      {accounts.length === 0 ? (
        <div className="neo-card text-center" style={{ padding: "64px 24px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>💳</div>
          <h3 className="font-bold uppercase mb-2" style={{ fontSize: "24px" }}>
            No Accounts Yet
          </h3>
          <p className="text-muted mb-6" style={{ fontSize: "16px" }}>
            Create your first account to start tracking your finances.
          </p>
          <button className="neo-btn neo-btn-primary">
            Add Your First Account
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 grid-cols-2-md grid-cols-3-md">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      )}

      <div id="modal-content"></div>
    </>
  );
};
