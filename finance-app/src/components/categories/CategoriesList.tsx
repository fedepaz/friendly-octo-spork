// src/components/categories/CategoriesList.tsx

import type { Category } from "@/generated/prisma";
import { CategoryBadge } from "./CategoryBadge";

export function CategoriesList({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return (
      <div id="categories-list" class="neo-card text-center p-12">
        <div class="text-6xl mb-4">📋</div>
        <h3 class="text-2xl font-bold mb-2">NO CATEGORIES YET</h3>
        <p class="text-muted-foreground mb-6">
          CREATE YOUR FIRST CATEGORY TO START TRACKING YOUR FINANCES.
        </p>
        <button 
          class="neo-btn bg-primary text-primary-foreground"
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
  }

  return (
    <div id="categories-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div class="neo-card">
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-xl font-bold mb-2">
                  <CategoryBadge category={category} />
                </h3>
                <span class="inline-block bg-muted text-muted-foreground px-2 py-1 text-xs font-bold uppercase">{category.type}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
