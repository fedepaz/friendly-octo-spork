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
    class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 mb-8"
  >
    <h3 class="text-xl font-bold uppercase tracking-wider mb-6">Add Transaction</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label for="date" class="block text-sm font-semibold uppercase mb-2">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
          defaultValue={new Date().toISOString().split("T")[0]}
          required
        />
        {errors.date && <div class="text-destructive mt-2 text-xs">{errors.date}</div>}
      </div>

      <div>
        <label for="amount" class="block text-sm font-semibold uppercase mb-2">Amount</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold">$</span>
          <input
            type="number"
            name="amount"
            id="amount"
            step="0.01"
            min="0.01"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-right font-mono transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring pl-8"
            placeholder="0.00"
            required
          />
        </div>
        {errors.amount && <div class="text-destructive mt-2 text-xs">{errors.amount}</div>}
      </div>

      <div>
        <label for="description" class="block text-sm font-semibold uppercase mb-2">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
          placeholder="What was this for?"
          required
        />
        {errors.description && <div class="text-destructive mt-2 text-xs">{errors.description}</div>}
      </div>

      <div>
        <label for="type" class="block text-sm font-semibold uppercase mb-2">Type</label>
        <select
          name="type"
          id="type"
          class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
          required
        >
          <option value="">Select...</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
          <option value="TRANSFER">Transfer</option>
          <option value="PAYMENT">Payment</option>
        </select>
        {errors.type && <div class="text-destructive mt-2 text-xs">{errors.type}</div>}
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <label for="categoryId" class="block text-sm font-semibold uppercase mb-2">Category</label>
        <select
          name="categoryId"
          id="categoryId"
          class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
        >
          <option value="">None</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label for="sourceAccountId" class="block text-sm font-semibold uppercase mb-2">Account</label>
        <select
          name="sourceAccountId"
          id="sourceAccountId"
          class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
        >
          <option value="">None</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    <button
      type="submit"
      class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed mt-6"
    >
      <svg
        class="htmx-indicator animate-spin h-5 w-5 mr-2 hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      Add Transaction
    </button>
  </form>
);
