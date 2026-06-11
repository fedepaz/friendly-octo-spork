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
import { CreateTransactionInput, TransactionDTO } from '@repo/shared';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { AccountRepository } from '../../repositories/account.repository';

import { RecurrenceService } from '../recurrences/recurrence.service';

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

    return this.prisma.$transaction(async (tx) => {
      // ─── Only update if this is na catual payment now
      const { isRecurrence, isFirstPayment, ..._data } = transactionData;
      const shouldUpdateBalance = !isRecurrence || isFirstPayment;

      // ─── 1. Update Account Balances ─────────────────────────────────────────
      if (shouldUpdateBalance) {
        await this.updateBalancesForType(transactionData, userId, amount, tx);
      }
      // ─── 2. Save Transaction Record ─────────────────────────────────────────

      const response = await this.transactionRepo.saveTransaction(
        {
          ...prismaData,
          userId,
          metadata: prismaData.metadata ? prismaData.metadata : Prisma.JsonNull,
        },
        tx,
      );
      // ─── 2. Create/Update Recurrence ────────────────────────────────────────
      await this.createOrUpdateRecurrence(transactionData, userId, tx);

      return this.mapToDTO(response);
    });
  }

  // ─── Extracted: Balance logic per transaction type ─────────────────────────
  private async updateBalancesForType(
    data: CreateTransactionInput,
    userId: string,
    amount: string | Prisma.DecimalJsLike,
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    const { type, sourceAccountId, targetAccountId } = data;

    switch (type) {
      case 'EXPENSE': {
        // Money leaves source account
        if (!sourceAccountId) {
          throw new BadRequestException('EXPENSE requires sourceAccountId');
        }
        await this.accountRepo.updateBalance(
          sourceAccountId,
          amount,
          'decrement',
          tx,
        );
        break;
      }

      case 'INCOME': {
        // Money enters target account
        if (!targetAccountId) {
          throw new BadRequestException('INCOME requires targetAccountId');
        }
        const account = await this.accountRepo.getAccountById(
          userId,
          targetAccountId,
        );
        if (account?.type === 'CARD') {
          throw new BadRequestException({
            code: 'ACCOUNT_TYPE_RESTRICTION',
            message:
              'Cannot add income directly to a card account (use a transfer instead)',
          });
        }
        await this.accountRepo.updateBalance(
          targetAccountId,
          amount,
          'increment',
          tx,
        );
        break;
      }

      case 'TRANSFER': {
        // Move money: source ↓, target ↑
        if (!sourceAccountId || !targetAccountId) {
          throw new BadRequestException(
            'TRANSFER requires both source and target accounts',
          );
        }
        await Promise.all([
          this.accountRepo.updateBalance(
            sourceAccountId,
            amount,
            'decrement',
            tx,
          ),
          this.accountRepo.updateBalance(
            targetAccountId,
            amount,
            'increment',
            tx,
          ),
        ]);
        break;
      }

      case 'INVESTMENT': {
        // Money moves from source to investment target (both are assets)
        if (!sourceAccountId || !targetAccountId) {
          throw new BadRequestException(
            'INVESTMENT requires both source and target accounts',
          );
        }
        await Promise.all([
          this.accountRepo.updateBalance(
            sourceAccountId,
            amount,
            'decrement',
            tx,
          ),
          this.accountRepo.updateBalance(
            targetAccountId,
            amount,
            'increment',
            tx,
          ),
        ]);
        break;
      }

      case 'RETURN': {
        // Investment return: source (investment) ↓, target (cash) ↑
        if (!sourceAccountId || !targetAccountId) {
          throw new BadRequestException(
            'RETURN requires both source and target accounts',
          );
        }
        await Promise.all([
          this.accountRepo.updateBalance(
            sourceAccountId,
            amount,
            'decrement',
            tx,
          ),
          this.accountRepo.updateBalance(
            targetAccountId,
            amount,
            'increment',
            tx,
          ),
        ]);
        break;
      }

      case 'PAYMENT': {
        // Money leaves source account
        if (!sourceAccountId) {
          throw new BadRequestException('EXPENSE requires sourceAccountId');
        }
        await this.accountRepo.updateBalance(
          sourceAccountId,
          amount,
          'decrement',
          tx,
        );
        break;
      }

      default: {
        // 🔒 Exhaustive check: TypeScript will error if a new type is added but not handled
        throw new BadRequestException(`Unhandled transaction type:`);
      }
    }
  }
  private async createOrUpdateRecurrence(
    data: CreateTransactionInput,
    userId: string,
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    // If it's not a recurrence and no ID is provided, do nothing
    if (!data.recurrenceId && !data.isRecurrence) {
      return;
    }

    if (data.recurrenceId) {
      // Update existing recurrence
      await this.recurrenceService.updateRecurrenceForTransaction(
        data.recurrenceId,
        userId,
        data,
        tx,
      );
    } else if (data.isRecurrence) {
      await this.recurrenceService.createRecurrenceForTransaction(
        data,
        userId,
        tx,
      );
    }
  }
}
