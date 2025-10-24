// src/components/dashboard/StatCard.tsx

import type { FC } from "hono/jsx";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  color?: string;
  description?: string;
  valueColorClass?: string;
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  description,
  valueColorClass = "text-foreground",
  color = "primary",
  subtitle,
}) => {
  return (
    <>
      <div class="neo-card p-6 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-md transition-all">
        <div class="text-sm font-semibold uppercase text-muted-foreground mb-2">
          {title}
        </div>
        <div class={`text-4xl font-bold font-mono mb-2 ${valueColorClass}`}>
          {value}
        </div>
        <div class="text-sm text-muted-foreground">{description}</div>
      </div>
      <div className="neo-card">
        <div
          className="text-muted uppercase font-bold mb-2"
          style={{ fontSize: "14px", letterSpacing: "0.5px" }}
        >
          {title}
        </div>
        <div
          className={`text-mono font-bold text-${color}`}
          style={{ fontSize: "36px", lineHeight: "1.2" }}
        >
          {value}
        </div>
        {subtitle && (
          <div className="text-muted mt-2" style={{ fontSize: "14px" }}>
            {subtitle}
          </div>
        )}
      </div>
    </>
  );
};
