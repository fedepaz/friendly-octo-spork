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
import { AuditActionType, AuditActionTypeSchema } from "@repo/shared";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface AuditActionSelectorProps {
  onActionChange: (action: AuditActionType | undefined) => void;
}

export function AuditActionSelector({
  onActionChange,
}: AuditActionSelectorProps) {
  const aasT = useTranslations("AuditActionSelector");
  const [action, setAction] = useState<AuditActionType | undefined>(undefined);

  useEffect(() => {
    onActionChange(action);
  }, [action, onActionChange]);

  const options: (AuditActionType | undefined)[] = [
    undefined,
    ...AuditActionTypeSchema.options,
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 bg-background/40 hover:bg-background/80 border-border/60 hover:border-primary/40 rounded-none transition-premium gap-3 px-4 shadow-etched"
        >
          <span className="text-xs font-black uppercase tracking-widest">
            {action ?? aasT("all")}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-popover/90 backdrop-blur-xl border-border shadow-2xl rounded-none p-1"
      >
        <DropdownMenuLabel className="text-xs font-black uppercase tracking-widest opacity-60 px-2 py-1.5">
          {aasT("label")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/40" />
        <div className="grid grid-cols-1 gap-0.5">
          {options.map((option) => (
            <DropdownMenuItem
              key={option ?? "all"}
              onClick={() => setAction(option)}
              className={cn(
                "text-xs font-black uppercase tracking-widest py-2 px-3 rounded-none cursor-pointer transition-premium",
                action === option
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-foreground/5",
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span>{option ?? aasT("all")}</span>
                {action === option && <div className="h-1 w-1 bg-primary" />}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
