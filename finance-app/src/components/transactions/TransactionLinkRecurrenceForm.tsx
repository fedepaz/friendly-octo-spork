// src/components/transactions/TransactionLinkRecurrenceForm.tsx

import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button";
import type { AccountDTO } from "@/api/accounts/accounts.schema";
import type { CategoryDTO } from "@/api/categories/categories.schema";
import type { RecurrenceDTO } from "@/api/recurrences/recurrences.schema";
import { LoadingSpinnerIcon } from "../icons/LoadingSpinnerIcon";

interface TransactionFormProps {
  accounts: AccountDTO[];
  categories: CategoryDTO[];
  recurrence: RecurrenceDTO;
  accountSource: AccountDTO;
}

export const TransactionLinkRecurrenceForm: FC<TransactionFormProps> = ({
  accounts = [],
  categories = [],
  recurrence,
  accountSource,
}) => {
  return (
    <div
      class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none"
      x-data="{
        recurrenceMode: 'new',
        isInstallment: true,
        amountValue: '',
        totalAmount: 0,
        parts: 1,
        calculatePart() {
          if (this.isInstallment && this.parts > 0 && this.totalAmount > 0) {
            this.amountValue = (this.totalAmount / this.parts).toFixed(2);
          }
        }
      }"
    >
      <h2 class="text-2xl font-bold mb-6 uppercase tracking-tight flex items-center gap-2">
        <span class="w-2 h-8 bg-primary"></span>
        Update Recurrence With New Transaction
      </h2>

      <form
        hx-post="/transactions"
        hx-target="#transaction-list"
        hx-swap="innerHTML"
        hx-on--after-request="if(event.detail.successful) { this.reset(); htmx.trigger('#transactions-container', 'refresh'); }"
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
              <option value={recurrence.type}>{recurrence.type}</option>
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
              <option value="PAYMENT">Payment</option>
              <option value="INVESTMENT">Investment</option>
              <option value="RETURN">Return</option>
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

          {/* Amount — single input, value controlled by alpine when installment */}
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
              x-model="amountValue"
              x-bind:readonly="isInstallment"
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-ring rounded-none"
              x-bind:class="isInstallment ? 'bg-muted cursor-not-allowed' : ''"
              placeholder={recurrence.amount.toFixed(2)}
            />
            <p
              class="text-xs text-muted-foreground mt-1"
              x-show="isInstallment"
            >
              Calculated from total ÷ parts
            </p>
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
              placeholder={recurrence.name}
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
              <option value={recurrence.categoryId?.toString()}></option>
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
              <option value={accountSource.id}>{accountSource.name}</option>
              {accounts.map((a) => (
                <option value={a.id}>
                  {a.name} ({Number(a.balance).toFixed(2)} {a.currency})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Recurrence Section ── */}
        <div class="border-t-2 border-border pt-6 space-y-4">
          <p class="text-sm font-bold uppercase tracking-wider">Recurrence</p>

          {/* Create new recurrence */}
          <div
            x-show="recurrenceMode === 'new'"
            x-cloak
            class="p-4 bg-muted/20 border-2 border-border space-y-4"
            x-transition:enter="transition ease-out duration-200"
            x-transition:enter-start="opacity-0 -translate-y-2"
            x-transition:enter-end="opacity-100 translate-y-0"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold uppercase tracking-wide mb-2">
                  Recurrence Name
                </label>
                <input
                  type="text"
                  name="recurrenceName"
                  placeholder={recurrence.name}
                  value={recurrence.name}
                  class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-primary rounded-none"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold uppercase tracking-wide mb-2">
                  Frequency
                </label>
                <select
                  name="frequency"
                  x-on:change="isInstallment = ($event.target.value === 'INSTALLMENT'); if (!isInstallment) { amountValue = '' }"
                  class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base focus:outline-none focus:border-primary rounded-none"
                >
                  <option value={recurrence.frequency}>
                    {recurrence.frequency}
                  </option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="YEARLY">Yearly</option>
                  <option value="INSTALLMENT">Installment</option>
                </select>
              </div>

              {/* Installment calculator — only shown when INSTALLMENT selected */}
              <div x-show="isInstallment" x-cloak class="md:col-span-2">
                <div class="grid grid-cols-2 gap-4 p-4 border-2 border-dashed border-border bg-muted/30">
                  <div>
                    <label class="block text-sm font-semibold uppercase tracking-wide mb-2 text-primary">
                      Total Amount
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      x-model="totalAmount"
                      x-on:input="calculatePart()"
                      placeholder={recurrence.amount.toFixed(2)}
                      value={recurrence.amount.toFixed(2)}
                      class="w-full bg-card text-card-foreground border-2 border-border px-4 py-3 text-base focus:outline-none focus:border-primary rounded-none"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold uppercase tracking-wide mb-2 text-primary">
                      Number of Parts
                    </label>
                    <input
                      type="number"
                      name="totalParts"
                      x-model="parts"
                      x-on:input="calculatePart()"
                      min="1"
                      class="w-full bg-card text-card-foreground border-2 border-border px-4 py-3 text-base focus:outline-none focus:border-primary rounded-none"
                      value={recurrence.totalParts?.toString()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-4">
          <Button type="submit" class="bg-primary text-primary-foreground">
            <LoadingSpinnerIcon />
            UPDATE RECURRENCE
          </Button>
        </div>
      </form>
    </div>
  );
};
