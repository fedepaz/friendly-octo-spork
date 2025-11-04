// src/components/categories/CategoryBadge.tsx
import type { Category } from "@/generated/prisma";
import type { FC } from "hono/jsx";

const typeStyleMap: Record<
  string,
  { bg: string; text: string; border: string; dotBg: string }
> = {
  GASTO: {
    bg: "bg-destructive/20",
    text: "text-[var(--destructive)]",
    border: "border-[var(--destructive)]",
    dotBg: "bg-[var(--destructive)]",
  },
  PAGO: {
    bg: "bg-secondary/20",
    text: "text-[var(--accent)]",
    border: "border-[var(--accent)]",
    dotBg: "bg-[var(--accent)]",
  },
  INGRESO: {
    bg: "bg-primary/20",
    text: "text-[var(--primary)]",
    border: "border-[var(--primary)]",
    dotBg: "bg-[var(--primary)]",
  },
  RENDIMIENTO: {
    bg: "bg-accent/20",
    text: "text-[var(--secondary)]",
    border: "border-[var(--secondary)]",
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
      class={`inline-flex items-center gap-2 px-3 py-1.5 
              text-xs font-bold uppercase tracking-wide 
              ${typeStyles.bg} ${typeStyles.text} 
              border-2 ${typeStyles.border}
              shadow-[var(--shadow-sm)]
              hover:-translate-y-0.5 transition-transform`}
    >
      <span class={`w-2 h-2 ${typeStyles.dotBg}`} />
      {category.name}
    </span>
  );
};
