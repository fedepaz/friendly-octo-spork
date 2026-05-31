// src/components/forms/slide-over-form.tsx
"use client";

import type * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SlideOverFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;

  onCancel?: () => void;
}

export function SlideOverForm({
  open,
  onOpenChange,
  title,
  description,
  children,
  onCancel,
}: SlideOverFormProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col h-dvh p-0">
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <SheetTitle className="text-xl">{title}</SheetTitle>
          {description ? (
            <SheetDescription className="text-xs">
              {description}
            </SheetDescription>
          ) : (
            <SheetDescription className="sr-only">
              Formulario para {title}
            </SheetDescription>
          )}
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-6 py-4" tabIndex={-1}>
            <div className="space-y-4" tabIndex={-1}>
              {children}
            </div>
          </ScrollArea>
        </div>
        <SheetFooter className="px-6 py-3 border-t shrink-0">
          <Button
            onClick={handleCancel}
            className="w-full h-9 text-sm"
            variant="outline"
          >
            Cerrar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
