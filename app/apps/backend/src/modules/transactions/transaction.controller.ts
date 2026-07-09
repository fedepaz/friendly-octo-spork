import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import {
  CreateTransactionInput,
  createTransactionSchema,
  PaginatedResponse,
  TransactionDTO,
} from '@repo/shared';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation-pipe';
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'transactions', action: 'read' })
  async getTransactions(
    @CurrentUser() user: AuthUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ): Promise<PaginatedResponse<TransactionDTO>> {
    return this.transactionService.getTransactions(user.id, page, limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'transactions', action: 'read' })
  async getTransactionById(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<TransactionDTO | null> {
    return this.transactionService.getTransactionById(user.id, id);
  }

  @Get('month/:month/:year')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'transactions', action: 'read' })
  async getTransactionsByMonth(
    @CurrentUser() user: AuthUser,
    @Param('month', ParseIntPipe) month: number,
    @Param('year', ParseIntPipe) year: number,
  ): Promise<TransactionDTO[]> {
    return this.transactionService.getTransactionsByMonth(user.id, month, year);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RequirePermission({ tableName: 'transactions', action: 'create' })
  async saveTransaction(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(createTransactionSchema))
    transactionData: CreateTransactionInput,
  ): Promise<TransactionDTO> {
    return this.transactionService.saveTransaction(user.id, transactionData);
  }
}
