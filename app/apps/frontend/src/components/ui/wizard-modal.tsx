// src/components/ui/wizard-modal.tsx
import { cn } from "@/lib/utils";

export function WizardModal({
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
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 animate-premium-in">
      <div
        className="absolute inset-0 bg-background/40 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-card/60 backdrop-blur-2xl border border-border/40 shadow-2xl flex flex-col max-h-[90dvh] rounded-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent" />
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 bg-background/40">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              {title}
            </span>
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">
              Terminal de Operación • Paso {step} de {totalSteps}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-border/20 text-muted-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-premium rounded-none cursor-pointer"
          >
            <span className="text-[10px] font-black uppercase">Esc</span>
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
    <div className="flex items-center gap-1 px-5 pt-4 bg-background/20">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 flex-1 transition-all duration-500",
            i <= current
              ? "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.3)]"
              : "bg-border/20",
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
    <div className="px-5 py-5 border-t border-border/40 bg-background/60 backdrop-blur-md grid grid-cols-2 gap-4">
      {showBackButton && (
        <button
          key="back-button"
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className="h-11 px-4 text-[10px] font-black uppercase tracking-widest border border-border/20 bg-background/40 text-muted-foreground/60 hover:text-foreground hover:border-primary/40 transition-premium disabled:opacity-20 rounded-none shadow-etched cursor-pointer"
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
          className="h-11 px-4 text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground hover:opacity-90 transition-premium disabled:opacity-50 rounded-none shadow-premium cursor-pointer"
        >
          {isSubmitting ? "Procesando..." : confirmLabel}
        </button>
      ) : (
        <button
          key="next-button"
          type="button"
          onClick={onNext}
          disabled={!onNext}
          className="h-11 px-4 text-[10px] font-black uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 transition-premium disabled:opacity-50 rounded-none shadow-premium cursor-pointer"
        >
          Siguiente →
        </button>
      )}
    </div>
  );
}
