// backend/src/modules/recurrences/recurrence.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  RecurrenceRepository,
  RecurrenceWithRelations,
} from '../../repositories/recurrence.repository';
import { RecurrenceDTO } from '@repo/shared';

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
      amount: Number(r.amount),
      // Map nested account balances if they exist
      sourceAccount: r.sourceAccount
        ? {
            ...r.sourceAccount,
            balance: Number(r.sourceAccount.balance),
          }
        : undefined,
      targetAccount: r.targetAccount
        ? {
            ...r.targetAccount,
            balance: Number(r.targetAccount.balance),
          }
        : undefined,
    };
  }
}
