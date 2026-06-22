// src/components/ui/in-line-error.tsx
export function InLineError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-mono text-destructive mt-1">{message}</p>;
}
