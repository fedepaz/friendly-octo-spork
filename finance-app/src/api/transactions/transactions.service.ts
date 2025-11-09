// src/api/transactions/transactions.service.ts

import {
  prisma,
  TRANSACTION_INCLUDES,
  type TransactionWithRelations,
} from "@/lib/prisma";
import type {
  CreateTransactionInput,
  TransactionResponse,
} from "./transactions.schema";
import { Prisma, TransactionType } from "@/generated/prisma";

export class TransactionsService {
  private mapTransactionToResponse(
    tx: TransactionWithRelations
  ): TransactionResponse {
    return {
      id: tx.id,
      type: tx.type,
      amount: tx.amount.toNumber(), // Decimal → number
      date: tx.date,
      description: tx.description,
      metadata: tx.metadata as Record<string, unknown> | null,
      createdAt: tx.createdAt,
      updatedAt: tx.updatedAt,

      // Map category
      category: tx.category
        ? {
            id: tx.category.id,
            name: tx.category.name,
            type: tx.category.type,
            color: tx.category.color,
          }
        : null,

      // Map source account
      sourceAccount: tx.sourceAccount
        ? {
            id: tx.sourceAccount.id,
            name: tx.sourceAccount.name,
            type: tx.sourceAccount.type,
            currency: tx.sourceAccount.currency,
            balance: tx.sourceAccount.balance.toNumber(), // Decimal → number
          }
        : null,

      // Map target account
      targetAccount: tx.targetAccount
        ? {
            id: tx.targetAccount.id,
            name: tx.targetAccount.name,
            type: tx.targetAccount.type,
            currency: tx.targetAccount.currency,
            balance: tx.targetAccount.balance.toNumber(), // Decimal → number
          }
        : null,

      // Map recurrence
      recurrence: tx.recurrence
        ? {
            id: tx.recurrence.id,
            name: tx.recurrence.name,
            frequency: tx.recurrence.frequency,
            totalParts: tx.recurrence.totalParts,
            currentPart: tx.recurrence.currentPart,
            startDate: tx.recurrence.startDate,
            nextDate: tx.recurrence.nextDate,
            active: tx.recurrence.active,
          }
        : null,
    };
  }

  // Get by trasnsactionType and by month
  async getTransactionsByType(
    userId: string,
    transactionType: TransactionType,
    filters?: { month?: string }
  ): Promise<TransactionResponse[]> {
    const whereClause: Prisma.TransactionWhereInput = {
      userId,
      type: transactionType,
    };
    if (filters?.month) {
      const [year, month] = filters.month.split("-");
      if (!year || !month) return [];
      whereClause.date = {
        gte: new Date(+year, +month - 1, 1),
        lte: new Date(+year, +month, 1),
      };
    }
    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        recurrence: true,
      },
      orderBy: { date: "desc" },
    });

    return transactions.map((tx) => this.mapTransactionToResponse(tx));
  }

  // GET transaction by id
  async getTransactionById(
    transactionId: number
  ): Promise<TransactionResponse> {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: TRANSACTION_INCLUDES,
    });

    if (!transaction) {
      throw new Error(`Transaction with id ${transactionId} not found`);
      // Or return a default/empty response if your design allows it
    }
    return this.mapTransactionToResponse(transaction);
  }

  // CREATE transaction with balance updates
  async createTransaction(userId: string, data: CreateTransactionInput) {
    return await prisma.$transaction(async (tx) => {
      // 1. Create the transaction
      const transaction = await tx.transaction.create({
        data: {
          userId,
          type: data.type,
          amount: new Prisma.Decimal(data.amount),
          date: data.date,
          description: data.description,
          categoryId: data.categoryId,
          sourceAccountId: data.sourceAccountId,
          targetAccountId: data.targetAccountId,
          recurrenceId: data.recurrenceId,
          metadata: data.metadata as Prisma.InputJsonValue,
        },
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
        },
      });

      // 2. Update account balances based on transaction type
      switch (data.type) {
        case "EXPENSE":
        case "PAYMENT":
          if (data.sourceAccountId) {
            await tx.account.update({
              where: { id: data.sourceAccountId },
              data: {
                balance: {
                  decrement: new Prisma.Decimal(data.amount),
                },
              },
            });
          }
          break;

        case "INCOME":
        case "RETURN":
          if (data.targetAccountId) {
            await tx.account.update({
              where: { id: data.targetAccountId },
              data: {
                balance: {
                  increment: new Prisma.Decimal(data.amount),
                },
              },
            });
          }
          break;

        case "TRANSFER":
          if (data.sourceAccountId && data.targetAccountId) {
            // Deduct from source
            await tx.account.update({
              where: { id: data.sourceAccountId },
              data: {
                balance: {
                  decrement: new Prisma.Decimal(data.amount),
                },
              },
            });

            // Add to target
            await tx.account.update({
              where: { id: data.targetAccountId },
              data: {
                balance: {
                  increment: new Prisma.Decimal(data.amount),
                },
              },
            });
          }
          break;

        case "INVESTMENT":
          if (data.sourceAccountId) {
            await tx.account.update({
              where: { id: data.sourceAccountId },
              data: {
                balance: {
                  decrement: new Prisma.Decimal(data.amount),
                },
              },
            });
          }
          break;
      }

      // 3. Update recurrence if linked
      if (data.recurrenceId) {
        const recurrence = await tx.recurrence.findUnique({
          where: { id: data.recurrenceId },
        });

        if (recurrence) {
          const newCurrentPart = (recurrence.currentPart || 0) + 1;
          const isComplete =
            recurrence.totalParts !== null &&
            newCurrentPart >= recurrence.totalParts;

          // Calculate next date based on frequency
          const nextDate = this.calculateNextDate(
            data.date,
            recurrence.frequency
          );

          await tx.recurrence.update({
            where: { id: data.recurrenceId },
            data: {
              currentPart: newCurrentPart,
              nextDate: isComplete ? null : nextDate,
              active: !isComplete,
            },
          });
        }
      }

      return transaction;
    });
  }

  // Helper: Calculate next recurrence date
  private calculateNextDate(
    currentDate: Date,
    frequency: "MONTHLY" | "WEEKLY" | "YEARLY" | "INSTALLMENT"
  ): Date {
    const next = new Date(currentDate);

    switch (frequency) {
      case "MONTHLY":
      case "INSTALLMENT":
        next.setMonth(next.getMonth() + 1);
        break;
      case "WEEKLY":
        next.setDate(next.getDate() + 7);
        break;
      case "YEARLY":
        next.setFullYear(next.getFullYear() + 1);
        break;
    }

    return next;
  }
}
