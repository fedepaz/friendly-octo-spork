// src/components/transactions/TransactionForm.tsx

import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button";
import type { AccountDTO } from "@/api/accounts/accounts.schema";
import type { CategoryDTO } from "@/api/categories/categories.schema";

interface TransactionFormProps {
  transactionType: string;
  accounts: AccountDTO[];
  categories: CategoryDTO[];
}

export const TransactionForm: FC<TransactionFormProps> = ({
  transactionType,
  accounts = [],
  categories = [],
}) => {
  // Map internal type names to Prisma enum values
  const typeMap: Record<string, string> = {
    expenses: "EXPENSE",
    incomes: "INCOME",
    payments: "PAYMENT",
    investments: "INVESTMENT",
    returns: "RETURN",
    transfers: "TRANSFER",
  };

  const prismaType = typeMap[transactionType] || "EXPENSE";

  return (
    <div
      class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none"
      x-data="{ 
        isRecurrence: false, 
        isInstallment: false,
        amount: 0,
        parts: 1,
        totalAmount: 0,
        calculatePart() { 
          if (this.isInstallment && this.parts > 0) {
            this.amount = (this.totalAmount / this.parts).toFixed(2);
          }
        },
        calculateTotal() {
          if (this.isInstallment && this.parts > 0) {
            this.totalAmount = (this.amount * this.parts).toFixed(2);
          }
        }
      }"
    >
      <h2 class="text-2xl font-bold mb-6 uppercase tracking-tight flex items-center gap-2">
        <span class="w-2 h-8 bg-primary"></span>
        Add New {transactionType.slice(0, -1)}
      </h2>

      <form
        hx-post={`/transactions`}
        hx-target="#transaction-list"
        hx-swap="afterbegin"
        hx-on--after-request="if(event.detail.successful) { this.reset(); htmx.trigger('#transactions-container', 'refresh'); }"
        class="space-y-6"
      >
        <input type="hidden" name="type" value={prismaType} />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amount Section */}
          <div class="space-y-4">
            <div x-show="!isInstallment">
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
                required={true}
                x-model="amount"
                x-bind:disabled="isInstallment"
                class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
                placeholder="0.00"
              />
            </div>

            <div
              x-show="isInstallment"
              class="space-y-4 p-4 border-2 border-dashed border-border bg-muted/30"
              x-cloak
            >
              <div>
                <label class="block text-sm font-semibold uppercase tracking-wide mb-2 text-primary">
                  Total Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  x-model="totalAmount"
                  x-on:input="calculatePart()"
                  class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-primary rounded-none"
                  placeholder="e.g., 60000"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold uppercase tracking-wide mb-2 text-primary">
                    Parts
                  </label>
                  <input
                    type="number"
                    x-model="parts"
                    x-on:input="calculatePart()"
                    min="1"
                    class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-primary rounded-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold uppercase tracking-wide mb-2 text-primary">
                    Monthly Part
                  </label>
                  <div class="w-full bg-muted text-muted-foreground border-2 border-border shadow-inner px-4 py-3 text-base rounded-none cursor-not-allowed font-mono">
                    <span x-text="amount"></span>
                  </div>
                  <input
                    type="hidden"
                    name="amount"
                    x-bind:value="amount"
                    x-bind:disabled="!isInstallment"
                  />
                </div>
              </div>
            </div>
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
              required={true}
              value={new Date().toISOString().split("T")[0]}
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
            />
          </div>

          {/* Description */}
          <div class="md:col-span-2">
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
              required={true}
              placeholder="What was this for?"
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
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
              required={true}
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option value={c.id}>{c.name}</option>
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
              required={true}
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
            >
              <option value="">Select account</option>
              {accounts.map((a) => (
                <option value={a.id}>
                  {a.name} ({Number(a.balance).toFixed(2)} {a.currency})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recurrence Toggle */}
        <div class="border-t-2 border-border pt-6 mt-6">
          <label class="inline-flex items-center cursor-pointer group">
            <input
              type="checkbox"
              name="isRecurrence"
              x-model="isRecurrence"
              class="sr-only"
            />
            <div class="relative w-14 h-8 bg-muted border-2 border-border transition-colors duration-200 group-hover:border-primary">
              <div
                class="absolute left-1 top-1 w-5 h-5 bg-foreground transition-transform duration-200"
                x-bind:class="isRecurrence ? 'translate-x-6 bg-primary' : ''"
              ></div>
            </div>
            <span class="ml-3 text-sm font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
              Make this a recurrence
            </span>
          </label>

          <div
            x-show="isRecurrence"
            x-transition:enter="transition ease-out duration-200"
            x-transition:enter-start="opacity-0 -translate-y-2"
            x-transition:enter-end="opacity-100 translate-y-0"
            class="mt-4 p-6 bg-muted/20 border-2 border-border space-y-4"
            x-cloak
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold uppercase tracking-wide mb-2">
                  Frequency
                </label>
                <select
                  name="frequency"
                  x-on:change="isInstallment = ($event.target.value === 'INSTALLMENT'); calculatePart()"
                  class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-primary rounded-none"
                >
                  <option value="MONTHLY">MONTHLY</option>
                  <option value="WEEKLY">WEEKLY</option>
                  <option value="YEARLY">YEARLY</option>
                  <option value="INSTALLMENT">INSTALLMENT</option>
                </select>
              </div>

              <div x-show="isInstallment" x-cloak>
                <label class="block text-sm font-semibold uppercase tracking-wide mb-2">
                  Total Parts
                </label>
                <input
                  type="number"
                  name="totalParts"
                  x-model="parts"
                  x-on:input="calculatePart()"
                  min="1"
                  class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-primary rounded-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-4">
          <Button
            type="submit"
            class="w-full md:w-auto bg-primary text-primary-foreground font-bold uppercase tracking-widest"
          >
            ADD {transactionType.slice(0, -1).toUpperCase()}
          </Button>
        </div>
      </form>
    </div>
  );
};
