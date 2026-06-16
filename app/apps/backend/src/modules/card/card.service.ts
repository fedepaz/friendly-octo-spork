// backend/src/modules/card/card.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  CardRepository,
  CardTransactionsWithRelations,
  MonthlyStatementLine,
} from '../../repositories/card.repository';
import { CardStatementItem } from '@repo/shared';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);
  constructor(private readonly cardRepo: CardRepository) {}

  private mapToCardTransactionDTO(
    row: MonthlyStatementLine,
  ): CardStatementItem {
    return {
      sourceId: row.source_id,
      sourceType: row.source_type,
      description: row.description,
      amount: row.amount.toString(),
      date: row.date,
      installmentInfo: row.installment_info,
      cardType: row.card_type,
      category: row.category_id
        ? {
            id: row.category_id,
            name: row.category_name!,
            color: row.category_color,
          }
        : null,
      sourceAccount: row.source_account_id
        ? {
            id: row.source_account_id,
            name: row.source_account_name!,
          }
        : null,
      targetAccount: row.target_account_id
        ? {
            id: row.target_account_id,
            name: row.target_account_name!,
          }
        : null,
      runningBalance: row.running_balance.toString(),
    };
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
  ): Promise<CardStatementItem[]> {
    if (!userId) throw new BadRequestException('User ID is required');
    this.logger.log(
      `Getting card transactions for user ${userId} in ${year}/${month}`,
    );
    const cardTransactions = await this.cardRepo.getMonthlyStatement(
      userId,
      year,
      month,
    );
    this.logger.debug(`Got ${cardTransactions.length} card transactions`);
    return cardTransactions.map((row) => this.mapToCardTransactionDTO(row));
  }
}
