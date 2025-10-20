// src/components/categories/CategoriesList.tsx
import { FC } from "hono/jsx";
import { CategoryBadge } from "./CategoryBadge";

// Placeholder for Category type
interface Category {
  id: number;
  name: string;
  type: string;
  color?: string;
}

export const CategoriesList: FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Your Categories</h3>
      </div>
      <div class="table-responsive">
        <table class="table table-vcenter card-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Color</th>
              <th class="w-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colspan="4" class="text-center text-muted">No categories found. Add one above!</td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr id={`category-${category.id}`}>
                  <td>{category.name}</td>
                  <td>{category.type}</td>
                  <td>
                    <CategoryBadge category={category} />
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-ghost-secondary"
                      hx-get={`/api/categories/${category.id}/edit`}
                      hx-target={`#category-${category.id}`}
                      hx-swap="outerHTML"
                    >
                      Edit
                    </button>
                    <button
                      class="btn btn-sm btn-ghost-danger"
                      hx-delete={`/api/categories/${category.id}`}
                      hx-target={`#category-${category.id}`}
                      hx-swap="outerHTML swap:1s"
                      hx-confirm="Delete this category?"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
