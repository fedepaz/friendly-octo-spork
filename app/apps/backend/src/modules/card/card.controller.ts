// backend/src/modules/card/card.controller.ts

import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CardService } from './card.service';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';
import { CardTransactionsWithRelations } from '../../repositories/card.repository';
import { CardStatementDTO } from '@repo/shared';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCardTransactions(
    @CurrentUser() user: AuthUser,
  ): Promise<CardTransactionsWithRelations[]> {
    return this.cardService.getCardTransactions(user.id);
  }

  @Get('account/:accountId')
  @HttpCode(HttpStatus.OK)
  async getCardTransactionByAccountId(
    @CurrentUser() user: AuthUser,
    @Param('accountId') accountId: string,
  ): Promise<CardTransactionsWithRelations | null> {
    return this.cardService.getCardTransactionByAccountId(user.id, accountId);
  }

  @Get('month/:year/:month')
  @HttpCode(HttpStatus.OK)
  async getCardTransactionsByMonth(
    @CurrentUser() user: AuthUser,
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<CardStatementDTO> {
    return this.cardService.getCardTransactionsByMonth(user.id, year, month);
  }
}
