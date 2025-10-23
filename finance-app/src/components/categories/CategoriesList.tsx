// src/components/categories/CategoriesList.tsx

import type { Category } from "@/generated/prisma";
import { CategoryBadge } from "./CategoryBadge";

export function CategoriesList({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return (
      <div id="categories-list" class="text-center py-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-lg text-muted mb-3"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="7" y1="15" x2="7.01" y2="15" />
          <line x1="11" y1="15" x2="13" y2="15" />
        </svg>
        <h3 class="text-muted">No categories yet</h3>
        <p class="text-muted">
          Create your first category to start tracking your finances.
        </p>
      </div>
    );
  }

  return (
    <div id="categories-list" class="row row-cards">
      {categories.map((category) => (
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h3 class="card-title mb-1">
                    <span class="me-2">
                      <CategoryBadge category={category} />
                    </span>
                    {category.name}
                  </h3>
                  <span class="badge bg-secondary">{category.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
