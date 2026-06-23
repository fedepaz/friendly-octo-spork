// src/components/error/route-error.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function RouteError({ error, reset }: RouteErrorProps) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md space-y-6">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Algo salió mal</h2>
        <p className="text-muted-foreground text-sm">
          {error.message || "Ocurrió un error inesperado. Intentalo de nuevo."}
        </p>
        <Button onClick={reset} className="bg-primary">
          <RefreshCw className="w-4 h-4 mr-2" />
          Reintentar
        </Button>
      </div>
    </div>
  );
}
