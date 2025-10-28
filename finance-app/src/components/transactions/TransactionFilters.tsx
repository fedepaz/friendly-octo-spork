// src/components/transactions/TransactionFilters.tsx

import type { FC } from "hono/jsx";
import type { Category, Account, Recurrence } from "@/generated/prisma";

interface TransactionFiltersProps {
  categories: Category[];
  accounts: Account[];
  recurrences: Recurrence[];
}

export const TransactionFilters: FC<TransactionFiltersProps> = ({
  categories,
  accounts,
  recurrences,
}) => {
  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 mb-6">
      <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
        FILTER TRANSACTIONS
      </h3>
      <form
        hx-get="/api/transactions"
        hx-target="#transactions-list"
        hx-swap="innerHTML"
        hx-trigger="change, keyup delay:300ms"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div>
          <label
            for="startDate"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
          />
        </div>
        <div>
          <label
            for="endDate"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
          />
        </div>
        <div>
          <label for="type" class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
            Type
          </label>
          <select
            name="type"
            id="type"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
          >
            <option value="">ALL TYPES</option>
            <option value="INCOME">INCOME</option>
            <option value="EXPENSE">EXPENSE</option>
            <option value="TRANSFER">TRANSFER</option>
            <option value="INVESTMENT">INVESTMENT</option>
            <option value="RETURN">RETURN</option>
            <option value="PAYMENT">PAYMENT</option>
          </select>
        </div>
        <div>
          <label
            for="categoryId"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Category
          </label>
          <select
            name="categoryId"
            id="categoryId"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
          >
            <option value="">ALL CATEGORIES</option>
            {categories.map((cat) => (
              <option value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label
            for="sourceAccountId"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Source Account
          </label>
          <select
            name="sourceAccountId"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
          >
            <option value="">ALL SOURCE ACCOUNTS</option>
            {accounts.map((acc) => (
              <option value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label
            for="targetAccountId"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Target Account
          </label>
          <select
            name="targetAccountId"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
          >
            <option value="">ALL TARGET ACCOUNTS</option>
            {accounts.map((acc) => (
              <option value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label
            for="recurrenceId"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Recurrence
          </label>
          <select
            name="recurrenceId"
            id="recurrenceId"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
          >
            <option value="">ALL RECURRENCES</option>
            {recurrences.map((rec) => (
              <option value={rec.id}>{rec.name}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};
