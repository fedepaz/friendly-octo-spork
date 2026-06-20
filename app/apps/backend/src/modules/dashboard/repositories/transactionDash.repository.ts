// backend/src/modules/dashboard/repositories/transactionDash.repository.ts

import { Injectable } from '@nestjs/common';
import { TransactionType } from '@repo/shared';
import { PrismaService } from '../../../infra/prisma/prisma.service';

// New type for this shape
export interface DailyTransactionSummary {
  date: Date;
  type: TransactionType;
  total: string;
}

@Injectable()
export class TransactionDashRepository {
  constructor(private prisma: PrismaService) {}
  // For dashboard — what's coming up next
  async getDailySummaryByMonth(
    userId: string,
    month: number,
    year: number,
  ): Promise<DailyTransactionSummary[]> {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const result = await this.prisma.transaction.groupBy({
      by: ['date', 'type'],
      where: { userId, date: { gte: start, lte: end } },
      _sum: { amount: true },
      orderBy: { date: 'desc' },
    });

    return result.map((r) => ({
      date: r.date,
      type: r.type,
      total: r._sum.amount?.toString() ?? '0',
    }));
  }
}
