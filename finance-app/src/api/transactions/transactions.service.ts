// src/api/transactions/transactions.service.ts

import {
  TransactionRepository,
  type TransactionWithRelations,
} from "../repositories/transaction.repository";
import { AccountRepository } from "../repositories/account.repository";
import { RecurrenceRepository } from "../repositories/recurrence.repository";
import {
  type CreateTransactionInput,
  type TransactionDTO,
  validateTransactionType,
} from "./transactions.schema";
import { Prisma, TransactionType, RecurrenceType } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { calculateNextDate } from "@/lib/date-utils";

export class TransactionsService {
  private transactionRepository = new TransactionRepository();
  private accountRepository = new AccountRepository();
  private recurrenceRepository = new RecurrenceRepository();

  private mapToTransactionDTO(
    transaction: TransactionWithRelations,
  ): TransactionDTO {
    return {
      ...transaction,
      amount: Number(transaction.amount),
      recurrencePartNumber: transaction.recurrencePartNumber ?? null,
      isBudgetedExpense: transaction.isBudgetedExpense ?? null,
      budgetCategory: transaction.budgetCategory ?? null,
      isCardExpense: transaction.isCardExpense ?? null,
      cardType: transaction.cardType ?? null,
      source: transaction.source ?? null,
      metadata: transaction.metadata as Record<string, unknown> | null,
      category: transaction.category
        ? {
            ...transaction.category,
            color: transaction.category.color ?? null,
          }
        : null,
      sourceAccount: transaction.sourceAccount
        ? {
            ...transaction.sourceAccount,
            balance: Number(transaction.sourceAccount.balance),
          }
        : null,
      targetAccount: transaction.targetAccount
        ? {
            ...transaction.targetAccount,
            balance: Number(transaction.targetAccount.balance),
          }
        : null,
      recurrence: transaction.recurrence
        ? {
            ...transaction.recurrence,
            amount: Number(transaction.recurrence.amount),
            totalParts: transaction.recurrence.totalParts ?? null,
            currentPart: transaction.recurrence.currentPart ?? null,
            nextDate: transaction.recurrence.nextDate ?? null,
            endDate: transaction.recurrence.endDate ?? null,
            categoryId: transaction.recurrence.categoryId ?? null,
            sourceAccountId: transaction.recurrence.sourceAccountId ?? null,
            targetAccountId: transaction.recurrence.targetAccountId ?? null,
            isCardExpense: transaction.recurrence.isCardExpense ?? null,
            cardType: transaction.recurrence.cardType ?? null,
            metadata: transaction.recurrence.metadata,
          }
        : null,
    };
  }

  async findAllTransactions(
    userId: string,
    month?: string,
  ): Promise<TransactionDTO[]> {
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
    return transactions.map((transaction) =>
      this.mapToTransactionDTO(transaction),
    );
  }

  async findTransactionById(
    userId: string,
    transactionId: string,
  ): Promise<TransactionDTO> {
    if (!transactionId) {
      throw new Error("Transaction id is required");
    }

    if (!userId) {
      throw new Error("User id is required");
    }
    const transaction = await this.transactionRepository.getTransactionById(
      userId,
      transactionId,
    );

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return this.mapToTransactionDTO(transaction);
  }

  async createTransaction(
    userId: string,
    data: CreateTransactionInput,
  ): Promise<TransactionDTO> {
    // 1. Validation
    const { isValid, errors } = validateTransactionType(data);
    if (!isValid) {
      throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
    }

    // 2. Atomic Transaction
    const result = await prisma.$transaction(async (tx) => {
      const amount = new Prisma.Decimal(data.amount);

      // A. Handle Recurrence (Existing or New)
      let finalRecurrenceId = data.recurrenceId;
      let partNumber = undefined;

      if (data.isRecurrence && data.frequency) {
        // Create new recurrence
        const recurrence = await this.recurrenceRepository.saveRecurrence(
          {
            userId,
            name: data.description,
            type: data.type,
            amount,
            frequency: data.frequency as RecurrenceType,
            totalParts: data.totalParts,
            currentPart: 1,
            startDate: new Date(data.date),
            nextDate: calculateNextDate(
              new Date(data.date),
              data.frequency as RecurrenceType,
            ),
            categoryId: data.categoryId,
            sourceAccountId: data.sourceAccountId,
            targetAccountId: data.targetAccountId,
          },
          tx,
        );
        finalRecurrenceId = recurrence.id;
        partNumber = 1;
      } else if (data.recurrenceId) {
        // Update existing recurrence
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
            recurrence.frequency,
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
          partNumber = newCurrentPart;
        }
      }

      // B. Create the transaction row
      const finalData = {
        type: data.type,
        amount,
        date: new Date(data.date),
        description: data.description,
        categoryId: data.categoryId,
        sourceAccountId: data.sourceAccountId,
        targetAccountId: data.targetAccountId,
        userId,
        recurrenceId: finalRecurrenceId,
        recurrencePartNumber: partNumber,
        metadata: data.metadata as Prisma.InputJsonValue,
      };

      const transaction = await this.transactionRepository.saveTransaction(
        finalData,
        tx,
      );

      // C. Update Account balance(s)
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

      return transaction;
    });

    return this.mapToTransactionDTO(result);
  }
}
