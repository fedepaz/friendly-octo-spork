// src/lib/api/error-handler.ts
import { ErrorCode } from "@repo/shared";
import { ApiError } from "./client-fetch";

/**
 * API Error Handler
 *
 * Centralized error parsing and categorization
 * Returns structured error information for UI consumption
 * Titles/messages are translation keys — ErrorProvider resolves them.
 */
export interface ParsedError {
  type: ErrorType;
  /** Translation key for the error title (e.g. "authInvalidCredentials") */
  titleKey: string;
  /** Translation key for the error message (e.g. "authInvalidCredentialsDesc") */
  messageKey: string;
  /** Optional interpolation params for the message translation */
  messageParams?: Record<string, string>;
  /** Optional interpolation params for the title translation */
  titleParams?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: Record<string, any>;
  shouldRetry?: boolean;
  isFatal?: boolean;
}

export type ErrorType =
  | "NETWORK"
  | "AUTH"
  | "VALIDATION"
  | "NOT_FOUND"
  | "FORBIDDEN"
  | "CONFLICT"
  | "SERVER_ERROR"
  | "TIMEOUT"
  | "UNKNOWN";

/**
 * Registry of known semantic errors
 * Uses translation keys — ErrorProvider resolves the actual strings.
 */
const ERROR_REGISTRY: Partial<Record<ErrorCode, Partial<ParsedError>>> = {
  AUTH_INVALID_CREDENTIALS: {
    type: "FORBIDDEN",
    titleKey: "authInvalidCredentials",
    messageKey: "authInvalidCredentialsDesc",
  },
  AUTH_EXPIRED: {
    type: "AUTH",
    titleKey: "authExpired",
    messageKey: "authExpiredDesc",
    isFatal: true,
  },
  HIERARCHY_RESTRICTION: {
    type: "FORBIDDEN",
    titleKey: "hierarchyRestriction",
    messageKey: "hierarchyRestrictionDesc",
  },
  NETWORK_ERROR: {
    type: "NETWORK",
    titleKey: "networkError",
    messageKey: "networkErrorDesc",
  },
  INSUFFICIENT_FUNDS: {
    type: "VALIDATION",
    titleKey: "insufficientFunds",
    messageKey: "insufficientFundsDesc",
  },
  ACCOUNT_TYPE_RESTRICTION: {
    type: "FORBIDDEN",
    titleKey: "accountTypeRestriction",
    messageKey: "accountTypeRestrictionDesc",
  },
  DUPLICATE_RECORD: {
    type: "CONFLICT",
    titleKey: "duplicateRecord",
    messageKey: "duplicateRecordDesc",
  },
};

export function parseApiError(error: unknown): ParsedError {
  // 1. Network / Connection Errors
  if (error instanceof TypeError) {
    return {
      type: "NETWORK",
      titleKey: "networkError",
      messageKey: "networkErrorDesc",
      shouldRetry: true,
    };
  }

  // 2. Structured API Errors
  if (error instanceof ApiError) {
    const code = error.code as ErrorCode;

    // A. Check Registry for semantic matches
    if (code && ERROR_REGISTRY[code]) {
      const entry = ERROR_REGISTRY[code]!;
      return {
        type: entry.type || "UNKNOWN",
        titleKey: entry.titleKey || "error",
        messageKey: entry.messageKey || "errorDesc",
        details: error.details,
        isFatal: entry.isFatal,
        shouldRetry: entry.shouldRetry,
      };
    }

    // B. Fallback to Status-based messages
    switch (error.status) {
      case 400:
        return {
          type: "VALIDATION",
          titleKey: "validationError",
          messageKey: "validationErrorDesc",
          details: error.details,
        };
      case 401:
        return {
          type: "AUTH",
          titleKey: "unauthorized",
          messageKey: "unauthorizedDesc",
          isFatal: true,
        };
      case 403:
        return {
          type: "FORBIDDEN",
          titleKey: "accessDenied",
          messageKey: "accessDeniedDesc",
        };
      case 404:
        return {
          type: "NOT_FOUND",
          titleKey: "notFound",
          messageKey: "notFoundDesc",
        };
      case 409:
        return {
          type: "CONFLICT",
          titleKey: "conflict",
          messageKey: "conflictDesc",
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          type: "SERVER_ERROR",
          titleKey: "serverError",
          messageKey: "serverErrorDesc",
          shouldRetry: true,
        };
      default:
        return {
          type: "UNKNOWN",
          titleKey: "unexpectedError",
          messageKey: "unexpectedErrorDesc",
        };
    }
  }

  // 3. Generic JS Errors
  if (error instanceof Error) {
    return {
      type: "UNKNOWN",
      titleKey: "internalError",
      messageKey: error.message,
    };
  }

  return {
    type: "UNKNOWN",
    titleKey: "unknownError",
    messageKey: "unknownErrorDesc",
  };
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  const parsed = parseApiError(error);
  return parsed.shouldRetry || false;
}

/**
 * Check if error requires authentication
 */
export function requiresAuthentication(error: unknown): boolean {
  if (error instanceof ApiError && error.status === 401) {
    return true;
  }
  return false;
}
