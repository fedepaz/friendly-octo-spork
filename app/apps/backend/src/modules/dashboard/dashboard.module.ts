// backend/src/modules/dashboard/dashboard.module.ts

import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { BudgetDashRepository } from './repositories/budgetDash.repository';
import { AccountDashRepository } from './repositories/accountDash.repository';
import { IncomeExpenseDashRepository } from './repositories/income-expenseDash.repository';
import { RecurrenceDashRepository } from './repositories/recurrenceDash.repository';

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    BudgetDashRepository,
    AccountDashRepository,
    IncomeExpenseDashRepository,
    RecurrenceDashRepository,
  ],
  exports: [DashboardService],
})
export class DashboardModule {}
