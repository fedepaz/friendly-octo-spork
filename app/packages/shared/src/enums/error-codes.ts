import { z } from "zod";

/**
 * Shared Semantic Error Codes
 * These are used by the backend to identify business logic failures
 * and by the frontend to provide localized, high-fidelity UI feedback.
 */
export const ErrorCodeSchema = z.enum([
  // Infrastructure & Generic
  "INTERNAL_ERROR",
  "NETWORK_ERROR",
  "TIMEOUT_ERROR",
  "NOT_FOUND",
  "CONFLICT",

  // Authentication & Security
  "UNAUTHORIZED",
  "FORBIDDEN",
  "AUTH_INVALID_CREDENTIALS",
  "AUTH_EXPIRED",
  "AUTH_SESSION_INVALID",
  "HIERARCHY_RESTRICTION",

  // Data Validation
  "VALIDATION_ERROR",
  "DUPLICATE_RECORD",
  "MALFORMED_REQUEST",

  // Business Logic: Finance
  "INSUFFICIENT_FUNDS",
  "ACCOUNT_TYPE_RESTRICTION",
  "INVALID_TRANSACTION_TYPE",
  "RECURRENCE_LIMIT_REACHED",
]);

export type ErrorCode = z.infer<typeof ErrorCodeSchema>;
