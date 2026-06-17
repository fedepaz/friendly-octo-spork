// backend/src/modules/card/card.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  CardRepository,
  CardTransactionsWithRelations,
} from '../../repositories/card.repository';
import { CardStatementDTO, RecurrenceDTO, TransactionDTO } from '@repo/shared';
import { TransactionWithRelations } from '../../repositories/transaction.repository';
import { RecurrenceWithRelations } from '../../repositories/recurrence.repository';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);
  constructor(private readonly cardRepo: CardRepository) {}

  private mapToCardTransactionDTO(
    cardTransactions: TransactionWithRelations[],
  ): TransactionDTO[] {
    return cardTransactions.map((transaction) => {
      return {
        id: transaction.id,
        userId: transaction.userId,
        type: transaction.type,
        amount: transaction.amount.toString(),
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
              balance: transaction.sourceAccount.balance.toString(),
            }
          : null,
        targetAccount: transaction.targetAccount
          ? {
              ...transaction.targetAccount,
              balance: transaction.targetAccount.balance.toString(),
            }
          : null,
        recurrence: transaction.recurrence
          ? {
              ...transaction.recurrence,
              amount: transaction.recurrence.amount.toString(),
            }
          : null,
      };
    });
  }
  private mapToCardRecurrenceDTO(
    recurrences: RecurrenceWithRelations[],
  ): RecurrenceDTO[] {
    return recurrences.map((recurrence) => {
      return {
        id: recurrence.id,
        userId: recurrence.userId,
        name: recurrence.name,
        type: recurrence.type,
        amount: recurrence.amount.toString(),
        frequency: recurrence.frequency,
        totalParts: recurrence.totalParts,
        currentPart: recurrence.currentPart,
        startDate: recurrence.startDate,
        nextDate: recurrence.nextDate,
        endDate: recurrence.endDate,
        active: recurrence.active,
        categoryId: recurrence.category?.id,
        sourceAccountId: recurrence.sourceAccount?.id,
        targetAccountId: recurrence.targetAccount?.id,
        isCardExpense: recurrence.isCardExpense,
        cardType: recurrence.cardType,
        metadata: recurrence.metadata,
        category: recurrence.category,
        sourceAccount: recurrence.sourceAccount
          ? {
              ...recurrence.sourceAccount,
              balance: recurrence.sourceAccount.balance.toString(),
            }
          : null,
        targetAccount: recurrence.targetAccount
          ? {
              ...recurrence.targetAccount,
              balance: recurrence.targetAccount.balance.toString(),
            }
          : null,
      };
    });
  }

  async getCardTransactions(
    userId: string,
  ): Promise<CardTransactionsWithRelations[]> {
    if (!userId) throw new BadRequestException('User ID is required');
    this.logger.log(`Getting card transactions for user ${userId}`);
    const cardTransactions = await this.cardRepo.getCardTransactions(userId);
    return cardTransactions;
  }
  async getCardTransactionByAccountId(
    userId: string,
    accountId: string,
  ): Promise<CardTransactionsWithRelations | null> {
    if (!userId) throw new BadRequestException('User ID is required');
    this.logger.log(`Getting card transactions for user ${userId}`);
    const cardTransaction = await this.cardRepo.getCardTransactionByAccountId(
      userId,
      accountId,
    );
    if (!cardTransaction) throw new BadRequestException('Card not found');
    return cardTransaction;
  }

  async getCardTransactionsByMonth(
    userId: string,
    year: number,
    month: number,
  ): Promise<CardStatementDTO> {
    if (!userId) throw new BadRequestException('User ID is required');
    this.logger.log(
      `Getting card transactions for user ${userId} in ${year}/${month}`,
    );
    const response = await this.cardRepo.getMonthlyStatement(
      userId,
      year,
      month,
    );
    return {
      transactions: this.mapToCardTransactionDTO(response.transactions),
      pendingRecurrences: this.mapToCardRecurrenceDTO(
        response.pendingRecurrences,
      ),
    };
  }
}
