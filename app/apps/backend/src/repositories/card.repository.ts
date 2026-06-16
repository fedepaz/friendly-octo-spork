// backend/src/repositories/card.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma/prisma.service';
import { Prisma } from '@prisma/client';

export type CardExpenseWithRelations = Prisma.TransactionGetPayload<{
  include: {
    category: true;
    sourceAccount: true;
    targetAccount: true;
    recurrence: true;
  };
}>;

@Injectable()
export class CardRepository {
  constructor(private prisma: PrismaService) {}

  async getCardTransactions(
    userId: string,
  ): Promise<CardExpenseWithRelations[]> {
    return this.prisma.transaction.findMany({
      where: {
        userId,
        isCardExpense: true,
      },
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

  async getCardTransactionByAccountId(
    userId: string,
    accountId: string,
  ): Promise<CardExpenseWithRelations | null> {
    return this.prisma.transaction.findFirst({
      where: {
        userId,
        sourceAccountId: accountId,
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        recurrence: true,
      },
    });
  }

  async getCardTransactionByMonth(
    userId: string,
    month: number,
    year: number,
  ): Promise<CardExpenseWithRelations[]> {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    return this.prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
        isCardExpense: true,
      },
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
}
