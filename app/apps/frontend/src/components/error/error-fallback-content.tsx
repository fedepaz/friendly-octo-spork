"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorFallbackContentProps {
  message: string | null;
  componentStack: string | null;
  onRetry: () => void;
}

export function ErrorFallbackContent({
  message,
  componentStack,
  onRetry,
}: ErrorFallbackContentProps) {
  const t = useTranslations("errors");

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-card to-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {t("somethingWentWrong")}
          </h2>
          <p className="text-muted-foreground mt-2">
            {t("dontWorry")}
          </p>
        </div>

        <div className="bg-muted border-l-4 border-accent p-4 rounded">
          <p className="text-sm text-muted-foreground">
            {message || t("unexpectedError")}
          </p>
        </div>

        {process.env.NODE_ENV === "development" && componentStack && (
          <details className="text-xs text-muted-foreground">
            <summary className="cursor-pointer font-medium mb-2">
              {t("technicalDetails")}
            </summary>
            <pre className="bg-card p-3 rounded overflow-auto max-h-48">
              {componentStack}
            </pre>
          </details>
        )}

        <div className="flex gap-3">
          <Button onClick={onRetry} className="flex-1 bg-primary">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("tryAgain")}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex-1"
          >
            {t("reloadPage")}
          </Button>
        </div>
      </div>
    </div>
  );
}
