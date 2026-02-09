// src/components/categories/CategoryBadge.tsx
import type { Category } from "@/generated/prisma";
import type { FC } from "hono/jsx";

interface CategoryBadgeProps {
  category: Category;
}

export const CategoryBadge: FC<CategoryBadgeProps> = ({ category }) => {
  const color = category.color || "#6b7280"; // gris por defecto

  // Función para oscurecer el color un poco para el borde
  const darkenColor = (hex: string, percent: number = 15) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;
    return `#${(
      0x1000000 +
      (R < 0 ? 0 : R) * 0x10000 +
      (G < 0 ? 0 : G) * 0x100 +
      (B < 0 ? 0 : B)
    )
      .toString(16)
      .slice(1)}`;
  };

  const borderColor = darkenColor(color, 20);
  return (
    <span
      class={`inline-flex items-center gap-2 px-3 py-1.5 
              text-xs font-bold uppercase tracking-wide 
              
              border-2
              shadow-[var(--shadow-sm)]
              hover:-translate-y-0.5 transition-transform`}
      style={{
        backgroundColor: `${color}20`, // 20 = 12% opacity
        color: color,
        borderColor: borderColor,
      }}
    >
      <span class="w-2 h-2" style={{ backgroundColor: color }} />
      {category.name}
    </span>
  );
};
