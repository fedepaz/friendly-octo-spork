// src/api/transactions/transactions.service.ts

import { prisma } from "@/lib/prisma";
import type { CreateTransactionInput } from "./transactions.schema";
import { Prisma } from "@/generated/prisma";

export class TransactionsService {
  async getTransactions(userId: string) {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        recurrence: true,
      },
      orderBy: { date: "desc" },
    });

    return transactions;
  }

  // Get categories for form dropdown
  async getCategories(userId: string) {
    return await prisma.category.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });
  }

  // Get accounts for form dropdown
  async getAccounts(userId: string) {
    return await prisma.account.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });
  }

  // Get active recurrences for form dropdown
  async getActiveRecurrences(userId: string) {
    return await prisma.recurrence.findMany({
      where: { userId, active: true },
      orderBy: { name: "asc" },
    });
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

  // DELETE transaction (with balance reversal)
  async deleteTransaction(userId: string, transactionId: number) {
    return await prisma.$transaction(async (tx) => {
      // Get transaction before deleting
      const transaction = await tx.transaction.findUnique({
        where: { id: transactionId, userId },
      });

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      // Reverse balance updates
      switch (transaction.type) {
        case "EXPENSE":
        case "PAYMENT":
          if (transaction.sourceAccountId) {
            await tx.account.update({
              where: { id: transaction.sourceAccountId },
              data: {
                balance: {
                  increment: transaction.amount, // Reverse deduction
                },
              },
            });
          }
          break;

        case "INCOME":
        case "RETURN":
          if (transaction.targetAccountId) {
            await tx.account.update({
              where: { id: transaction.targetAccountId },
              data: {
                balance: {
                  decrement: transaction.amount, // Reverse addition
                },
              },
            });
          }
          break;

        case "TRANSFER":
          if (transaction.sourceAccountId && transaction.targetAccountId) {
            await tx.account.update({
              where: { id: transaction.sourceAccountId },
              data: { balance: { increment: transaction.amount } },
            });
            await tx.account.update({
              where: { id: transaction.targetAccountId },
              data: { balance: { decrement: transaction.amount } },
            });
          }
          break;

        case "INVESTMENT":
          if (transaction.sourceAccountId) {
            await tx.account.update({
              where: { id: transaction.sourceAccountId },
              data: { balance: { increment: transaction.amount } },
            });
          }
          break;
      }

      // Delete transaction
      await tx.transaction.delete({
        where: { id: transactionId },
      });

      return transaction;
    });
  }
}
