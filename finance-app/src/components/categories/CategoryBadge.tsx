// src/components/categories/CategoryBadge.tsx
import type { Category } from "@/generated/prisma";
import type { FC } from "hono/jsx";

const typeStyleMap: Record<
  string,
  { bg: string; text: string; border: string; dotBg: string }
> = {
  GASTO: {
    bg: "bg-destructive/20",
    text: "text-destructive-foreground",
    border: "border-destructive",
    dotBg: "bg-destructive",
  },
  PAGO: {
    bg: "bg-secondary/20",
    text: "text-secondary-foreground",
    border: "border-secondary",
    dotBg: "bg-secondary",
  },
  INGRESO: {
    bg: "bg-primary/20",
    text: "text-primary-foreground",
    border: "border-primary",
    dotBg: "bg-primary",
  },
  RENDIMIENTO: {
    bg: "bg-accent/20",
    text: "text-accent-foreground",
    border: "border-accent",
    dotBg: "bg-accent",
  },
};

export const CategoryBadge: FC<{ category: Category }> = ({ category }) => {
  const typeStyles = typeStyleMap[category.type] || {
    bg: "bg-muted/20",
    text: "text-muted-foreground",
    border: "border-muted",
    dotBg: "bg-muted",
  };

  return (
    <span
      class={`inline-flex items-center px-2 py-1 text-xs font-semibold uppercase tracking-wide ${typeStyles.bg} ${typeStyles.text} border-2 ${typeStyles.border}`}
    >
      <span class={`w-3 h-3 ${typeStyles.dotBg} border-2 border-border`} />
      {category.name}
    </span>
  );
};
