// src/components/accounts/AccountForm.tsx

import { Button } from "@/components/shared/Button"; // New import

export function AccountForm() {
  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 w-full max-w-md rounded-none">
      <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
        CREATE NEW ACCOUNT
      </h3>

      <form
        hx-post="/api/accounts"
        hx-target="#accounts-list"
        hx-swap="innerHTML"
        hx-on--after-request="if(event.detail.successful) this.closest('[x-data]').__x.$data.open = false"
        class="space-y-4"
      >
        <div>
          <label for="name" class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
            Account Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
            placeholder="e.g., Main Checking"
          />
        </div>

        <div>
          <label for="type" class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
            Account Type
          </label>
          <select
            name="type"
            id="type"
            required
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          >
            <option value="">SELECT TYPE...</option>
            <option value="BANK">BANK ACCOUNT</option>
            <option value="WALLET">DIGITAL WALLET</option>
            <option value="CASH">CASH</option>
            <option value="CARD">CREDIT CARD</option>
            <option value="INVESTMENT">INVESTMENT</option>
          </select>
        </div>

        <div>
          <label
            for="currency"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Currency
          </label>
          <select
            name="currency"
            id="currency"
            required
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          >
            <option value="">SELECT CURRENCY...</option>
            <option value="ARS">ARS (ARGENTINE PESO)</option>
            <option value="USD">USD (US DOLLAR)</option>
            <option value="USDT">USDT (TETHER)</option>
          </select>
        </div>

        <div>
          <label
            for="balance"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Initial Balance
          </label>
          <input
            type="number"
            name="balance"
            id="balance"
            step="0.01"
            required
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
            placeholder="0.00"
          />
        </div>

        <div class="flex gap-2 justify-end mt-6">
          <Button
            type="button"
            onClick="this.closest('[x-data]').__x.$data.open = false" // Using onClick for Alpine.js
            class="bg-muted text-muted-foreground"
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            class="bg-primary text-primary-foreground"
          >
            <svg
              class="htmx-indicator animate-spin h-5 w-5 mr-2 hidden"
              viewBox="0 0 24 24"
              aria-label="Loading" // Added aria-label for accessibility
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            SAVE
          </Button>
        </div>
      </form>
    </div>
  );
}
