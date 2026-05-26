// backend/src/repositories/transaction.repository.ts

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../infra/prisma/prisma.service';

export type TransactionWithRelations = Prisma.TransactionGetPayload<{
  include: {
    category: true;
    sourceAccount: true;
    targetAccount: true;
    recurrence: true;
  };
}>;

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async getTransactions(
    userId: string,
    filters?: { startDate?: Date; endDate?: Date },
  ): Promise<TransactionWithRelations[]> {
    const where: Prisma.TransactionWhereInput = {
      userId,
    };

    if (filters?.startDate || filters?.endDate) {
      where.date = {
        gte: filters.startDate,
        lte: filters.endDate,
      };
    }

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
}
