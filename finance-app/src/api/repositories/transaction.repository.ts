// src/api/repositories/transaction.repository.ts

import type { Prisma, Transaction } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export type TransactionWithRelations = Prisma.TransactionGetPayload<{
  include: {
    category: true;
    sourceAccount: true;
    targetAccount: true;
    recurrence: true;
  };
}>;

export class TransactionRepository {
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

    return await prisma.transaction.findMany({
      where,
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        recurrence: true,
      },
      orderBy: {
        date: "desc",
      },
    });
  }

  async getTransactionById(
    userId: string,
    id: string,
  ): Promise<TransactionWithRelations | null> {
    return await prisma.transaction.findFirst({
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
    const client = tx || prisma;
    return await client.transaction.create({
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
