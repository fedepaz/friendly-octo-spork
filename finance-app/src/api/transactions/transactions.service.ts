// src/api/transactions/transactions.service.ts

import { TransactionRepository } from "../repositories/transaction.repository";
import { AccountRepository } from "../repositories/account.repository";
import { RecurrenceRepository } from "../repositories/recurrence.repository";
import {
  type CreateTransactionInput,
  validateTransactionType,
} from "./transactions.schema";
import { Prisma, TransactionType, RecurrenceType } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { calculateNextDate } from "@/lib/date-utils";

export class TransactionsService {
  private transactionRepository = new TransactionRepository();
  private accountRepository = new AccountRepository();
  private recurrenceRepository = new RecurrenceRepository();

  async findAllTransactions(userId: string, month?: string) {
    if (!userId) {
      throw new Error("User id is required");
    }

    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (month) {
      const [year, m] = month.split("-").map(Number);
      if (year && m) {
        startDate = new Date(year, m - 1, 1);
        endDate = new Date(year, m, 0, 23, 59, 59, 999); // Last day of the month
      }
    }

    const transactions = await this.transactionRepository.getTransactions(
      userId,
      { startDate, endDate },
    );

    if (!transactions) {
      throw new Error("Transactions not found");
    }
    return transactions;
  }

  async findTransactionById(transactionId: number) {
    if (!transactionId) {
      throw new Error("Transaction id is required");
    }
    const transaction =
      await this.transactionRepository.getTransactionById(transactionId);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return transaction;
  }

  async createTransaction(userId: string, data: CreateTransactionInput) {
    // 1. Validation
    const { isValid, errors } = validateTransactionType(data);
    if (!isValid) {
      throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
    }

    // 2. Atomic Transaction
    return await prisma.$transaction(async (tx) => {
      const amount = new Prisma.Decimal(data.amount);

      // A. Create the transaction row
      const transaction = await this.transactionRepository.saveTransaction(
        {
          ...data,
          userId,
          amount,
          date: new Date(data.date),
        },
        tx,
      );

      // B. Update Account balance(s)
      switch (data.type) {
        case TransactionType.EXPENSE:
        case TransactionType.PAYMENT:
          if (data.sourceAccountId) {
            await this.accountRepository.updateBalance(
              data.sourceAccountId,
              amount,
              "decrement",
              tx,
            );
          }
          break;

        case TransactionType.INCOME:
          if (data.targetAccountId) {
            await this.accountRepository.updateBalance(
              data.targetAccountId,
              amount,
              "increment",
              tx,
            );
          }
          break;

        case TransactionType.TRANSFER:
        case TransactionType.INVESTMENT:
          if (data.sourceAccountId) {
            await this.accountRepository.updateBalance(
              data.sourceAccountId,
              amount,
              "decrement",
              tx,
            );
          }
          if (data.targetAccountId) {
            await this.accountRepository.updateBalance(
              data.targetAccountId,
              amount,
              "increment",
              tx,
            );
          }
          break;

        case TransactionType.RETURN:
          if (data.targetAccountId) {
            await this.accountRepository.updateBalance(
              data.targetAccountId,
              amount,
              "increment",
              tx,
            );
          }
          break;
      }

      // C. Update Recurrence progress
      if (data.recurrenceId) {
        const recurrence = await this.recurrenceRepository.getRecurrenceById(
          data.recurrenceId,
        );

        if (recurrence && recurrence.userId === userId) {
          const newCurrentPart = recurrence.currentPart + 1;
          const isActive = recurrence.totalParts
            ? newCurrentPart < recurrence.totalParts
            : true;

          const nextDate = calculateNextDate(
            recurrence.nextDate || new Date(),
            recurrence.frequency as RecurrenceType,
          );

          await this.recurrenceRepository.updateRecurrence(
            recurrence.id,
            {
              currentPart: newCurrentPart,
              active: isActive,
              nextDate: isActive ? nextDate : null,
            },
            tx,
          );
        }
      }

      return transaction;
    });
  }
}
