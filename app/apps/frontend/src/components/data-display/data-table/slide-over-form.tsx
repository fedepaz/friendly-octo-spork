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
      <SheetContent className="w-full sm:max-w-xl flex flex-col h-dvh p-0 bg-background/60 backdrop-blur-2xl border-l border-border/40 shadow-2xl rounded-none">
        <SheetHeader className="px-6 py-5 border-b border-border/40 shrink-0 bg-background/40">
          <SheetTitle className="text-sm font-black uppercase tracking-widest text-primary">
            {title}
          </SheetTitle>
          {description ? (
            <SheetDescription className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-tight">
              {description}
            </SheetDescription>
          ) : (
            <SheetDescription className="sr-only">
              Formulario para {title}
            </SheetDescription>
          )}
        </SheetHeader>
        <div className="flex-1 overflow-hidden bg-card/20">
          <ScrollArea className="h-full px-6 py-6 custom-scrollbar" tabIndex={-1}>
            <div className="space-y-6 animate-premium-in" tabIndex={-1}>
              {children}
            </div>
          </ScrollArea>
        </div>
        <SheetFooter className="px-6 py-4 border-t border-border/40 shrink-0 bg-background/60 backdrop-blur-md">
          <Button
            onClick={handleCancel}
            className="w-full h-11 text-[11px] font-black uppercase tracking-widest rounded-none border-2 border-border/20 hover:border-primary/40 bg-background/40 transition-premium shadow-etched"
            variant="outline"
          >
            Cerrar Terminal
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
