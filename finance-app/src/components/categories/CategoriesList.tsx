// src/components/categories/CategoriesList.tsx

import type { Category } from "@/generated/prisma";
import { CategoryBadge } from "./CategoryBadge";

import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button"; // New import
import { Icon } from "@/components/shared/Icon"; // New import

const EmptyState: FC = () => (
  <div
    id="categories-list"
    class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-12 text-center rounded-none"
  >
    <Icon name="clipboard" class="text-6xl mb-4" aria-label="No categories icon" />
    <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
      NO CATEGORIES YET
    </h3>
    <p class="text-muted-foreground">
      CREATE YOUR FIRST CATEGORY TO START TRACKING YOUR FINANCES.
    </p>
    <Button
      type="button" // Explicitly set type to "button"
      hxGet="/api/categories/new"
      hxTarget="#modal-content"
      hxSwap="innerHTML"
      dataToggle="modal"
      dataTarget="#htmx-modal"
    >
      CREATE CATEGORY
    </Button>
  </div>
);

const CategoryCard: FC<{ category: Category }> = ({ category }) => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 rounded-none
    transition-all duration-150
    hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
  >
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl md:text-2xl font-semibold text-foreground mb-2">
          <CategoryBadge category={category} />
        </h3>
        <span class="inline-flex items-center bg-muted text-muted-foreground px-2 py-1 text-xs font-semibold uppercase tracking-wide rounded-none">
          {category.type}
        </span>
      </div>
    </div>
  </div>
);

export function CategoriesList({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      id="categories-list"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {categories.map((category) => (
        <CategoryCard category={category} />
      ))}
    </div>
  );
}
