// src/pages/CategoriesPage.tsx

import type { FC } from "hono/jsx";

import type { Category } from "@/generated/prisma";

import { CategoryBadge } from "@/components/categories/CategoryBadge";

interface CategoriesPageData {
  categories: Category[];
}

import type { FC } from "hono/jsx";
import type { Category } from "@/generated/prisma";
import { CategoryBadge } from "@/components/categories/CategoryBadge";

interface CategoriesPageData {
  categories: Category[];
}

const EmptyState: FC = () => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-16 text-center">
    <div class="text-6xl mb-4">🏷️</div>
    <h3 class="text-2xl font-bold uppercase tracking-wider mb-2">No Categories Yet</h3>
    <p class="text-muted-foreground mb-6">Create categories to organize your transactions.</p>
    <button
      class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
      hx-get="/categories/new"
      hx-target="#modal-content"
      hx-swap="innerHTML"
      data-toggle="modal"
      data-target="#htmx-modal"
    >
      Add Your First Category
    </button>
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
    <>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold uppercase tracking-wider">Categories</h1>
        <button
          class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
          hx-get="/categories/new"
          hx-target="#modal-content"
          hx-swap="innerHTML"
          data-toggle="modal"
          data-target="#htmx-modal"
        >
          Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <EmptyState />
      ) : (
        <div class="grid grid-cols-1 gap-6">
          {Object.entries(groupedCategories).map(([type, cats]) => (
            <div key={type} class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6">
              <h2 class="text-xl font-bold uppercase tracking-wider mb-4">{type}</h2>
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
    </>
  );
};
