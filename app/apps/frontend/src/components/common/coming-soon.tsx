// src/components/common/coming-soon.tsx
"use client";

import { Logo } from "./logo";

export default function ComingSoonPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl w-full text-center space-y-6 md:space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-none bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
              <Logo variant="full" />
              <span className="text-primary font-bold"></span>
            </div>
            <div>
              <h1 className="font-bold uppercase tracking-tighter">Finance Manager</h1>
              <h2 className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest opacity-60">Sistema de gestión</h2>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter">
            ¡Próximamente!
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto font-mono">
            Estamos trabajando arduamente para brindarle una solución de gestión
            innovadora y eficiente.
          </p>
        </div>

        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none border-2 border-primary/20 bg-primary/10 text-primary">
          <div className="w-2 h-2 rounded-none bg-primary animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest">En desarrollo</span>
        </div>
      </div>
    </div>
  );
}
