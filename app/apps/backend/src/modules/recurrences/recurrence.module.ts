// backend/src/modules/recurrences/recurrence.module.ts

import { Module } from '@nestjs/common';
import { RecurrenceController } from './recurrence.controller';
import { RecurrenceService } from './recurrence.service';
import { RecurrenceRepository } from '../../repositories/recurrence.repository';

@Module({
  controllers: [RecurrenceController],
  providers: [RecurrenceService, RecurrenceRepository],
  exports: [RecurrenceService],
})
export class RecurrencesModule {}
