fix(recurrence): default totalParts to null for non-installment recurrences

Non-installment recurrences (MONTHLY, WEEKLY, YEARLY) created without
totalParts were getting endDate = startDate due to the ?? 1 fallback,
making them invisible after their start month in both card statement
and recurrence-by-month views.

Also reorders transaction creation to create/update recurrence first,
then link recurrenceId to the transaction record.
