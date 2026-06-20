// src/lib/api/error-handler.ts
import { ErrorCode } from "@repo/shared";
import { ApiError } from "./client-fetch";

/**
 * API Error Handler
 *
 * Centralized error parsing and categorization
 * Returns structured error information for UI consumption
 */
export interface ParsedError {
  type: ErrorType;
  title: string;
  message: string;
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
 * Used to provide specific UI feedback for business logic failures
 */
const ERROR_REGISTRY: Partial<Record<ErrorCode, Partial<ParsedError>>> = {
  AUTH_INVALID_CREDENTIALS: {
    type: "FORBIDDEN",
    title: "Credenciales incorrectas",
    message: "El nombre de usuario o contraseña son incorrectos.",
  },
  AUTH_EXPIRED: {
    type: "AUTH",
    title: "Sesión expirada",
    message: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
    isFatal: true,
  },
  HIERARCHY_RESTRICTION: {
    type: "FORBIDDEN",
    title: "Restricción de jerarquía",
    message:
      "No puedes gestionar los permisos de un usuario con antigüedad igual o superior a la tuya.",
  },
  NETWORK_ERROR: {
    type: "NETWORK",
    title: "Sin conexión",
    message: "No se puede conectar al servidor. Verifica tu conexión.",
  },
  INSUFFICIENT_FUNDS: {
    type: "VALIDATION",
    title: "Fondos insuficientes",
    message: "La cuenta seleccionada no tiene fondos suficientes.",
  },
  ACCOUNT_TYPE_RESTRICTION: {
    type: "FORBIDDEN",
    title: "Operación no permitida",
    message: "Este tipo de cuenta no permite este tipo de transacción.",
  },
  DUPLICATE_RECORD: {
    type: "CONFLICT",
    title: "Registro duplicado",
    message: "Ya existe un registro con estos datos.",
  },
};

export function parseApiError(error: unknown): ParsedError {
  // 1. Network / Connection Errors
  if (error instanceof TypeError) {
    return {
      type: "NETWORK",
      title: "Error de red",
      message: "No se pudo establecer conexión con el servidor.",
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
        title: entry.title || "Error",
        message: entry.message || error.message || "Error desconocido",
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
          title: "Datos inválidos",
          message: "Por favor, verifica la información ingresada.",
          details: error.details,
        };
      case 401:
        return {
          type: "AUTH",
          title: "No autorizado",
          message: "No tienes permiso para acceder a este recurso.",
          isFatal: true,
        };
      case 403:
        return {
          type: "FORBIDDEN",
          title: "Acceso denegado",
          message: "No tienes los permisos necesarios.",
        };
      case 404:
        return {
          type: "NOT_FOUND",
          title: "No encontrado",
          message: "El recurso solicitado no existe.",
        };
      case 409:
        return {
          type: "CONFLICT",
          title: "Conflicto",
          message: "Ya existe un registro similar.",
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          type: "SERVER_ERROR",
          title: "Error del servidor",
          message: "El servidor tuvo un problema. Reintenta en unos momentos.",
          shouldRetry: true,
        };
      default:
        return {
          type: "UNKNOWN",
          title: "Error inesperado",
          message: error.message || "Ha ocurrido un error inesperado.",
        };
    }
  }

  // 3. Generic JS Errors
  if (error instanceof Error) {
    return {
      type: "UNKNOWN",
      title: "Error interno",
      message: error.message,
    };
  }

  return {
    type: "UNKNOWN",
    title: "Error desconocido",
    message: "Ha ocurrido un error totalmente inesperado.",
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
