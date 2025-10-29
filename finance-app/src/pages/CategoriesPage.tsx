// src/pages/CategoriesPage.tsx

import { CategoryBadge } from "@/components/categories/CategoryBadge";
import Layout from "@/components/shared/Layout";
import { Button } from "@/components/shared/Button"; // New import
import { Icon } from "@/components/shared/Icon"; // New import
import type { Category } from "@/generated/prisma";
import type { FC } from "hono/jsx";

interface CategoriesPageData {
  categories: Category[];
}

const EmptyState: FC = () => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-12 text-center rounded-none">
    <Icon name="tag" class="text-6xl mb-4" aria-label="No categories icon" />

    <h3 class="text-2xl md:text-3xl font-bold mb-2">
      No Categories Yet
    </h3>

    <p class="text-muted-foreground mb-6">
      Create categories to organize your transactions.
    </p>

    <Button
      type="button" // Explicitly set type to "button"
      hxGet="/categories/new"
      hxTarget="#modal-content"
      hxSwap="innerHTML"
      dataToggle="modal"
      dataTarget="#htmx-modal"
    >
      Add Your First Category
    </Button>
  </div>
);

export const CategoriesPage: FC<{ data?: CategoriesPageData }> = ({ data }) => {
  const categories = data?.categories || [];
  const groupedCategories = categories.reduce((acc, cat) => {
    if (!acc[cat.type]) acc[cat.type] = [];
    acc[cat.type].push(cat);
    return acc;
  }, {} as Record<string, Category[]>);

  return (
    <Layout activeNavItem="/categories">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">Categories</h1>
        <Button
          type="button" // Explicitly set type to "button"
          hxGet="/categories/new"
          hxTarget="#modal-content"
          hxSwap="innerHTML"
          dataToggle="modal"
          dataTarget="#htmx-modal"
        >
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <EmptyState />
      ) : (
        <div class="grid grid-cols-1 gap-6">
          {Object.entries(groupedCategories).map(([type, cats]) => (
            <div
              key={type}
              class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none
                transition-all duration-150
                hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
            >
              <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {type}
              </h2>
              <div class="flex flex-wrap gap-3">
                {cats.map((cat) => (
                  <CategoryBadge key={cat.id} category={cat} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div id="modal-content"></div>
    </Layout>
  );
};
