// src/components/categories/CategoryForm.tsx

import { CategoryType, type Category } from "@/generated/prisma";

export function CategoryForm({ category }: { category?: Category }) {
  if (!category) {
    return null;
  }

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 w-full max-w-md">
      <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
        EDIT CATEGORY
      </h3>

      <form
        hx-put={`/api/categories/${category.id}`}
        hx-target="#categories-list"
        hx-swap="innerHTML"
        hx-on--after-request="if(event.detail.successful) this.closest('[x-data]').__x.$data.open = false"
        class="space-y-4"
      >
        <div>
          <label for="name" class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
            value={category.name}
            placeholder="e.g., Groceries"
          />
        </div>

        <div>
          <label for="type" class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
            Category Type
          </label>
          <select
            name="type"
            id="type"
            required
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
          >
            <option value="">SELECT TYPE...</option>
            <option
              value="EXPENSE"
              selected={category.type === CategoryType.GASTO}
            >
              EXPENSE
            </option>
            <option
              value="INCOME"
              selected={category.type === CategoryType.INGRESO}
            >
              INCOME
            </option>
            <option
              value="TRANSFER"
              selected={category.type === CategoryType.PAGO}
            >
              TRANSFER
            </option>
            <option
              value="REVENUE"
              selected={category.type === CategoryType.RENDIMIENTO}
            >
              REVENUE
            </option>
          </select>
        </div>

        <div>
          <label for="color" class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
            Color
          </label>
          <select
            name="color"
            id="color"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring"
            value={category?.color || ""}
          >
            <option value="">SELECT COLOR...</option>
            <option value="primary">PRIMARY</option>
            <option value="secondary">SECONDARY</option>
            <option value="accent">ACCENT</option>
            <option value="destructive">DESTRUCTIVE</option>
            <option value="muted">MUTED</option>
          </select>
        </div>

        <div class="flex gap-2 justify-end mt-6">
          <button
            type="button"
            data-hx-on-click="this.closest('[x-data]').__x.$data.open = false"
            class="bg-muted text-muted-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 text-base transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            CANCEL
          </button>
          <button
            type="submit"
            class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 text-base transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              class="htmx-indicator animate-spin h-5 w-5 mr-2 hidden"
              viewBox="0 0 24 24"
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
          </button>
        </div>
      </form>
    </div>
  );
}
