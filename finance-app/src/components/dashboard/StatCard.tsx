// src/components/dashboard/StatCard.tsx

import type { FC } from "hono/jsx";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  color?: "primary" | "secondary" | "accent" | "destructive" | "muted";
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  color = "primary",
}) => {
  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150">
      <div class="text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
        {title}
      </div>
      <div class={`text-4xl font-bold font-mono text-${color}-foreground mb-2`}>
        {value}
      </div>
      {subtitle && <div class="text-sm text-muted-foreground">{subtitle}</div>}
    </div>
  );
};
