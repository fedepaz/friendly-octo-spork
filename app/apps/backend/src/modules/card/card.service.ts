// backend/src/modules/card/card.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  CardExpenseWithRelations,
  CardRepository,
} from '../../repositories/card.repository';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);
  constructor(private readonly cardRepo: CardRepository) {}

  async getCardTransactions(
    userId: string,
  ): Promise<CardExpenseWithRelations[]> {
    if (!userId) throw new BadRequestException('User ID is required');
    this.logger.log(`Getting card transactions for user ${userId}`);
    const cardTransactions = await this.cardRepo.getCardTransactions(userId);
    return cardTransactions;
  }
  async getCardTransactionByAccountId(
    userId: string,
    accountId: string,
  ): Promise<CardExpenseWithRelations | null> {
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
  ): Promise<CardExpenseWithRelations[]> {
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
