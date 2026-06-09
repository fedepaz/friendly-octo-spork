// src/components/data-display/data-table/transType-selector.tsx

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

import { TransactionType, TransactionTypeSchema } from "@repo/shared";
import { cn } from "@/lib/utils";

interface TransTypeSelectorProps {
  onTransTypeChange: (type: TransactionType) => void;
}

export function TransTypeSelector({
  onTransTypeChange,
}: TransTypeSelectorProps) {
  const [transType, setTransType] = useState<TransactionType>("EXPENSE");

  useEffect(() => {
    onTransTypeChange(transType);
  }, [transType, onTransTypeChange]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 bg-background/40 hover:bg-background/80 border-border/60 hover:border-primary/40 rounded-none transition-premium gap-3 px-4 shadow-etched"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">
            {transType}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-popover/90 backdrop-blur-xl border-border shadow-2xl rounded-none p-1"
      >
        <DropdownMenuLabel className="text-[10px] uppercase tracking-widest opacity-60 px-2 py-1.5">
          Tipo de Transacción
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/40" />
        <div className="grid grid-cols-1 gap-0.5">
          {TransactionTypeSchema.options.map((type) => (
            <DropdownMenuItem
              key={type}
              onClick={() => setTransType(type)}
              className={cn(
                "text-[11px] font-bold uppercase tracking-tight py-2 px-3 rounded-none cursor-pointer transition-premium",
                transType === type
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-foreground/5",
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span>{type}</span>
                {transType === type && <div className="h-1 w-1 bg-primary" />}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
