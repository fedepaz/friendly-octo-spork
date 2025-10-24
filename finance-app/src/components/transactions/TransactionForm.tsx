// src/components/transactions/TransactionForm.tsx

import type { FC } from "hono/jsx";
import type {
  Transaction,
  Category,
  Account,
  Recurrence,
} from "@/generated/prisma";

interface TransactionFormProps {
  categories: Category[];
  accounts: Account[];

  errors?: Record<string, string>;
}

export const TransactionForm: FC<TransactionFormProps> = ({
  categories = [],
  accounts = [],
  errors = {},
}) => (
  <form
    hx-post="/api/transactions"
    hx-target="#transaction-list"
    hx-swap="afterbegin"
    hx-on--after-request="this.reset()"
    className="neo-card mb-8"
  >
    <h3
      className="font-bold uppercase mb-6"
      style={{ fontSize: "20px", letterSpacing: "0.5px" }}
    >
      Add Transaction
    </h3>

    <div className="grid grid-cols-1 grid-cols-2-md grid-cols-4-lg">
      {/* Date */}
      <div>
        <label
          className="uppercase font-bold mb-2"
          style={{ display: "block", fontSize: "14px", letterSpacing: "0.5px" }}
        >
          Date
        </label>
        <input
          type="date"
          name="date"
          className="neo-input"
          defaultValue={new Date().toISOString().split("T")[0]}
          required
        />
        {errors.date && (
          <div className="text-destructive mt-2" style={{ fontSize: "12px" }}>
            {errors.date}
          </div>
        )}
      </div>

      {/* Amount */}
      <div>
        <label
          className="uppercase font-bold mb-2"
          style={{ display: "block", fontSize: "14px", letterSpacing: "0.5px" }}
        >
          Amount
        </label>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-mono)",
              fontWeight: "700",
            }}
          >
            $
          </span>
          <input
            type="number"
            name="amount"
            step="0.01"
            min="0.01"
            className="neo-input text-right text-mono"
            style={{ paddingLeft: "32px" }}
            placeholder="0.00"
            required
          />
        </div>
        {errors.amount && (
          <div className="text-destructive mt-2" style={{ fontSize: "12px" }}>
            {errors.amount}
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          className="uppercase font-bold mb-2"
          style={{ display: "block", fontSize: "14px", letterSpacing: "0.5px" }}
        >
          Description
        </label>
        <input
          type="text"
          name="description"
          className="neo-input"
          placeholder="What was this for?"
          required
        />
        {errors.description && (
          <div className="text-destructive mt-2" style={{ fontSize: "12px" }}>
            {errors.description}
          </div>
        )}
      </div>

      {/* Type */}
      <div>
        <label
          className="uppercase font-bold mb-2"
          style={{ display: "block", fontSize: "14px", letterSpacing: "0.5px" }}
        >
          Type
        </label>
        <select name="type" className="neo-input" required>
          <option value="">Select...</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
          <option value="TRANSFER">Transfer</option>
          <option value="PAYMENT">Payment</option>
        </select>
        {errors.type && (
          <div className="text-destructive mt-2" style={{ fontSize: "12px" }}>
            {errors.type}
          </div>
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 grid-cols-2-md mt-4">
      {/* Category */}
      <div>
        <label
          className="uppercase font-bold mb-2"
          style={{ display: "block", fontSize: "14px", letterSpacing: "0.5px" }}
        >
          Category
        </label>
        <select name="categoryId" className="neo-input">
          <option value="">None</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Account */}
      <div>
        <label
          className="uppercase font-bold mb-2"
          style={{ display: "block", fontSize: "14px", letterSpacing: "0.5px" }}
        >
          Account
        </label>
        <select name="sourceAccountId" className="neo-input">
          <option value="">None</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    <button type="submit" className="neo-btn neo-btn-primary mt-6">
      <svg
        className="htmx-indicator animate-spin"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      Add Transaction
    </button>
  </form>
);
