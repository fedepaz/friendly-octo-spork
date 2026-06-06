// backend/src/repositories/transaction.repository.ts

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../infra/prisma/prisma.service';
import { TransactionType } from '@repo/shared';

export type TransactionWithRelations = Prisma.TransactionGetPayload<{
  include: {
    category: true;
    sourceAccount: true;
    targetAccount: true;
    recurrence: true;
  };
}>;
// New type for this shape
export interface DailyTransactionSummary {
  date: Date;
  type: TransactionType;
  total: string;
}

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async getTransactions(userId: string): Promise<TransactionWithRelations[]> {
    const where: Prisma.TransactionWhereInput = {
      userId,
    };

    return this.prisma.transaction.findMany({
      where,
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        recurrence: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getTransactionById(
    userId: string,
    id: string,
  ): Promise<TransactionWithRelations | null> {
    return this.prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        recurrence: true,
      },
    });
  }

  async saveTransaction(
    data: Prisma.TransactionUncheckedCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<TransactionWithRelations> {
    const client = tx || this.prisma;
    return client.transaction.create({
      data,
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        recurrence: true,
      },
    });
  }

  async getByMonth(
    userId: string,
    month: number,
    year: number,
  ): Promise<TransactionWithRelations[]> {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    return this.prisma.transaction.findMany({
      where: {
        userId,
        date: { gte: start, lte: end },
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        recurrence: true,
      },
      orderBy: { date: 'desc' },
    });
  }
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
