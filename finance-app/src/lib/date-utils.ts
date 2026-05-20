// src/lib/date-utils.ts

import { RecurrenceType } from "@/generated/prisma";

/**
 * Calculates the next date based on the current date and frequency.
 */
export function calculateNextDate(currentDate: Date, frequency: RecurrenceType): Date {
  const next = new Date(currentDate);

  switch (frequency) {
    case "MONTHLY":
      next.setMonth(next.getMonth() + 1);
      break;
    case "WEEKLY":
      next.setDate(next.getDate() + 7);
      break;
    case "YEARLY":
      next.setFullYear(next.getFullYear() + 1);
      break;
    default:
      // Default to monthly if frequency is not one of the standard types
      next.setMonth(next.getMonth() + 1);
  }

  return next;
}
