// src/components/expenses/ExpenseForm.tsx

import type { FC } from "hono/jsx";
import type { Category, Account, Recurrence } from "@/generated/prisma";
import { Button } from "@/components/shared/Button"; // New import
import { LoadingSpinnerIcon } from "../icons/LoadingSpinnerIcon";

interface ExpenseFormProps {
  categories?: Category[];
  accounts?: Account[];
  recurrences?: Recurrence[];
  errors?: Record<string, string>;
}

export const ExpenseForm: FC<ExpenseFormProps> = ({
  categories = [],
  accounts = [],
  recurrences = [],
  errors = {},
}) => (
  <form
    hx-post="/api/expenses"
    hx-target="#expense-list"
    hx-swap="afterbegin"
    hx-on--after-request="this.reset()"
    class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 mb-6 rounded-none"
  >
    <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
      Add Expense
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label
          for="date"
          class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
        >
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          defaultValue={new Date().toISOString().split("T")[0]}
          required
        />
        {errors.date && (
          <div class="text-destructive mt-2 text-xs">{errors.date}</div>
        )}
      </div>

      <div>
        <label
          for="amount"
          class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
        >
          Amount
        </label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold">
            $
          </span>
          <input
            type="number"
            name="amount"
            id="amount"
            step="0.01"
            min="0.01"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base text-right font-mono transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring pl-8 rounded-none"
            placeholder="0.00"
            required
          />
        </div>
        {errors.amount && (
          <div class="text-destructive mt-2 text-xs">{errors.amount}</div>
        )}
      </div>

      <div>
        <label
          for="description"
          class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
        >
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          placeholder="What was this for?"
          required
        />
        {errors.description && (
          <div class="text-destructive mt-2 text-xs">{errors.description}</div>
        )}
      </div>

      <div>
        <label
          for="type"
          class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
        >
          Type
        </label>
        <select
          name="type"
          id="type"
          class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          required
        >
          <option value="">Select...</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
          <option value="TRANSFER">Transfer</option>
          <option value="PAYMENT">Payment</option>
        </select>
        {errors.type && (
          <div class="text-destructive mt-2 text-xs">{errors.type}</div>
        )}
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
          class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
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
        <label
          for="sourceAccountId"
          class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
        >
          Account
        </label>
        <select
          name="sourceAccountId"
          id="sourceAccountId"
          class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
        >
          <option value="">None</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
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
          class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
        >
          <option value="">None</option>
          {recurrences.map((rec) => (
            <option key={rec.id} value={rec.id}>
              {rec.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    <Button type="submit" class="bg-primary text-primary-foreground mt-6">
      <LoadingSpinnerIcon class="mr-2" />
      Add Expense
    </Button>
  </form>
);
