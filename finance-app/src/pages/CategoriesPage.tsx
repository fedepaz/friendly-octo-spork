// src/pages/CategoriesPage.tsx

import { CategoryBadge } from "@/components/categories/CategoryBadge";
import Layout from "@/components/shared/Layout";
import { Button } from "@/components/shared/Button";
import { TagIcon } from "@/components/icons/TagIcon";
import type { Category } from "@/generated/prisma";
import type { FC } from "hono/jsx";

interface CategoriesPageData {
  categories: Category[];
}

const EmptyState: FC = () => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-12 text-center rounded-none">
    <TagIcon class="text-6xl mb-4" aria-label="No categories icon" />
    <h3 class="text-2xl md:text-3xl font-bold mb-2">No Categories Yet</h3>

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

interface CategoriesPageProps {
  data?: CategoriesPageData;
}

export const CategoriesPage: FC<CategoriesPageProps> = ({ data }) => {
  const categories = data?.categories || [];

  return (
    <Layout activeNavItem="/categories">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Categories
        </h1>
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map((cats) => (
            <div class="flex flex-wrap gap-3">
              {cats.map((cat) => (
                <CategoryBadge key={cat.id} category={cat} />
              ))}
            </div>
          ))}
        </div>
      )}

      <div id="modal-content"></div>
    </Layout>
  );
};
