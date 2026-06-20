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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 pt-4 pb-1">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover:text-foreground transition-premium">{title}</CardTitle>
        {Icon && <Icon className="size-3.5 text-primary opacity-40 group-hover:opacity-100 transition-premium" />}
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="text-2xl font-mono font-black tracking-tighter text-foreground tabular-nums">{value}</div>
        {description && (
          <p className="text-[10px] font-bold uppercase text-muted-foreground/40 leading-none mt-1 tracking-tight">{description}</p>
        )}
        {trend && (
          <div className="mt-2 flex items-center gap-1.5">
            <div className={cn(
              "flex items-center px-1.5 py-0.5 text-[9px] font-black uppercase tracking-tighter rounded-none",
              trend.isPositive ? "bg-secondary/10 text-secondary" : "bg-destructive/10 text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </div>
            <span className="text-[9px] font-bold uppercase text-muted-foreground/30 tracking-widest">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
