// src/features/dashboard/utils/utils.tsx

import { formatCurrency } from "@/lib/utils";

export function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 shadow-lg">
        <p className="font-mono text-xs text-muted-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="font-mono text-sm text-foreground">
            {entry.dataKey}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}
