"use client";

import { FieldValues, UseFormReturn } from "react-hook-form";
import { Eye, Plus, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SlideOverMode = "create" | "view";

interface SlideOverFormProps<T extends FieldValues> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  saveLabel?: string;
  formId?: string;
  form?: UseFormReturn<T>;
  mode?: SlideOverMode;
  className?: string;
}

export function SlideOverForm<T extends FieldValues>({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSave,
  onCancel,
  saveLabel,
  formId,
  form,
  mode = "view",
  className,
}: SlideOverFormProps<T>) {
  const isViewMode = mode === "view";
  const isCreateMode = mode === "create";

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  const getActionLabel = () => {
    if (isCreateMode) return saveLabel || "Crear";
    return "Cerrar Terminal";
  };

  const getIcon = () => {
    if (isViewMode) return <Eye className="mr-2 h-4 w-4" />;
    if (isCreateMode) return <Plus className="mr-2 h-4 w-4" />;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={cn(
          "w-full sm:max-w-md flex flex-col p-0 bg-background/80 backdrop-blur-xl border-l border-border/40 shadow-2xl rounded-none overflow-hidden animate-premium-in",
          className,
        )}
      >
        {/* Tactical Header Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent" />

        <SheetHeader className="px-6 py-5 border-b border-border/40 bg-background/40 shrink-0 relative">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {isCreateMode ? "Sistema // Registro" : "Sistema // Vista"}
              </span>
              <SheetTitle className="text-xl font-oxanium font-black tracking-tighter uppercase leading-none">
                {title}
              </SheetTitle>
              {description && (
                <p className="text-[10px] font-mono uppercase text-muted-foreground opacity-50 tracking-tight">
                  {description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cerrar"
              className="h-8 w-8 rounded-none hover:bg-primary/10 hover:text-primary transition-premium"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden bg-card/10">
          <ScrollArea
            className="h-full px-6 py-8 custom-scrollbar"
            tabIndex={-1}
          >
            <div className="space-y-8 animate-premium-in" tabIndex={-1}>
              {children}
            </div>
          </ScrollArea>
        </div>

        <SheetFooter className="px-6 py-5 border-t border-border/40 shrink-0 bg-background/60 backdrop-blur-md">
          {isViewMode ? (
            <Button
              onClick={handleCancel}
              className="w-full h-12 text-[11px] font-oxanium font-black uppercase tracking-[0.2em] rounded-none border-2 border-border/20 hover:border-primary/40 bg-background/40 transition-premium shadow-etched"
              variant="outline"
            >
              {getActionLabel()}
            </Button>
          ) : (
            <div className="flex w-full gap-4">
              <Button
                onClick={handleCancel}
                className="flex-1 h-12 text-[11px] font-oxanium font-black uppercase tracking-[0.2em] rounded-none border-2 border-border/20 hover:border-primary/40 bg-background/40 transition-premium shadow-etched"
                variant="outline"
              >
                Anular
              </Button>
              <Button
                type={formId ? "submit" : "button"}
                form={formId}
                onClick={!formId ? () => onSave?.() : undefined}
                className="flex-1 h-12 text-[11px] font-oxanium font-black uppercase tracking-[0.2em] rounded-none border-2 border-primary/20 hover:border-primary/60 bg-primary/10 text-primary transition-premium shadow-etched shadow-primary/10"
                disabled={
                  form
                    ? !form.formState.isValid || form.formState.isSubmitting
                    : false
                }
              >
                {getIcon()}
                {getActionLabel()}
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
