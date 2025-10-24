// src/components/categories/CategoryBadge.tsx

import type { Category } from "@/generated/prisma";
import type { FC } from "hono/jsx";

export const CategoryBadge: FC<{ category: Category }> = ({ category }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "GASTO":
        return "destructive";
      case "PAGO":
        return "secondary";
      case "INGRESO":
        return "success";
      case "RENDIMIENTO":
        return "accent";
      default:
        return "muted";
    }
  };

  const color = category.color || `var(--${getTypeColor(category.type)})`;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        border: `2px solid ${color}`,
        background: `${color}20`,
        color: color,
        fontSize: "14px",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    >
      <span
        style={{
          width: "12px",
          height: "12px",
          background: color,
          border: "2px solid var(--border)",
        }}
      />
      {category.name}
    </span>
  );
};
