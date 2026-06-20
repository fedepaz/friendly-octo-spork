// src/components/data-display/data-table/month-selector.tsx

import { useEffect, useState } from "react";
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
  onMonthChange: (month: number) => void;
}

import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function MonthSelector({ onMonthChange }: MonthSelectorProps) {
  const breakpoint = useBreakpoint();
  const [month, setMonth] = useState(new Date().getMonth());

  useEffect(() => {
    onMonthChange(month);
  }, [month, onMonthChange]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 bg-background/40 hover:bg-background/80 border-border/60 hover:border-primary/40 rounded-none transition-premium gap-3 px-4 shadow-etched"
        >
          <Calendar className="h-3.5 w-3.5 text-primary opacity-70" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            {breakpoint === "sm"
              ? MONTHS[month].substring(0, 3)
              : MONTHS[month]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-popover/90 backdrop-blur-xl border-border shadow-2xl rounded-none p-1"
      >
        <DropdownMenuLabel className="text-[10px] uppercase tracking-widest opacity-60 px-2 py-1.5">
          Período Mensual
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/40" />
        <div className="grid grid-cols-1 gap-0.5">
          {MONTHS.map((name, index) => (
            <DropdownMenuItem
              key={name}
              onClick={() => setMonth(index)}
              className={cn(
                "text-[11px] font-bold uppercase tracking-tight py-2 px-3 rounded-none cursor-pointer transition-premium",
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
  );
}
