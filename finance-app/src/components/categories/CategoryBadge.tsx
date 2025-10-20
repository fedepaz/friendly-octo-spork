// src/components/categories/CategoryBadge.tsx
import { FC } from "hono/jsx";

// Placeholder for Category type
interface Category {
  id: number;
  name: string;
  type: string;
  color?: string;
}

export const CategoryBadge: FC<{ category: Category }> = ({ category }) => {
  const badgeColor = category.color || "secondary"; // Default to secondary if no color is provided

  return (
    <span class={`badge bg-${badgeColor}`}>
      {category.name}
    </span>
  );
};
