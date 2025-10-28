// src/components/categories/CategoriesList.tsx

import type { Category } from "@/generated/prisma";
import { CategoryBadge } from "./CategoryBadge";

import type { FC } from "hono/jsx";

const EmptyState: FC = () => (
  <div id="categories-list" class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-12 text-center">
    <div class="text-6xl mb-4">📋</div>
    <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">NO CATEGORIES YET</h3>
    <p class="text-muted-foreground mb-6">CREATE YOUR FIRST CATEGORY TO START TRACKING YOUR FINANCES.</p>
    <button
      class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
      hx-get="/api/categories/new"
      hx-target="#modal-content"
      hx-swap="innerHTML"
      data-toggle="modal"
      data-target="#htmx-modal"
    >
      CREATE CATEGORY
    </button>
  </div>
);

const CategoryCard: FC<{ category: Category }> = ({ category }) => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl md:text-2xl font-semibold text-foreground mb-2">
          <CategoryBadge category={category} />
        </h3>
        <span class="inline-flex items-center bg-muted text-muted-foreground px-2 py-1 text-xs font-semibold uppercase tracking-wide">{category.type}</span>
      </div>
    </div>
  </div>
);

export function CategoriesList({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return <EmptyState />;
  }

  return (
    <div id="categories-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard category={category} />
      ))}
    }
  </div>
);
}
