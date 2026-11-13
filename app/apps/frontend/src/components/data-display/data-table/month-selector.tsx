import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBreakpoint } from "@/hooks/useMediaQuery";

interface MonthSelectorProps {
  /** 0-based month, controlled by the parent so remounts never reset it. */
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const MONTH_KEYS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

export function MonthSelector({
  month,
  year,
  onMonthChange,
  onYearChange,
}: MonthSelectorProps) {
  const msT = useTranslations("MonthSelector");
  const breakpoint = useBreakpoint();

  const MONTHS = useMemo(
    () => MONTH_KEYS.map((key) => msT(key)),
    [msT],
  );

  return (
    <>
      <div className="flex items-stretch h-10 bg-background/40 border border-border/60 hover:border-primary/40 rounded-none transition-premium shadow-etched">
        <button
          type="button"
          aria-label={msT("prevYear")}
          onClick={() => onYearChange(year - 1)}
          className="px-2 text-muted-foreground hover:text-primary transition-premium cursor-pointer"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="flex items-center px-1 text-xs font-black uppercase tracking-widest text-foreground/80 select-none">
          {year}
        </span>
        <button
          type="button"
          aria-label={msT("nextYear")}
          onClick={() => onYearChange(year + 1)}
          className="px-2 text-muted-foreground hover:text-primary transition-premium cursor-pointer"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 bg-background/40 hover:bg-background/80 border-border/60 hover:border-primary/40 rounded-none transition-premium gap-3 px-4 shadow-etched"
          >
            <Calendar className="h-3.5 w-3.5 text-primary opacity-70" />
            <span className="text-xs font-black uppercase tracking-widest">
              {breakpoint === "sm"
                ? `${MONTHS[month].substring(0, 3)} ${year}`
                : `${MONTHS[month]} ${year}`}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-popover/90 backdrop-blur-xl border-border shadow-2xl rounded-none p-1"
        >
          <DropdownMenuLabel className="text-xs font-black uppercase tracking-widest opacity-60 px-2 py-1.5">
            {msT("monthlyPeriod")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border/40" />
          <div className="grid grid-cols-1 gap-0.5">
            {MONTHS.map((name, index) => (
              <DropdownMenuItem
                key={name}
                onClick={() => onMonthChange(index)}
                className={cn(
                  "text-xs font-black uppercase tracking-widest py-2 px-3 rounded-none cursor-pointer transition-premium",
                  month === index
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-foreground/5",
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{name}</span>
                  {month === index && <div className="h-1 w-1 bg-primary" />}
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
