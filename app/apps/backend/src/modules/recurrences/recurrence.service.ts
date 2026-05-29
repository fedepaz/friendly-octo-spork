// backend/src/modules/recurrences/recurrence.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RecurrenceRepository } from '../../repositories/recurrence.repository';
import { RecurrenceDTO } from '@repo/shared';

@Injectable()
export class RecurrenceService {
  private readonly logger = new Logger(RecurrenceService.name);

  constructor(private readonly recurrenceRepo: RecurrenceRepository) {}

  async getRecurrences(userId: string): Promise<RecurrenceDTO[]> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting recurrences for user ${userId}`);
    return this.recurrenceRepo.getRecurrences(userId);
  }

  async getRecurrenceById(
    userId: string,
    id: string,
  ): Promise<RecurrenceDTO | null> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting recurrence ${id} for user ${userId}`);
    return this.recurrenceRepo.getRecurrenceById(userId, id);
  }
}
