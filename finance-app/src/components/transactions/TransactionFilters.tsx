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
    <div class="neo-card p-6 mb-6">
      <h3 class="text-xl font-bold uppercase mb-4">FILTER TRANSACTIONS</h3>
      <form
        hx-get="/api/transactions"
        hx-target="#transactions-list"
        hx-swap="innerHTML"
        hx-trigger="change, keyup delay:300ms"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div>
          <label class="block text-sm font-semibold uppercase mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            class="neo-input w-full bg-card text-card-foreground"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold uppercase mb-2">End Date</label>
          <input
            type="date"
            name="endDate"
            class="neo-input w-full bg-card text-card-foreground"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold uppercase mb-2">Type</label>
          <select
            name="type"
            class="neo-input w-full bg-card text-card-foreground"
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
          <label class="block text-sm font-semibold uppercase mb-2">Category</label>
          <select
            name="categoryId"
            class="neo-input w-full bg-card text-card-foreground"
          >
            <option value="">ALL CATEGORIES</option>
            {categories.map((cat) => (
              <option value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold uppercase mb-2">Source Account</label>
          <select
            name="sourceAccountId"
            class="neo-input w-full bg-card text-card-foreground"
          >
            <option value="">ALL SOURCE ACCOUNTS</option>
            {accounts.map((acc) => (
              <option value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold uppercase mb-2">Target Account</label>
          <select
            name="targetAccountId"
            class="neo-input w-full bg-card text-card-foreground"
          >
            <option value="">ALL TARGET ACCOUNTS</option>
            {accounts.map((acc) => (
              <option value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold uppercase mb-2">Recurrence</label>
          <select
            name="recurrenceId"
            class="neo-input w-full bg-card text-card-foreground"
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
