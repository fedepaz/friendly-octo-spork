// src/components/categories/CategoryBadge.tsx

import type { Category } from "@/generated/prisma";
import type { FC } from "hono/jsx";

import type { Category } from "@/generated/prisma";
import type { FC } from "hono/jsx";

const typeColorMap: Record<string, string> = {
  GASTO: "destructive",
  PAGO: "secondary",
  INGRESO: "primary",
  RENDIMIENTO: "accent",
};

export const CategoryBadge: FC<{ category: Category }> = ({ category }) => {
  const color = typeColorMap[category.type] || "muted";

  return (
    <span
      class={`inline-flex items-center gap-2 px-4 py-2 border-2 border-${color} bg-${color}/20 text-${color} text-sm font-bold uppercase tracking-wider`}
    >
      <span class={`w-3 h-3 bg-${color} border-2 border-border`} />
      {category.name}
    </span>
  );
};
