// backend/src/repositories/card.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma/prisma.service';
import { RecurrenceWithRelations } from './recurrence.repository';
import { Prisma } from '@prisma/client';
import { TransactionWithRelations } from './transaction.repository';

export type CardTransactionsWithRelations = Prisma.TransactionGetPayload<{
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
  ): Promise<CardTransactionsWithRelations[]> {
    return this.prisma.transaction.findMany({
      where: {
        userId,
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
  ): Promise<CardTransactionsWithRelations | null> {
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
  ): Promise<CardTransactionsWithRelations[]> {
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
  // Investigations
  async getMonthlyStatement(
    userId: string,
    year: number,
    month: number,
  ): Promise<{
    recurrences: RecurrenceWithRelations[];
    oneTimers: TransactionWithRelations[];
    payments: TransactionWithRelations[];
  }> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    const lastMonthStartDate = new Date(year, month - 2, 1);
    const lastMonthEndDate = new Date(year, month - 1, 0, 23, 59, 59);

    // ── All 3 queries are independent — run in parallel ──────────────────────
    const [oneTimers, payments, recurrences] = await Promise.all([
      // 1. Last month's card one-timers
      this.prisma.transaction.findMany({
        where: {
          userId,
          date: {
            gte: lastMonthStartDate,
            lte: lastMonthEndDate,
          },
          OR: [{ isCardExpense: true, recurrenceId: null }],
        },
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
          recurrence: true,
        },
      }),
      // 2. This month's card payments
      this.prisma.transaction.findMany({
        where: {
          userId,
          type: 'TRANSFER',
          targetAccount: { type: 'CARD' },
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
          recurrence: true,
        },
      }),
      // 3. Active card recurrences
      this.prisma.recurrence.findMany({
        where: {
          userId,
          isCardExpense: true,
          active: true,
          startDate: { lte: endDate },
          OR: [{ endDate: { gte: startDate } }, { endDate: null }],
        },
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
        },
      }),
    ]);

    return { recurrences, oneTimers, payments };
  }

  async getMonthlyForPayStatement(
    userId: string,
    year: number,
    month: number,
  ): Promise<{
    recurrences: RecurrenceWithRelations[];
    oneTimers: TransactionWithRelations[];
    payments: TransactionWithRelations[];
  }> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    const lastMonthStartDate = new Date(year, month - 2, 1);
    const lastMonthEndDate = new Date(year, month - 1, 0, 23, 59, 59);
    // 0. Get recurrences that are closed
    const closedRecurrences = await this.prisma.transaction.findMany({
      where: {
        userId,
        source: {
          contains: 'CARD-CLOSE',
        },
        date: {
          gte: lastMonthStartDate,
          lte: lastMonthEndDate,
        },
        recurrenceId: {
          not: null,
        },
      },
      select: {
        recurrenceId: true,
      },
    });

    const closedRecurrencesIds = closedRecurrences
      .map((t) => t.recurrenceId)
      .filter(Boolean) as string[];

    const closedTransactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        source: {
          contains: 'CARD-CLOSE',
        },
        date: {
          gte: lastMonthStartDate,
          lte: lastMonthEndDate,
        },
        id: {
          notIn: closedRecurrencesIds.length ? closedRecurrencesIds : [''],
        },
      },
      select: {
        id: true,
      },
    });

    const closedTransactionsIds = closedTransactions.map((t) => t.id);

    // ── All 3 queries are independent — run in parallel ──────────────────────
    const [oneTimers, payments, recurrences] = await Promise.all([
      // 1. Last month's card one-timers
      this.prisma.transaction.findMany({
        where: {
          userId,
          date: {
            gte: lastMonthStartDate,
            lte: lastMonthEndDate,
          },
          OR: [{ isCardExpense: true, recurrenceId: null }],
          id: {
            notIn: closedTransactionsIds.length ? closedTransactionsIds : [''],
          },
        },
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
          recurrence: true,
        },
      }),
      // 2. This month's card payments
      this.prisma.transaction.findMany({
        where: {
          userId,
          type: 'TRANSFER',
          targetAccount: { type: 'CARD' },
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
          recurrence: true,
        },
      }),
      // 3. Active card recurrences
      this.prisma.recurrence.findMany({
        where: {
          userId,
          isCardExpense: true,
          active: true,
          startDate: { lte: endDate },
          OR: [{ endDate: { gte: startDate } }, { endDate: null }],
          id: {
            notIn: closedRecurrencesIds.length ? closedRecurrencesIds : [''],
          },
        },
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
        },
      }),
    ]);

    return { recurrences, oneTimers, payments };
  }
}
