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

const Filters: FC = () => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 mb-8">
    <h3 class="text-lg font-bold uppercase tracking-wider mb-4">Filters</h3>
    <form
      hx-get="/transactions"
      hx-target="#transaction-table-container"
      hx-swap="outerHTML"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <div>
        <label for="startDate" class="block text-sm font-semibold uppercase mb-2">Start Date</label>
        <input type="date" name="startDate" id="startDate" class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring" />
      </div>
      <div>
        <label for="endDate" class="block text-sm font-semibold uppercase mb-2">End Date</label>
        <input type="date" name="endDate" id="endDate" class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring" />
      </div>
      <div>
        <label for="type" class="block text-sm font-semibold uppercase mb-2">Type</label>
        <select name="type" id="type" class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring">
          <option value="">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
          <option value="TRANSFER">Transfer</option>
          <option value="PAYMENT">Payment</option>
        </select>
      </div>
      <div>
        <label for="query" class="block text-sm font-semibold uppercase mb-2">Search</label>
        <input type="search" name="query" id="query" class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring" placeholder="Search..." />
      </div>
    </form>
  </div>
);

export const TransactionsPage: FC<{ data?: TransactionsPageData }> = ({ data }) => {
  const transactions = data?.transactions || [];
  const categories = data?.categories || [];
  const accounts = data?.accounts || [];

  return (
    <>
      <h1 class="text-4xl font-bold uppercase tracking-wider mb-8">Transactions</h1>

      <TransactionForm categories={categories} accounts={accounts} />

      <Filters />

      <div id="transaction-table-container">
        <TransactionTable transactions={transactions} />
      </div>
    </>
  );
};
