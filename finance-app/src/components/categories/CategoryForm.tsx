// src/components/categories/CategoryForm.tsx

import type { FC } from "hono/jsx";
import type { Category } from "@/generated/prisma";
import { Button } from "@/components/shared/Button";
import { LoadingSpinnerIcon } from "@/components/icons/LoadingSpinnerIcon";

interface CategoryFormProps {
  category?: Category;
}

export const CategoryForm: FC<CategoryFormProps> = ({ category }) => {
  if (!category) {
    return null;
  }

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 w-full max-w-md rounded-none">
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
          <label
            for="name"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Category Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
            value={category.name}
            placeholder="e.g., Groceries"
          />
        </div>

        <div>
          <label
            for="color"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Color
          </label>
          <select
            name="color"
            id="color"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
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
          <Button
            type="button" // Explicitly set type to "button"
            hx-on:click="this.closest('[x-data]').__x.$data.open = false" // Using onClick for Alpine.js
            class="bg-muted text-muted-foreground"
          >
            CANCEL
          </Button>
          <Button type="submit" class="bg-primary text-primary-foreground">
            <LoadingSpinnerIcon />
            SAVE
          </Button>
        </div>
      </form>
    </div>
  );
};

