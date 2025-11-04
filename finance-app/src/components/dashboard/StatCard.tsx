// src/components/dashboard/StatCard.tsx

import type { FC } from "hono/jsx";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  remaining?: string;
  color?: "primary" | "secondary" | "accent" | "destructive" | "muted";
  valueColor?: string;
  remainingColor?: string;
}

const textColorMap: Record<NonNullable<StatCardProps["color"]>, string> = {
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
  valueColor,
  remaining,
  remainingColor,
}) => {
  const textColorClass = textColorMap[color];

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 rounded-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150">
      <div class="text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
        {title}
      </div>
      <div
        class={`text-4xl md:text-5xl font-bold font-mono ${
          valueColor || textColorClass
        } mb-2`}
      >
        {value}
      </div>
      {remaining && (
        <div
          class={`text-lg font-mono ${
            remainingColor || "text-[var(--accent-mint)]"
          } mb-2`}
        >
          {remaining} remaining
        </div>
      )}
      {subtitle && <div class="text-sm text-muted-foreground">{subtitle}</div>}
    </div>
  );
};
