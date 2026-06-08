"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Currency } from "@repo/shared";
import { LucideIcon } from "lucide-react";

/**
 * TacticalTextCell
 * Optimized for high-density identification.
 * Uses Oxanium for titles and Mono for secondary metadata.
 */
interface TacticalTextCellProps {
  title: string;
  subtext?: string;
  id?: string;
  className?: string;
}

export function TacticalTextCell({
  title,
  subtext,
  id,
  className,
}: TacticalTextCellProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="text-sm font-black text-foreground tracking-tighter uppercase font-oxanium truncate max-w-50">
        {title}
      </span>
      {(subtext || id) && (
        <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest truncate max-w-50">
          {subtext}
          {subtext && id && " // "}
          {id && `ID: ${id.slice(-8)}`}
        </span>
      )}
    </div>
  );
}

/**
 * TacticalTypeCell
 * Displays an icon in a tactical square box next to a label.
 */
interface TacticalTypeCellProps {
  icon: LucideIcon;
  label: string;
  className?: string;
  iconClassName?: string;
}

export function TacticalTypeCell({
  icon: Icon,
  label,
  className,
  iconClassName,
}: TacticalTypeCellProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-7 w-7 items-center justify-center bg-muted/20 border border-border/40 shadow-inner">
        <Icon
          className={cn("h-3.5 w-3.5 text-muted-foreground", iconClassName)}
        />
      </div>
      <span className="text-[11px] font-bold uppercase tracking-tight text-foreground/80">
        {label}
      </span>
    </div>
  );
}

/**
 * PremiumAmountCell
 * Handles financial color-coding and monospaced formatting.
 */
interface PremiumAmountCellProps {
  amount: string | number;
  currency?: Currency;
  isNegative?: boolean;
  showSign?: boolean;
  className?: string;
}

export function PremiumAmountCell({
  amount,
  currency,
  isNegative: isNegativeProp,
  showSign = true,
  className,
}: PremiumAmountCellProps) {
  const numAmount = Number(amount);
  const isNegative = isNegativeProp ?? numAmount < 0;
  const isPositive = !isNegative && numAmount > 0;

  return (
    <div
      className={cn(
        "font-mono text-sm font-black tabular-nums text-right transition-premium",
        isPositive
          ? "text-emerald-600"
          : isNegative
            ? "text-rose-400"
            : "text-foreground",
        className,
      )}
    >
      {showSign &&
        numAmount !== 0 &&
        (isPositive ? "+" : isNegative ? "-" : "")}
      {formatCurrency(Math.abs(numAmount), currency)}
    </div>
  );
}

/**
 * PremiumBadgeCell
 * Industrial, zero-radius badge for statuses or categories.
 */
interface PremiumBadgeCellProps {
  label: string;
  variant?: "primary" | "secondary" | "accent" | "muted" | "destructive";
  className?: string;
}

export function PremiumBadgeCell({
  label,
  variant = "primary",
  className,
}: PremiumBadgeCellProps) {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    accent: "bg-accent/10 text-accent border-accent/20",
    muted: "bg-muted/10 text-muted-foreground border-border/40",
    destructive: "bg-rose-400/10 text-rose-400 border-rose-400/20",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-none border-2 transition-premium",
        variants[variant] || variants.primary,
        className,
      )}
    >
      {label}
    </Badge>
  );
}

/**
 * PremiumDateCell
 * Tactical monospaced date.
 */
export function PremiumDateCell({
  date,
  className,
}: {
  date: string | Date;
  className?: string;
}) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <span
      className={cn(
        "text-[11px] font-mono font-bold text-muted-foreground/60 tracking-tighter whitespace-nowrap",
        className,
      )}
    >
      {formattedDate}
    </span>
  );
}
