import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionTable } from "@/components/transactions/TransactionsTable";
import type {
  Transaction,
  Category,
  Account,
  Recurrence,
} from "@/generated/prisma";
import type { FC } from "hono/jsx";

interface TransactionsPageData {
  transactions: (Transaction & {
    category?: Category;
    sourceAccount?: Account;
    targetAccount?: Account;
  })[];
  categories: Category[];
  accounts: Account[];
  recurrences: Recurrence[];
}

export const TransactionsPage: FC<{ data?: TransactionsPageData }> = ({
  data,
}) => {
  // Provide default values if data is undefined
  const transactions = data?.transactions || [];
  const categories = data?.categories || [];
  const accounts = data?.accounts || [];

  return (
    <>
      <h1
        className="font-bold uppercase mb-8"
        style={{ fontSize: "48px", letterSpacing: "1px" }}
      >
        Transactions
      </h1>

      {/* Add Transaction Form */}
      <TransactionForm categories={categories} accounts={accounts} />

      {/* Filters */}
      <div className="neo-card mb-8">
        <h3
          className="font-bold uppercase mb-4"
          style={{ fontSize: "18px", letterSpacing: "0.5px" }}
        >
          Filters
        </h3>
        <div className="grid grid-cols-1 grid-cols-2-md grid-cols-4-lg">
          <div>
            <label
              className="uppercase font-bold mb-2"
              style={{ display: "block", fontSize: "14px" }}
            >
              Start Date
            </label>
            <input type="date" name="startDate" className="neo-input" />
          </div>
          <div>
            <label
              className="uppercase font-bold mb-2"
              style={{ display: "block", fontSize: "14px" }}
            >
              End Date
            </label>
            <input type="date" name="endDate" className="neo-input" />
          </div>
          <div>
            <label
              className="uppercase font-bold mb-2"
              style={{ display: "block", fontSize: "14px" }}
            >
              Type
            </label>
            <select name="type" className="neo-input">
              <option value="">All Types</option>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
              <option value="TRANSFER">Transfer</option>
              <option value="PAYMENT">Payment</option>
            </select>
          </div>
          <div>
            <label
              className="uppercase font-bold mb-2"
              style={{ display: "block", fontSize: "14px" }}
            >
              Search
            </label>
            <input
              type="search"
              name="query"
              className="neo-input"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div id="transaction-table-container">
        <TransactionTable transactions={transactions} />
      </div>
    </>
  );
};
