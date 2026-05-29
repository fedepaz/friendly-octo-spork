// backend/src/modules/transactions/transaction.service.ts

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  TransactionRepository,
  TransactionWithRelations,
} from '../../repositories/transaction.repository';
import { CreateTransactionInput, TransactionDTO } from '@repo/shared';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(private readonly transactionRepo: TransactionRepository) {}

  private mapToDTO(transaction: TransactionWithRelations): TransactionDTO {
    return {
      id: transaction.id,
      userId: transaction.userId,
      type: transaction.type,
      amount: transaction.amount.toNumber(),
      date: transaction.date,
      description: transaction.description,
      categoryId: transaction.category?.id,
      sourceAccountId: transaction.sourceAccount?.id,
      targetAccountId: transaction.targetAccount?.id,
      recurrenceId: transaction.recurrence?.id,
      recurrencePartNumber: transaction.recurrencePartNumber,
      isBudgetedExpense: transaction.isBudgetedExpense,
      budgetCategory: transaction.budgetCategory,
      isCardExpense: transaction.isCardExpense,
      cardType: transaction.cardType,
      source: transaction.source,
      metadata: transaction.metadata,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      category: transaction.category,
      sourceAccount: transaction.sourceAccount
        ? {
            ...transaction.sourceAccount,
            balance: transaction.sourceAccount.balance.toNumber(),
          }
        : null,
      targetAccount: transaction.targetAccount
        ? {
            ...transaction.targetAccount,
            balance: transaction.targetAccount.balance.toNumber(),
          }
        : null,
      recurrence: transaction.recurrence
        ? {
            ...transaction.recurrence,
            amount: transaction.recurrence.amount.toNumber(),
          }
        : null,
    };
  }

  async getTransactions(userId: string): Promise<TransactionDTO[]> {
    if (!userId) throw new Error('User id is required');
    this.logger.log(`Getting transactions for user ${userId}`);
    const response = await this.transactionRepo.getTransactions(userId);
    return response.map((transaction) => this.mapToDTO(transaction));
  }

  async getTransactionById(
    userId: string,
    id: string,
  ): Promise<TransactionDTO | null> {
    if (!userId) throw new Error('User id is required');
    this.logger.log(`Getting transaction ${id} for user ${userId}`);
    const response = await this.transactionRepo.getTransactionById(userId, id);
    if (!response) throw new NotFoundException('Transaction not found');
    return this.mapToDTO(response);
  }

  async saveTransaction(
    userId: string,
    transactionData: CreateTransactionInput,
  ): Promise<TransactionDTO> {
    if (!userId) throw new Error('User id is required');
    this.logger.log(
      `Saving transaction ${transactionData.type} for user ${userId}`,
    );
    const response = await this.transactionRepo.saveTransaction({
      ...transactionData,
      userId,
      metadata: transactionData.metadata ?? {},
    });
    return this.mapToDTO(response);
  }
}
