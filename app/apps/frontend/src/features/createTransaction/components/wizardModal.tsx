// src/features/createTransaction/components/wizardModal.tsx
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-md bg-background border-2 border-border flex flex-col max-h-[90dvh]">
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-border">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            {title} — Step {step} of {totalSteps}
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:border-foreground transition-all font-mono"
          >
            ✕
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
    <div className="flex items-center gap-1 px-4 pt-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 transition-all ${
            i <= current ? "bg-foreground" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

export function WizardFooter({
  onBack,
  onNext,
  onConfirm,
  isSubmitting,
  confirmLabel = "Confirm ✓",
}: {
  onBack?: () => void;
  onNext?: () => void;
  onConfirm?: () => void;
  isSubmitting?: boolean;
  confirmLabel?: string;
}) {
  return (
    <div className="px-4 py-4 border-t-2 border-border grid grid-cols-2 gap-3">
      <button
        key="back-button"
        type="button"
        onClick={onBack}
        disabled={!onBack}
        className="py-3 px-4 text-xs font-mono font-bold uppercase tracking-widest border-2 border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground transition-all disabled:opacity-50"
      >
        ← Back
      </button>
      {onConfirm ? (
        <button
          key="confirm-button"
          type="submit"
          onClick={onConfirm}
          disabled={isSubmitting}
          className="py-3 px-4 text-xs font-mono font-bold uppercase tracking-widest bg-foreground text-background hover:opacity-90 transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : confirmLabel}
        </button>
      ) : (
        <button
          key="next-button"
          type="button"
          onClick={onNext}
          disabled={!onNext}
          className="py-3 px-4 text-xs font-mono font-bold uppercase tracking-widest bg-foreground text-background hover:opacity-90 transition-all disabled:opacity-50"
        >
          Next →
        </button>
      )}
    </div>
  );
}
export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-mono text-destructive mt-1">{message}</p>;
}
