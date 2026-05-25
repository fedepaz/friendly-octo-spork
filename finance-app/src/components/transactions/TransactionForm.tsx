// src/components/transactions/TransactionForm.tsx

import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button";
import type { AccountDTO } from "@/api/accounts/accounts.schema";
import type { CategoryDTO } from "@/api/categories/categories.schema";
import type { RecurrenceDTO } from "@/api/recurrences/recurrences.schema";
import { LoadingSpinnerIcon } from "../icons/LoadingSpinnerIcon";

interface TransactionFormProps {
  accounts: AccountDTO[];
  categories: CategoryDTO[];
}

export const TransactionForm: FC<TransactionFormProps> = ({
  accounts = [],
  categories = [],
}) => {
  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none">
      <h2 class="text-2xl font-bold mb-6 uppercase tracking-tight flex items-center gap-2">
        <span class="w-2 h-8 bg-primary"></span>
        Add New Transaction
      </h2>

      <form
        hx-post="/transactions"
        hx-swap="innerHTML"
        hx-on--after-request="if(event.detail.successful) { this.reset(); }"
        class="space-y-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transaction Type */}
          <div>
            <label class="block text-sm font-semibold uppercase tracking-wide mb-2">
              Transaction Type
            </label>
            <select
              name="type"
              required
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-primary rounded-none"
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
              <option value="PAYMENT">Payment</option>
              <option value="INVESTMENT">Investment</option>
              <option value="RETURN">Return</option>
              <option value="TRANSFER">Transfer</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label
              for="date"
              class="block text-sm font-semibold uppercase tracking-wide mb-2"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              required
              value={new Date().toISOString().split("T")[0]}
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-ring rounded-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label
              for="amount"
              class="block text-sm font-semibold uppercase tracking-wide mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              step="0.01"
              required
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-ring rounded-none"
              placeholder="0.00"
            />
          </div>

          {/* Description */}
          <div>
            <label
              for="description"
              class="block text-sm font-semibold uppercase tracking-wide mb-2"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              required
              placeholder="What was this for?"
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-ring rounded-none"
            />
          </div>

          {/* Category */}
          <div>
            <label
              for="categoryId"
              class="block text-sm font-semibold uppercase tracking-wide mb-2"
            >
              Category
            </label>
            <select
              name="categoryId"
              id="categoryId"
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-ring rounded-none"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Source Account */}
          <div>
            <label
              for="sourceAccountId"
              class="block text-sm font-semibold uppercase tracking-wide mb-2"
            >
              Source Account
            </label>
            <select
              name="sourceAccountId"
              id="sourceAccountId"
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-ring rounded-none"
            >
              <option value="">Select account</option>
              {accounts.map((a) => (
                <option value={a.id}>
                  {a.name} ({Number(a.balance).toFixed(2)} {a.currency})
                </option>
              ))}
            </select>
          </div>

          {/* Target Account — for transfers */}
          <div class="md:col-span-2">
            <label
              for="targetAccountId"
              class="block text-sm font-semibold uppercase tracking-wide mb-2"
            >
              Target Account{" "}
              <span class="text-muted-foreground font-normal normal-case">
                (transfers only)
              </span>
            </label>
            <select
              name="targetAccountId"
              id="targetAccountId"
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-ring rounded-none"
            >
              <option value="">None</option>
              {accounts.map((a) => (
                <option value={a.id}>
                  {a.name} ({Number(a.balance).toFixed(2)} {a.currency})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div class="flex justify-end pt-4">
          <Button type="submit" class="bg-primary text-primary-foreground">
            <LoadingSpinnerIcon />
            ADD TRANSACTION
          </Button>
        </div>
      </form>
    </div>
  );
};
