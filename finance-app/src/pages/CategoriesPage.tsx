// src/pages/CategoriesPage.tsx

import type { FC } from "hono/jsx";

import type { Category } from "@/generated/prisma";

import { CategoryBadge } from "@/components/categories/CategoryBadge";

interface CategoriesPageData {
  categories: Category[];
}

export const CategoriesPage: FC<{ data?: CategoriesPageData }> = ({ data }) => {
  const categories = data?.categories || [];

  const groupedCategories = categories.reduce((acc, cat) => {
    if (!acc[cat.type]) acc[cat.type] = [];

    acc[cat.type].push(cat);
    return acc;
  }, {} as Record<string, Category[]>);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <h1
          className="font-bold uppercase"
          style={{ fontSize: "48px", letterSpacing: "1px" }}
        >
          Categories
        </h1>
        <button className="neo-btn neo-btn-primary">Add Category</button>
      </div>

      {categories.length === 0 ? (
        <div className="neo-card text-center" style={{ padding: "64px 24px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🏷️</div>
          <h3 className="font-bold uppercase mb-2" style={{ fontSize: "24px" }}>
            No Categories Yet
          </h3>
          <p className="text-muted mb-6" style={{ fontSize: "16px" }}>
            Create categories to organize your transactions.
          </p>
          <button className="neo-btn neo-btn-primary">
            Add Your First Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1">
          {Object.entries(groupedCategories).map(([type, cats]) => (
            <div key={type} className="neo-card mb-6">
              <h2
                className="font-bold uppercase mb-4"
                style={{ fontSize: "20px", letterSpacing: "0.5px" }}
              >
                {type}
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
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
