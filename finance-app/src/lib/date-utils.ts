// src/lib/date-utils.ts

import { RecurrenceType } from "@/generated/prisma";

/**
 * Calculates the next date based on the current date and frequency.
 * If the calculated date is in the past, it advances to the next future occurrence.
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

  // Keep advancing until nextDate is in the future (today or later)
  const now = new Date();
  // Set time to midday to avoid timezone issues with same-date comparisons
  now.setHours(12, 0, 0, 0);
  next.setHours(12, 0, 0, 0);
  
  while (next < now) {
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
        next.setMonth(next.getMonth() + 1);
    }
  }

  return next;
}