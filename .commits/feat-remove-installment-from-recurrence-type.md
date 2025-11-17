feat: Remove INSTALLMENT from RecurrenceType enum

This commit removes the 'INSTALLMENT' value from the RecurrenceType enum in `schema.prisma` and updates the generated Prisma client files accordingly.

This change was requested by the user to streamline recurrence types.

A migration history issue was also resolved during this process, allowing for proper migration generation in the future.