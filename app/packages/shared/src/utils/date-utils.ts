import { RecurrenceType } from "../enums";

/**
 * Calculates the next date based on the current date and frequency.
 * If the calculated date is in the past, it advances to the next future occurrence.
 */
export function calculateNextDate(
  currentDate: Date,
  frequency: RecurrenceType,
): Date {
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
    case "INSTALLMENT":
      next.setMonth(next.getMonth() + 1);
      break;
    default:
      next.setMonth(next.getMonth() + 1);
  }

  const now = new Date();
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
      case "INSTALLMENT":
        next.setMonth(next.getMonth() + 1);
        break;
      default:
        next.setMonth(next.getMonth() + 1);
    }
  }

  return next;
}
