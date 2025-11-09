// src/components/transactions/TransactionForm.tsx

import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button";

interface TransactionFormProps {
  transactionType: string;
}

export const TransactionForm: FC<TransactionFormProps> = ({
  transactionType,
}) => {
  return (
    <div class="mt-8 bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6">
      <h2 class="text-2xl font-bold mb-4">Add New Transaction</h2>
      <form
        hx-post={`/${transactionType}`}
        hx-target="#transaction-list"
        hx-swap="afterbegin"
      >
        {/* Form fields here - can be customized per transaction type if needed */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Amount */}
          <div>
            <label class="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              step="0.01"
              required
              class="w-full p-2 border-2 border-border"
            />
          </div>

          {/* Date */}
          <div>
            <label class="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              name="date"
              required
              class="w-full p-2 border-2 border-border"
            />
          </div>

          {/* Description */}
          <div class="md:col-span-2">
            <label class="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              name="description"
              class="w-full p-2 border-2 border-border"
            />
          </div>

          {/* Category */}
          <div>
            <label class="block text-sm font-medium mb-2">Category</label>
            <select name="categoryId" class="w-full p-2 border-2 border-border">
              <option value="">Select category</option>
              {/* Categories would be passed as props */}
            </select>
          </div>

          {/* Source Account */}
          <div>
            <label class="block text-sm font-medium mb-2">Source Account</label>
            <select
              name="sourceAccountId"
              class="w-full p-2 border-2 border-border"
            >
              <option value="">Select account</option>
              {/* Accounts would be passed as props */}
            </select>
          </div>
        </div>

        <Button type="submit" class="mt-4">
          Add Transaction
        </Button>
      </form>
    </div>
  );
};
