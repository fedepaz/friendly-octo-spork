// backend/src/modules/recurrences/recurrence.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  RecurrenceRepository,
  RecurrenceWithRelations,
} from '../../repositories/recurrence.repository';
import {
  CreateTransactionInput,
  RecurrenceDTO,
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
      data.totalParts,
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
}
