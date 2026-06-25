// backend/src/modules/recurrences/recurrence.controller.ts

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RecurrenceService } from './recurrence.service';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';
import { RecurrenceDTO, TransactionType } from '@repo/shared';

@Controller('recurrences')
export class RecurrenceController {
  constructor(private readonly recurrenceService: RecurrenceService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getRecurrences(
    @CurrentUser() user: AuthUser,
  ): Promise<RecurrenceDTO[]> {
    return this.recurrenceService.getRecurrences(user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getRecurrenceById(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ) {
    return this.recurrenceService.getRecurrenceById(user.id, id);
  }

  @Get('month/:month/:year/:type')
  @HttpCode(HttpStatus.OK)
  async getRecurrencesByMonth(
    @CurrentUser() user: AuthUser,
    @Param('month', ParseIntPipe) month: number,
    @Param('year', ParseIntPipe) year: number,
    @Param('type') transactionType: TransactionType,
  ): Promise<RecurrenceDTO[]> {
    return this.recurrenceService.getRecurrencesByMonth(
      user.id,
      month,
      year,
      transactionType,
    );
  }
}
