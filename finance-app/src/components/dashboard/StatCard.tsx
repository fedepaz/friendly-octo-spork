// src/components/dashboard/StatCard.tsx

import type { FC } from "hono/jsx";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  color?: "primary" | "secondary" | "accent" | "destructive" | "muted";
}

const textColorMap: Record<
  NonNullable<StatCardProps['color']>, // Ensure all possible colors are covered
  string
> = {
  primary: "text-primary-foreground",
  secondary: "text-secondary-foreground",
  accent: "text-accent-foreground",
  destructive: "text-destructive-foreground",
  muted: "text-muted-foreground",
};

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  color = "primary",
}) => {
  const textColorClass = textColorMap[color];

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 rounded-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150">
      <div class="text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
        {title}
      </div>
      <div class={`text-4xl md:text-5xl font-bold font-mono ${textColorClass} mb-2`}> {/* Using mapped class */}
        {value}
      </div>
      {subtitle && <div class="text-sm text-muted-foreground">{subtitle}</div>}
    </div>
  );
};
