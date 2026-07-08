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
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('budget')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'dashboard', action: 'read' })
  async getDashboard(@CurrentUser() user: AuthUser): Promise<BudgetDTO[]> {
    return this.dashboardService.getBudgetSummary(user.id);
  }

  @Get('recentAccounts')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'dashboard', action: 'read' })
  async getRecentAccounts(
    @CurrentUser() user: AuthUser,
  ): Promise<AccountDTO[]> {
    return this.dashboardService.getRecentAccounts(user.id);
  }
  @Get('income-expense/:months')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'dashboard', action: 'read' })
  async getMonthlyIncomeExpense(
    @CurrentUser() user: AuthUser,
    @Param('months', ParseIntPipe) months: number,
  ): Promise<IncomeExpenseDTO[]> {
    return this.dashboardService.getMonthlyIncomeExpense(user.id, months);
  }

  @Get('toPay')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'dashboard', action: 'read' })
  async getRecurrencesToPayCurrentMonth(
    @CurrentUser() user: AuthUser,
  ): Promise<RecurrenceDTO[]> {
    return this.dashboardService.getRecurrencesToPayCurrentMonth(user.id);
  }
}
