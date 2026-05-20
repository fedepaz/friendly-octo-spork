// src/api/repositories/transaction.repository.ts

import type { Prisma, Transaction } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export class TransactionRepository {
  async getTransactions(userId: string): Promise<Transaction[]> {
    return await prisma.transaction.findMany({
      where: {
        userId,
      },
    });
  }

  async getTransactionById(id: number): Promise<Transaction | null> {
    return await prisma.transaction.findFirst({
      where: {
        id,
      },
    });
  }

  async saveTransaction(
    data: Prisma.TransactionUncheckedCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Transaction> {
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
