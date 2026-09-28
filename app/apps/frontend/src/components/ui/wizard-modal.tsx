// src/components/ui/wizard-modal.tsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useCallback } from "react";

export function WizardModal({
  isOpen,
  onClose,
  title,
  step,
  totalSteps,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  step: number;
  totalSteps: number;
  children: React.ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    const focusable = contentRef.current?.querySelector<HTMLElement>(
      'input, button, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable) {
      focusable.focus();
    } else {
      closeRef.current?.focus();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-100 flex items-center justify-center p-(--space-4) animate-premium-in"
    >
      <div
        className="absolute inset-0 bg-background/40 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        ref={contentRef}
        className="relative w-full max-w-md bg-card/60 backdrop-blur-2xl border border-border/40 shadow-2xl flex flex-col max-h-[90dvh] rounded-none overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent" />
        <div className="flex items-center justify-between px-(--space-5) py-(--space-4) border-b border-border/40 bg-background/40">
          <div className="space-y-(--space-0-5)">
            <span className="text-xs font-black uppercase tracking-widest text-primary">
              {title}
            </span>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">
              Terminal de Operación • Paso {step} de {totalSteps}
            </p>
          </div>
          <button
            ref={closeRef}
            autoFocus
            onClick={onClose}
            className="w-(--control-height) h-(--control-height) flex items-center justify-center border border-border/20 text-muted-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-premium rounded-none cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
            <span className="text-xs font-black uppercase tracking-widest">Esc</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Paso ${current + 1} de ${total}`}
      className="flex items-center gap-(--space-1) px-(--space-5) pt-(--space-4) bg-background/20">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 flex-1 transition-all duration-500",
            i <= current
              ? "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.3)]"
              : "bg-border/20",
            i === current && "shadow-[0_0_12px_rgba(var(--primary),0.5)]",
          )}
        />
      ))}
    </div>
  );
}

export function WizardFooter({
  onBack,
  onNext,
  onConfirm,
  showBackButton = true,
  isSubmitting,
  confirmLabel = "Grabar ✓",
}: {
  onBack?: () => void;
  onNext?: () => void;
  onConfirm?: () => void;
  showBackButton?: boolean;
  isSubmitting?: boolean;
  confirmLabel?: string;
}) {
  return (
    <div className="px-(--space-5) py-(--space-5) border-t border-border/40 bg-background/60 backdrop-blur-md grid grid-cols-2 gap-(--space-4)">
      {showBackButton && (
        <button
          key="back-button"
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className="h-(--control-height-md) px-(--space-4) text-xs font-black uppercase tracking-widest border border-border/20 bg-background/40 text-muted-foreground/60 hover:text-foreground hover:border-primary/40 transition-premium disabled:opacity-20 rounded-none shadow-etched cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
          ← Retroceder
        </button>
      )}
      {onConfirm ? (
        <button
          key="confirm-button"
          type="submit"
          onClick={onConfirm}
          disabled={isSubmitting}
          className="h-(--control-height-md) px-(--space-4) text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground hover:opacity-90 transition-premium disabled:opacity-50 rounded-none shadow-premium cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        >
          {isSubmitting ? "Procesando..." : confirmLabel}
        </button>
      ) : (
        <button
          key="next-button"
          type="button"
          onClick={onNext}
          disabled={!onNext}
          className="h-(--control-height-md) px-(--space-4) text-xs font-black uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 transition-premium disabled:opacity-50 rounded-none shadow-premium cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        >
          Siguiente →
        </button>
      )}
    </div>
  );
}
