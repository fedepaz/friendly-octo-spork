// app/components/data-display/kpi-card/kpi-card.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
}

export function KPICard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: KPICardProps) {
  return (
    <Card className={cn("bg-card/40 border-border/40 shadow-premium group hover:bg-card/60 transition-premium rounded-none", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-(--space-0) px-(--space-4) pt-(--space-4) pb-(--space-1)">
        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 group-hover:text-foreground transition-premium">{title}</CardTitle>
        {Icon && <Icon className="size-3.5 text-primary opacity-40 group-hover:opacity-100 transition-premium" />}
      </CardHeader>
      <CardContent className="px-(--space-4) pb-(--space-4) pt-(--space-0)">
        <div className="text-2xl font-mono font-black tracking-tighter text-foreground tabular-nums">{value}</div>
        {description && (
          <p className="text-xs font-bold uppercase text-muted-foreground/70 leading-none mt-(--space-1) tracking-tight">{description}</p>
        )}
        {trend && (
          <div className="mt-(--space-2) flex items-center gap-(--space-1-5)">
            <div className={cn(
              "flex items-center px-(--space-1-5) py-(--space-0-5) text-xs font-black uppercase tracking-tighter rounded-none",
              trend.isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </div>
            <span className="text-xs font-bold uppercase text-muted-foreground/60 tracking-widest">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
