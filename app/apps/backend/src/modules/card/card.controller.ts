import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';
import { CardTransactionsWithRelations } from './repositories/card.repository';
import {
  CardCloseInputDTO,
  CardCloseResponseDTO,
  cardCloseSchema,
  CardStatementDTO,
} from '@repo/shared';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation-pipe';
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'cards', action: 'read' })
  async getCardTransactions(
    @CurrentUser() user: AuthUser,
  ): Promise<CardTransactionsWithRelations[]> {
    return this.cardService.getCardTransactions(user.id);
  }

  @Get('account/:accountId')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'cards', action: 'read' })
  async getCardTransactionByAccountId(
    @CurrentUser() user: AuthUser,
    @Param('accountId') accountId: string,
  ): Promise<CardTransactionsWithRelations | null> {
    return this.cardService.getCardTransactionByAccountId(user.id, accountId);
  }

  @Get('month/:year/:month')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'cards', action: 'read' })
  async getCardTransactionsByMonth(
    @CurrentUser() user: AuthUser,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ): Promise<CardStatementDTO> {
    return this.cardService.getCardTransactionsByMonth(user.id, year, month);
  }
  @Get('close/:year/:month')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'cards', action: 'read' })
  async getCardTransactionsForPayStatement(
    @CurrentUser() user: AuthUser,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ): Promise<CardStatementDTO> {
    return this.cardService.getCardTransactionsForPayStatement(
      user.id,
      year,
      month,
    );
  }

  @Post('close')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'cards', action: 'create' })
  async closeCard(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(cardCloseSchema)) data: CardCloseInputDTO,
  ): Promise<CardCloseResponseDTO> {
    return this.cardService.closeCard(user.id, data);
  }
}
