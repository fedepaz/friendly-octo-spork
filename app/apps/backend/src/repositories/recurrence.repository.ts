// backend/src/repositories/recurrence.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { TransactionType } from 'generated/prisma';

export type RecurrenceWithRelations = Prisma.RecurrenceGetPayload<{
  include: {
    category: true;
    sourceAccount: true;
    targetAccount: true;
  };
}>;

@Injectable()
export class RecurrenceRepository {
  constructor(private prisma: PrismaService) {}

  async getRecurrences(userId: string): Promise<RecurrenceWithRelations[]> {
    return this.prisma.recurrence.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
      },
    });
  }

  async getRecurrenceById(
    userId: string,
    id: string,
  ): Promise<RecurrenceWithRelations | null> {
    return this.prisma.recurrence.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
      },
    });
  }

  async saveRecurrence(
    data: Prisma.RecurrenceUncheckedCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<RecurrenceWithRelations> {
    const client = tx || this.prisma;
    return client.recurrence.create({
      data,
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
      },
    });
  }

  async updateRecurrence(
    id: string,
    data: Prisma.RecurrenceUncheckedUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<RecurrenceWithRelations> {
    const client = tx || this.prisma;
    return client.recurrence.update({
      where: { id },
      data,
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
      },
    });
  }
  /**
   * Get active recurrences that are relevant for a given month.
   *
   * A recurrence is "active in month X" if:
   * - It started on or before the end of that month
   * - AND it hasn't ended before that month started (or has no end date)
   * - AND active === true
   */
  async getByMonthByTransactionType(
    userId: string,
    month: number, // 1-12
    year: number,
    transactionType: TransactionType,
  ): Promise<RecurrenceWithRelations[]> {
    // Calculate month boundaries
    const startOfMonth = new Date(year, month - 1, 1); // First day, 00:00:00
    const endOfMonth = new Date(year, month, 0, 23, 59, 59); // Last day, 23:59:59

    return this.prisma.recurrence.findMany({
      where: {
        userId,
        // Recurrence must have started on or before the end of this month
        startDate: { lte: endOfMonth },
        // AND either:
        // - It ends on or after the start of this month, OR
        // - It has no end date (ongoing)
        OR: [{ endDate: { gte: startOfMonth } }, { endDate: null }],
        type: transactionType,
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
      },
      // Order by next occurrence date (soonest first), with nulls last
      orderBy: [
        { currentPart: 'desc' },
        { nextDate: { sort: 'asc', nulls: 'last' } },
      ],
    });
  }
}
