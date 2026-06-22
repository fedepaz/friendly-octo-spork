// backend/src/modules/transactions/transaction.service.ts

import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  TransactionRepository,
  TransactionWithRelations,
} from '../../repositories/transaction.repository';
import {
  CreateTransactionInput,
  RecurrenceDTO,
  TransactionDTO,
  TransactionType,
} from '@repo/shared';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../infra/prisma/prisma.service';
import {
  AccountRepository,
  AccountWithRelations,
} from '../../repositories/account.repository';

import { RecurrenceService } from '../recurrences/recurrence.service';

// ─── Account type rules ──────────────────────────────────────────────────────
const EXPENSE_SOURCES = ['BANK', 'WALLET', 'CASH', 'CARD'] as const;
const INCOME_TARGETS = ['BANK', 'WALLET', 'CASH'] as const;

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly accountRepo: AccountRepository,
    private readonly recurrenceService: RecurrenceService,
    private readonly prisma: PrismaService,
  ) {}

  private mapToDTO(transaction: TransactionWithRelations): TransactionDTO {
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
  }

  async getTransactions(userId: string): Promise<TransactionDTO[]> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting transactions for user ${userId}`);
    const response = await this.transactionRepo.getTransactions(userId);
    return response.map((transaction) => this.mapToDTO(transaction));
  }

  async getTransactionsByMonth(userId: string, month: number, year: number) {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting transactions for user ${userId}`);
    const response = await this.transactionRepo.getByMonth(userId, month, year);
    return response.map((transaction) => this.mapToDTO(transaction));
  }

  async getTransactionById(
    userId: string,
    id: string,
  ): Promise<TransactionDTO | null> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting transaction ${id} for user ${userId}`);
    const response = await this.transactionRepo.getTransactionById(userId, id);
    if (!response) throw new NotFoundException('Transaction not found');
    return this.mapToDTO(response);
  }

  async saveTransaction(
    userId: string,
    transactionData: CreateTransactionInput,
  ): Promise<TransactionDTO> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(
      `Saving transaction ${transactionData.type} for user ${userId}`,
    );

    const {
      isRecurrence: _isRecurrence,
      frequency: _frequency,
      totalParts: _totalParts,
      recurrenceName: _recurrenceName,
      isFirstPayment: _isFirstPayment,
      shouldStopRecurrence: _shouldStopRecurrence,
      ...prismaData
    } = transactionData;
    const amount = transactionData.amount;
    const sourceAccount = transactionData.sourceAccountId
      ? await this.accountRepo.getAccountById(
          userId,
          transactionData.sourceAccountId,
        )
      : null;

    const targetAccount = transactionData.targetAccountId
      ? await this.accountRepo.getAccountById(
          userId,
          transactionData.targetAccountId,
        )
      : null;

    // Validate first before transaction block
    this.validateAccountTypesForTransaction(
      transactionData.type,
      sourceAccount,
      targetAccount,
    );

    return this.prisma.$transaction(async (tx) => {
      // ─── Only update if this is na catual payment now
      const { isRecurrence, isFirstPayment, ..._data } = transactionData;
      const shouldUpdateBalance = !isRecurrence || isFirstPayment;

      // ─── 1. Update Account Balances ─────────────────────────────────────────
      if (shouldUpdateBalance) {
        await this.updateBalancesForType(
          transactionData,
          amount,
          tx,
          sourceAccount,
        );
      }

      // ─── 2. Create/Update Recurrence ────────────────────────────────────────
      const recurrenceData = await this.createOrUpdateRecurrence(
        transactionData,
        userId,
        tx,
      );

      // ─── 2. Save Transaction Record ─────────────────────────────────────────

      const response = await this.transactionRepo.saveTransaction(
        {
          ...prismaData,
          userId,
          recurrenceId: recurrenceData?.id,
          recurrencePartNumber: recurrenceData?.currentPart,
          metadata: prismaData.metadata ? prismaData.metadata : Prisma.JsonNull,
        },
        tx,
      );

      return this.mapToDTO(response);
    });
  }

  // ─── Extracted: Balance logic per transaction type ─────────────────────────
  private async updateBalancesForType(
    data: CreateTransactionInput,
    amount: string | Prisma.DecimalJsLike,
    tx: Prisma.TransactionClient,
    sourceAccount: AccountWithRelations | null,
  ): Promise<void> {
    const { type, sourceAccountId, targetAccountId } = data;

    switch (type) {
      case 'EXPENSE':
      case 'PAYMENT': {
        if (sourceAccount!.type === 'CARD') break; // recorded, not charged yet
        await this.accountRepo.updateBalance(
          sourceAccountId!,
          amount,
          'decrement',
          tx,
        );
        break;
      }
      case 'INCOME': {
        await this.accountRepo.updateBalance(
          targetAccountId!,
          amount,
          'increment',
          tx,
        );
        break;
      }
      case 'TRANSFER':
      case 'INVESTMENT':
      case 'RETURN': {
        await Promise.all([
          this.accountRepo.updateBalance(
            sourceAccountId!,
            amount,
            'decrement',
            tx,
          ),
          this.accountRepo.updateBalance(
            targetAccountId!,
            amount,
            'increment',
            tx,
          ),
        ]);
        break;
      }
    }
  }

  private validateAccountTypesForTransaction(
    type: TransactionType,
    sourceAccount: AccountWithRelations | null,
    targetAccount: AccountWithRelations | null,
  ): void {
    switch (type) {
      case 'EXPENSE':
      case 'PAYMENT': {
        if (!sourceAccount)
          throw new BadRequestException(`${type} requires a source account`);
        if (
          !(EXPENSE_SOURCES as readonly string[]).includes(sourceAccount.type)
        ) {
          throw new BadRequestException({
            code: 'ACCOUNT_TYPE_RESTRICTION',
            message: `${type} source account must be one of: ${EXPENSE_SOURCES.join(', ')}`,
          });
        }
        break;
      }
      case 'INCOME': {
        if (!targetAccount)
          throw new BadRequestException('INCOME requires a target account');
        if (
          !(INCOME_TARGETS as readonly string[]).includes(targetAccount.type)
        ) {
          throw new BadRequestException({
            code: 'ACCOUNT_TYPE_RESTRICTION',
            message: `INCOME target account must be one of: ${INCOME_TARGETS.join(', ')}`,
          });
        }
        break;
      }
      case 'TRANSFER': {
        if (!sourceAccount || !targetAccount) {
          throw new BadRequestException(
            'TRANSFER requires both source and target accounts',
          );
        }
        // any account type can participate in a transfer
        break;
      }
      case 'INVESTMENT': {
        if (!sourceAccount || !targetAccount) {
          throw new BadRequestException(
            'INVESTMENT requires both source and target accounts',
          );
        }
        if (sourceAccount.type === 'INVESTMENT') {
          throw new BadRequestException({
            code: 'ACCOUNT_TYPE_RESTRICTION',
            message: 'INVESTMENT source cannot be an investment account',
          });
        }
        if (targetAccount.type !== 'INVESTMENT') {
          throw new BadRequestException({
            code: 'ACCOUNT_TYPE_RESTRICTION',
            message: 'INVESTMENT target must be an investment account',
          });
        }
        break;
      }
      case 'RETURN': {
        if (!sourceAccount || !targetAccount) {
          throw new BadRequestException(
            'RETURN requires both source and target accounts',
          );
        }
        if (sourceAccount.type !== 'INVESTMENT') {
          throw new BadRequestException({
            code: 'ACCOUNT_TYPE_RESTRICTION',
            message: 'RETURN source must be an investment account',
          });
        }
        if (targetAccount.type === 'INVESTMENT') {
          throw new BadRequestException({
            code: 'ACCOUNT_TYPE_RESTRICTION',
            message: 'RETURN target cannot be an investment account',
          });
        }
        break;
      }
    }
  }
  private async createOrUpdateRecurrence(
    data: CreateTransactionInput,
    userId: string,
    tx: Prisma.TransactionClient,
  ): Promise<RecurrenceDTO | null> {
    // If it's not a recurrence and no ID is provided, do nothing
    if (!data.recurrenceId && !data.isRecurrence) {
      return null;
    }

    let response: RecurrenceDTO | null = null;

    if (data.recurrenceId) {
      // Update existing recurrence
      response = await this.recurrenceService.updateRecurrenceForTransaction(
        data.recurrenceId,
        userId,
        data,
        tx,
      );
    } else if (data.isRecurrence) {
      response = await this.recurrenceService.createRecurrenceForTransaction(
        data,
        userId,
        tx,
      );
    }
    return response;
  }

  async updateTransactionSource(
    userId: string,
    transactionId: string,
    source: string,
  ): Promise<void> {
    if (!userId) throw new BadRequestException('User id is required');
    if (!transactionId)
      throw new BadRequestException('Transaction id is required');
    this.logger.log(
      `Updating transaction ${transactionId} source for user ${userId}`,
    );
    await this.prisma.transaction.update({
      where: {
        id: transactionId,
        userId,
      },
      data: {
        source,
      },
    });
  }
}
