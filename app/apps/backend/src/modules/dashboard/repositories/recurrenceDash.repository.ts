// backend/src/modules/dashboard/repositories/recurrenceDash.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';

import { RecurrenceWithRelations } from '../../../repositories/recurrence.repository';

@Injectable()
export class RecurrenceDashRepository {
  constructor(private prisma: PrismaService) {}
  // For dashboard — what's coming up next
  async getUpcoming(userId: string) {
    return this.prisma.recurrence.findMany({
      where: {
        userId,
        active: true,
        nextDate: { gte: new Date() },
      },
      include: { category: true, sourceAccount: true },
      orderBy: { nextDate: 'asc' },
    });
  }

  // For detecting missed payments
  async getOverdue(userId: string) {
    return this.prisma.recurrence.findMany({
      where: {
        userId,
        active: true,
        nextDate: { lt: new Date() },
      },
      include: { category: true, sourceAccount: true },
      orderBy: { nextDate: 'asc' },
    });
  }

  /**
   * Get recurrences that are DUE and UNPAID for a given month.
   *
   * A recurrence is "to pay this month" if:
   * - It's active
   * - Its nextDate falls within the target month
   * - No transaction exists for the expected recurrencePartNumber (currentPart + 1)
   * - Not a card expense, that is handled by the card expense service
   */
  async getToPayByMonth(userId: string): Promise<RecurrenceWithRelations[]> {
    // transactionType param removed — filtering by type is a service concern, not repo

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    return this.prisma.$queryRaw<RecurrenceWithRelations[]>`
    SELECT r.* FROM "Recurrence" r
    WHERE r."userId" = ${userId}
      AND r."active" = true
      AND r."isCardExpense" = false
      AND r."startDate" <= ${endOfMonth}
      AND (r."endDate" >= ${startOfMonth} OR r."endDate" IS NULL)
      AND (r."nextDate" BETWEEN ${startOfMonth} AND ${endOfMonth}
            OR r."startDate" BETWEEN ${startOfMonth} AND ${endOfMonth})
      AND NOT EXISTS (
        SELECT 1 FROM "Transaction" t
        WHERE t."recurrenceId" = r."id"
          AND t."recurrencePartNumber" = r."currentPart" + 1
          AND t."date" BETWEEN ${startOfMonth} AND ${endOfMonth}
      )
    ORDER BY r."nextDate" ASC
  `;
  }
}
