// src/components/categories/CategoryBadge.tsx

import type { Category } from "@/generated/prisma";

const categoryTypeIcons: Record<string, string> = {
  EXPENSE: "💸",
  INCOME: "💳",
  TRANSFER: "💸",
  REVENUE: "💸",
};

const categoryTypeColors: Record<string, string> = {
  EXPENSE: "bg-red-100 text-red-800",
  INCOME: "bg-green-100 text-green-800",
  TRANSFER: "bg-yellow-100 text-yellow-800",
  REVENUE: "bg-blue-100 text-blue-800",
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      class={`badge ${categoryTypeColors[category.type]} me-2`}
      style={category.color ? { backgroundColor: category.color } : undefined}
    >
      {categoryTypeIcons[category.type]}
      {category.name}
    </span>
  );
}
