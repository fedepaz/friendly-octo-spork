// src/components/accounts/AccountCard.tsx

import type { Account } from "@/generated/prisma";
import type { FC } from "hono/jsx";

export const AccountCard: FC<{ account: Account }> = ({ account }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "BANK":
        return "accent";
      case "CASH":
        return "success";
      case "CARD":
        return "primary";
      case "INVESTMENT":
        return "secondary";
      default:
        return "muted";
    }
  };

  return (
    <div className="neo-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <div>
          <h3
            className="font-bold uppercase"
            style={{
              fontSize: "18px",
              letterSpacing: "0.5px",
              marginBottom: "4px",
            }}
          >
            {account.name}
          </h3>
          <span
            className={`text-${getTypeColor(account.type)}`}
            style={{
              padding: "2px 8px",
              border: "2px solid currentColor",
              fontSize: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {account.type}
          </span>
        </div>
        <span
          className="text-muted text-mono font-bold"
          style={{ fontSize: "14px" }}
        >
          {account.currency}
        </span>
      </div>

      <div
        className={`text-mono font-bold ${
          account.balance >= 0 ? "text-success" : "text-destructive"
        }`}
        style={{ fontSize: "32px", marginBottom: "16px" }}
      >
        ${Math.abs(account.balance).toFixed(2)}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          className="neo-btn neo-btn-small neo-btn-secondary"
          hx-get={`/api/accounts/${account.id}/edit`}
          hx-target="#modal-content"
          style={{ flex: 1 }}
        >
          Edit
        </button>
        <button
          className="neo-btn neo-btn-small neo-btn-destructive"
          hx-delete={`/api/accounts/${account.id}`}
          hx-confirm="Delete this account? This action cannot be undone."
        >
          Delete
        </button>
      </div>
    </div>
  );
};
