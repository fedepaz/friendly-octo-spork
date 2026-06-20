// src/modules/dashboard/dashboard.controller.ts

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {
  AccountDTO,
  BudgetDTO,
  IncomeExpenseDTO,
  RecurrenceDTO,
} from '@repo/shared';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('budget/:month/:year')
  @HttpCode(HttpStatus.OK)
  async getDashboard(
    @CurrentUser() user: AuthUser,
    @Param('month', ParseIntPipe) month: number,
    @Param('year', ParseIntPipe) year: number,
  ): Promise<BudgetDTO[]> {
    return this.dashboardService.getBudgetSummary(user.id, month, year);
  }

  @Get('recentAccounts')
  @HttpCode(HttpStatus.OK)
  async getRecentAccounts(
    @CurrentUser() user: AuthUser,
  ): Promise<AccountDTO[]> {
    return this.dashboardService.getRecentAccounts(user.id);
  }
  @Get('income-expense/:months')
  @HttpCode(HttpStatus.OK)
  async getMonthlyIncomeExpense(
    @CurrentUser() user: AuthUser,
    @Param('months', ParseIntPipe) months: number,
  ): Promise<IncomeExpenseDTO[]> {
    return this.dashboardService.getMonthlyIncomeExpense(user.id, months);
  }

  @Get('toPay')
  @HttpCode(HttpStatus.OK)
  async getRecurrencesToPayCurrentMonth(
    @CurrentUser() user: AuthUser,
  ): Promise<RecurrenceDTO[]> {
    return this.dashboardService.getRecurrencesToPayCurrentMonth(user.id);
  }
}
