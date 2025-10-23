// src/pages/CategoriesPage.tsx

import type { FC } from "hono/jsx";

import type { Category } from "@/generated/prisma";
import { CategoriesList } from "@/components/categories/CategoriesList";

interface CategoriesPageProps {
  categories: Category[];
}

export const CategoriesPage: FC<CategoriesPageProps> = ({ categories }) => {
  return (
    <div class="container-xl">
      <div class="page-header d-print-none">
        <div class="row align-items-center">
          <div class="col">
            <h2 class="page-title">Categories</h2>
          </div>
        </div>
      </div>
      <div class="page-body">
        <CategoriesList categories={categories} />
      </div>

      {/* Modal container for HTMX */}
      <div
        id="modals-here"
        class="modal modal-blur fade"
        style="display: none"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div class="modal-content"></div>
        </div>
      </div>
    </div>
  );
};
