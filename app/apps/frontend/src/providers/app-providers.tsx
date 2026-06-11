// src/providers/app-providers.tsx
"use client";

import { ErrorBoundary } from "@/components/error/error-boundary";
import { ReactClientProvider } from "./query-client-provider";
import { ThemeProvider } from "./theme-provider";
import { ErrorProvider } from "./error-provider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { WizardFormProvider } from "./wizard-form-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ErrorProvider>
        <TooltipProvider delayDuration={200}>
          <ReactClientProvider>
            <ThemeProvider>
              <WizardFormProvider>
                {children}
                <Toaster richColors position="top-center" closeButton />
              </WizardFormProvider>
            </ThemeProvider>
          </ReactClientProvider>
        </TooltipProvider>
      </ErrorProvider>
    </ErrorBoundary>
  );
}
