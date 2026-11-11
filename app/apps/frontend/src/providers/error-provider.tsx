// src/providers/error-provider.tsx
"use client";

import { parseApiError, ParsedError } from "@/lib/api/error-handler";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useCallback, useContext } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { logger } from "@/lib/logger";

interface ErrorContextValue {
  handleError: (error: unknown, options?: ErrorHandlerOptions) => void;
  handleFormError: (
    error: unknown,
    setError: (field: string, error: { message: string }) => void,
  ) => void;
  handleOptimisticError: (error: unknown) => void;
}

interface ErrorHandlerOptions {
  context?: string;
  silent?: boolean;
  shouldRedirect?: boolean;
  onRetry?: () => void;
  shouldThrow?: boolean;
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const epT = useTranslations("ErrorProvider");

  logger.debug("ErrorProvider initialized");

  const resolveError = useCallback(
    (parsed: ParsedError) => {
      const title = epT.has(parsed.titleKey)
        ? epT(parsed.titleKey, parsed.titleParams ?? {})
        : parsed.titleKey;
      const message = epT.has(parsed.messageKey)
        ? epT(parsed.messageKey, parsed.messageParams ?? {})
        : parsed.messageKey;
      return { title, message };
    },
    [epT],
  );

  const handleError = useCallback(
    (error: unknown, options: ErrorHandlerOptions = {}) => {
      logger.debug("handleError called: ");
      logger.debug("error", error);

      const {
        context,
        silent = false,
        shouldRedirect = true,
        shouldThrow = false,
      } = options;

      logger.error(`DEBUG: ${context || ""}`, error);

      const parsed = parseApiError(error);
      logger.debug("parsed: ", parsed);

      if (silent) {
        if (shouldThrow) throw error;
        return;
      }

      // Auth expiration — redirect to login
      if (parsed.type === "AUTH" && parsed.isFatal) {
        localStorage.clear();
        router.push("/login");
        return;
      }

      const { title, message } = resolveError(parsed);
      const toastConfig = getToastConfig(parsed, title, message);

      if (parsed.type === "AUTH" && parsed.isFatal && shouldRedirect) {
        setTimeout(() => {
          localStorage.clear();
          router.push("/login");
        }, 2500);

        if (shouldThrow) throw error;
        return;
      }

      toast.error(toastConfig.title, {
        description: toastConfig.description,
        duration: toastConfig.duration,
      });

      if (shouldThrow) throw error;
    },
    [router, resolveError],
  );

  const handleFormError = useCallback(
    (
      error: unknown,
      setError: (field: string, error: { message: string }) => void,
    ) => {
      handleError(error, { context: "Form Submission" });
      const parsed = parseApiError(error);

      if (setError && parsed.details) {
        Object.entries(parsed.details).forEach(([field, message]) => {
          if (typeof message === "string") {
            setError(field, {
              message,
            });
          }
        });
      }
    },
    [handleError],
  );

  const handleOptimisticError = useCallback(
    (error: unknown) => {
      handleError(error, {
        context: "Optimistic Mutation",
        shouldRedirect: false,
      });

      toast.info(epT("actionReverted"), {
        description: epT("actionRevertedDesc"),
        duration: 3000,
      });
    },
    [handleError, epT],
  );

  return (
    <ErrorContext.Provider
      value={{ handleError, handleFormError, handleOptimisticError }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrorHandler must be used within a ErrorProvider");
  }
  return context;
}

function getToastConfig(
  parsed: ParsedError,
  title: string,
  description: string,
) {
  const base = {
    title,
    description,
    duration: parsed.shouldRetry ? 8000 : 5000,
  };

  switch (parsed.type) {
    case "NETWORK":
    case "TIMEOUT":
      return { ...base, variant: "warning" as const };
    case "AUTH":
      return { ...base, variant: "destructive" as const, duration: 6000 };
    case "VALIDATION":
    case "CONFLICT":
      return { ...base, variant: "warning" as const };
    default:
      return { ...base, variant: "destructive" as const };
  }
}
