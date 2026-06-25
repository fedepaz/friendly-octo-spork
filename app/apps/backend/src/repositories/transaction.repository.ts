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
    page = 1,
    limit = 50,
  ): Promise<{ data: TransactionWithRelations[]; total: number }> {
    const where: Prisma.TransactionWhereInput = {
      userId,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where,
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
          recurrence: true,
        },
        orderBy: { date: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return { data, total };
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
}
