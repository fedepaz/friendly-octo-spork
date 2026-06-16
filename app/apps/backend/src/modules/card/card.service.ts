// backend/src/modules/card/card.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  CardRepository,
  CardTransactionsWithRelations,
} from '../../repositories/card.repository';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);
  constructor(private readonly cardRepo: CardRepository) {}

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
    month: number,
    year: number,
  ): Promise<CardTransactionsWithRelations[]> {
    if (!userId) throw new BadRequestException('User ID is required');
    this.logger.log(`Getting card transactions for user ${userId}`);
    const cardTransactions = await this.cardRepo.getCardTransactionByMonth(
      userId,
      month,
      year,
    );
    return cardTransactions;
  }
}
