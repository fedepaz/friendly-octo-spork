"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import type { Entity } from "@repo/shared";
import { useTranslations } from "next-intl";

interface PermissionSelectorProps {
  entities: Entity[];
  selectedEntityId: string | null;
  onSelect: (entityId: string) => void;
}

export function PermissionSelector({
  entities,
  selectedEntityId,
  onSelect,
}: PermissionSelectorProps) {
  const [open, setOpen] = useState(false);
  const selectedEntity = entities.find((e) => e.id === selectedEntityId);
  const t = useTranslations("PermissionSelector");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedEntity ? selectedEntity.label : t("selectEntity")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={t("searchEntity")} />
          <CommandEmpty>{t("noEntities")}</CommandEmpty>
          <CommandGroup>
            {entities.map((entity) => (
              <CommandItem
                key={entity.id}
                value={entity.label}
                onSelect={() => {
                  onSelect(entity.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedEntityId === entity.id ? "opacity-100" : "opacity-0",
                  )}
                />
                <div>
                  <p className="text-sm">{entity.label}</p>
                  <p className="text-xs text-muted-foreground">{entity.name}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
