// src/pages/CategoriesPage.tsx
import { FC } from "hono/jsx";
import { Layout } from "../components/shared/Layout";
import { CategoriesList } from "../components/categories/CategoriesList";
import { CategoryForm } from "../components/categories/CategoryForm";

// Placeholder for Category type
interface Category {
  id: number;
  name: string;
  type: string;
  color?: string;
}

export const CategoriesPage: FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <Layout title="Categories">
      <div class="container-xl">
        <div class="page-header d-print-none">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="page-title">Categories</h2>
            </div>
          </div>
        </div>
        <div class="page-body">
          <div class="row row-cards">
            <div class="col-12">
              <CategoryForm />
            </div>
            <div class="col-12">
              <CategoriesList categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
