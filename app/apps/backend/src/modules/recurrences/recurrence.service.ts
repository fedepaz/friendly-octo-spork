// backend/src/modules/recurrences/recurrence.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  RecurrenceRepository,
  RecurrenceWithRelations,
} from '../../repositories/recurrence.repository';
import {
  CreateTransactionInput,
  RecurrenceDTO,
  RecurrenceTimelineDTO,
  RecurrenceType,
  RecurrenceTypeSchema,
} from '@repo/shared';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecurrenceService {
  private readonly logger = new Logger(RecurrenceService.name);

  constructor(private readonly recurrenceRepo: RecurrenceRepository) {}

  async getRecurrences(userId: string): Promise<RecurrenceDTO[]> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting recurrences for user ${userId}`);
    const recurrences = await this.recurrenceRepo.getRecurrences(userId);
    return recurrences.map((r) => this.mapToDTO(r));
  }

  async getRecurrenceById(
    userId: string,
    id: string,
  ): Promise<RecurrenceDTO | null> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting recurrence ${id} for user ${userId}`);
    const recurrence = await this.recurrenceRepo.getRecurrenceById(userId, id);
    return recurrence ? this.mapToDTO(recurrence) : null;
  }

  private mapToDTO(r: RecurrenceWithRelations): RecurrenceDTO {
    return {
      ...r,
      amount: r.amount.toString(),
      // Map nested account balances if they exist
      sourceAccount: r.sourceAccount
        ? {
            ...r.sourceAccount,
            balance: r.sourceAccount.balance.toString(),
          }
        : undefined,
      targetAccount: r.targetAccount
        ? {
            ...r.targetAccount,
            balance: r.targetAccount.balance.toString(),
          }
        : undefined,
    };
  }

  private calculateRecurrenceDates(
    transactionDate: Date,
    frequency: RecurrenceType,
    totalParts?: number,
    firstPaymentTiming: 'now' | 'next' = 'now',
  ): { startDate: Date; nextDate: Date; endDate: Date | null } {
    let startDate = new Date(transactionDate);

    if (firstPaymentTiming === 'next') {
      startDate = this.addFrequencyUnit(startDate, frequency);
    }

    const nextDate = this.addFrequencyUnit(startDate, frequency);
    const endDate = totalParts
      ? this.addFrequencyUnit(startDate, frequency, totalParts - 1)
      : null;

    return { startDate, nextDate, endDate };
  }

  private addFrequencyUnit(
    date: Date,
    frequency: RecurrenceType,
    count = 1,
  ): Date {
    const result = new Date(date);
    switch (frequency) {
      case 'WEEKLY':
        result.setDate(result.getDate() + 7 * count);
        break;
      case 'MONTHLY':
        result.setMonth(result.getMonth() + count);
        break;
      case 'YEARLY':
        result.setFullYear(result.getFullYear() + count);
        break;
      case 'INSTALLMENT':
        result.setMonth(result.getMonth() + count);
        break;
      default:
        return result;
    }
    return result;
  }

  // In saveTransaction or createRecurrence:
  async createRecurrenceForTransaction(
    data: CreateTransactionInput,
    userId: string,
    tx: Prisma.TransactionClient,
  ) {
    if (!data.recurrenceName) {
      throw new BadRequestException('Recurrence name is required');
    }

    const { startDate, nextDate, endDate } = this.calculateRecurrenceDates(
      data.date,
      data.frequency!,
      data.totalParts ?? 1,
      data.isFirstPayment ? 'now' : 'next',
    );
    const createRecurrenceData = {
      userId,
      name: data.recurrenceName,
      type: data.type,
      amount: data.amount,
      frequency: data.frequency ?? RecurrenceTypeSchema.enum.MONTHLY,
      totalParts: data.totalParts,
      categoryId: data.categoryId,
      sourceAccountId: data.sourceAccountId,
      targetAccountId: data.targetAccountId,
      startDate,
      nextDate,
      endDate,
      active: true,
      isCardExpense: data.isCardExpense,
      cardType: data.cardType,
      metadata: data.metadata
        ? (data.metadata as Prisma.InputJsonValue)
        : Prisma.JsonNull,
    };

    await this.recurrenceRepo.saveRecurrence(createRecurrenceData, tx);
  }

  async updateRecurrenceForTransaction(
    recurrenceId: string,
    userId: string,
    data: CreateTransactionInput,
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    if (!recurrenceId) {
      throw new BadRequestException('Recurrence id is required');
    }
    if (!userId) {
      throw new BadRequestException('User id is required');
    }

    const recurrence = await this.recurrenceRepo.getRecurrenceById(
      userId,
      recurrenceId,
    );
    if (!recurrence) {
      throw new BadRequestException('Recurrence not found');
    }

    const nextDate = this.addFrequencyUnit(
      recurrence.nextDate ?? recurrence.startDate,
      recurrence.frequency,
    );

    // Deactivate the recurrence if this was the last part
    const isLastPart =
      recurrence.totalParts != null &&
      recurrence.currentPart != null &&
      recurrence.currentPart >= recurrence.totalParts;

    const updateRecurrenceData = {
      userId,
      nextDate,
      currentPart: { increment: 1 }, // assumes Prisma atomic update
      active: isLastPart ? false : true,
      metadata: data.metadata
        ? (data.metadata as Prisma.InputJsonValue)
        : Prisma.JsonNull,
    };

    this.logger.log(`Updating recurrence ${recurrenceId} for user ${userId}`);
    await this.recurrenceRepo.updateRecurrence(
      recurrenceId,
      updateRecurrenceData,
      tx,
    );
  }

  async getRecurrenceTimeline(
    userId: string,
  ): Promise<RecurrenceTimelineDTO[]> {
    const recurrences =
      await this.recurrenceRepo.getRecurrencesWithHistory(userId);
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return recurrences.map((r) => {
      const lastTransaction = r.transactions[0] ?? null;
      const paidThisMonth = lastTransaction
        ? lastTransaction.date >= thisMonthStart &&
          lastTransaction.date <= thisMonthEnd
        : false;

      return {
        ...this.mapToDTO(r),
        paidThisMonth,
        lastPaidAt: lastTransaction?.date ?? null,
        // project next occurrences for the frontend timeline
        projectedDates: this.projectNextDates(r.nextDate, r.frequency, 3),
        transactions: r.transactions.map((t) => ({
          ...t,
          amount: t.amount.toString(),
        })),
      };
    });
  }

  private projectNextDates(
    nextDate: Date | null,
    frequency: RecurrenceType,
    count: number,
  ): Date[] {
    if (!nextDate) return [];
    const dates: Date[] = [];
    let current = new Date(nextDate);
    for (let i = 0; i < count; i++) {
      dates.push(new Date(current));
      current = this.addFrequencyUnit(current, frequency);
    }
    return dates;
  }
}
