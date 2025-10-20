// src/api/transactions/transactions.service.ts
import { prisma } from "../../lib/prisma";
import type { CreateTransactionInput, UpdateTransactionInput, TransactionFilter } from "./transactions.schema";
import { TransactionType } from "../../lib/prisma";

export class TransactionsService {
  async getTransactions(userId: string, filters: TransactionFilter) {
    const { startDate, endDate, type, categoryId, sourceAccountId, targetAccountId, recurrenceId, limit, offset } = filters;

    return await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
        type: type || undefined,
        categoryId: categoryId || undefined,
        sourceAccountId: sourceAccountId || undefined,
        targetAccountId: targetAccountId || undefined,
        recurrenceId: recurrenceId || undefined,
      },
      include: { category: true, sourceAccount: true, targetAccount: true, recurrence: true },
      orderBy: { date: "desc" },
      take: limit || 50,
      skip: offset || 0,
    });
  }

  async getTransactionById(userId: string, id: number) {
    return await prisma.transaction.findFirst({
      where: { id, userId },
      include: { category: true, sourceAccount: true, targetAccount: true, recurrence: true },
    });
  }

  async createTransaction(userId: string, data: CreateTransactionInput) {
    // Handle balance updates for source and target accounts
    const transaction = await prisma.$transaction(async (tx) => {
      const newTransaction = await tx.transaction.create({
        data: {
          ...data,
          userId,
          amount: data.amount,
          date: new Date(data.date),
        },
      });

      if (data.sourceAccountId && data.type === TransactionType.EXPENSE) {
        await tx.account.update({
          where: { id: data.sourceAccountId, userId },
          data: { balance: { decrement: data.amount } },
        });
      }

      if (data.targetAccountId && data.type === TransactionType.INCOME) {
        await tx.account.update({
          where: { id: data.targetAccountId, userId },
          data: { balance: { increment: data.amount } },
        });
      }

      // Handle transfers
      if (data.sourceAccountId && data.targetAccountId && data.type === TransactionType.TRANSFER) {
        await tx.account.update({
          where: { id: data.sourceAccountId, userId },
          data: { balance: { decrement: data.amount } },
        });
        await tx.account.update({
          where: { id: data.targetAccountId, userId },
          data: { balance: { increment: data.amount } },
        });
      }

      return newTransaction;
    });

    return transaction;
  }

  async updateTransaction(userId: string, id: number, data: UpdateTransactionInput) {
    // This is a simplified update. A full implementation would need to reverse
    // previous balance changes and apply new ones based on the updated data.
    return await prisma.transaction.update({
      where: { id, userId },
      data: {
        ...data,
        amount: data.amount,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  }

  async deleteTransaction(userId: string, id: number) {
    // This is a simplified delete. A full implementation would need to reverse
    // any balance changes made by the original transaction.
    return await prisma.transaction.delete({
      where: { id, userId },
    });
  }
}