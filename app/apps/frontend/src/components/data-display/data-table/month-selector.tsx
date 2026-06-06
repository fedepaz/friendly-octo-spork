// src/components/data-display/data-table/month-selector.tsx

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
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
          className="min-h-[40px] bg-transparent"
        >
          {breakpoint === "sm" ? "" : "Elegir Mes"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(0)}>Enero</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(1)}>Febrero</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(2)}>Marzo</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(3)}>Abril</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(4)}>Mayo</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(5)}>Junio</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(6)}>Julio</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(7)}>Agosto</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(8)}>
          Septiembre
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(9)}>Octubre</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(10)}>
          Noviembre
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMonth(11)}>
          Diciembre
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
