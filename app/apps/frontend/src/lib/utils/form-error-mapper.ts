// src/lib/utils/form-error-mapper.ts

import { FieldValues, Path, UseFormSetError } from "react-hook-form";

/**
 * Maps Standardized Backend Errors to React Hook Form setError
 *
 * Works with the backend AllExceptionsFilter output.
 */
export function mapServerErrorsToForm<T extends FieldValues>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: any,
  setError: UseFormSetError<T>,
) {
  if (!details) return;

  const { fieldErrors, formErrors } = details;

  // 1. Surgical mapping for field-specific errors
  if (fieldErrors) {
    Object.entries(fieldErrors).forEach(([field, messages]) => {
      const message = Array.isArray(messages) ? messages[0] : String(messages);
      setError(field as Path<T>, { type: "server", message });
    });
  }

  // 2. Global form errors (map to the 'root' key)
  if (formErrors && formErrors.length > 0) {
    setError("root" as Path<T>, { type: "server", message: formErrors[0] });
  }
}
