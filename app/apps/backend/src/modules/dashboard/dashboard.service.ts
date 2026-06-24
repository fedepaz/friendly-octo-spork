// backend/src/modules/dashboard/dashboard.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  BudgetDashRepository,
  BudgetMetric,
} from './repositories/budgetDash.repository';
import {
  AccountDTO,
  BudgetDTO,
  IncomeExpenseDTO,
  RecurrenceDTO,
} from '@repo/shared';

import { AccountDashRepository } from './repositories/accountDash.repository';
import {
  IncomeExpenseDashRepository,
  IncomeExpenseInterface,
} from './repositories/income-expenseDash.repository';
import { RecurrenceDashRepository } from './repositories/recurrenceDash.repository';
import { RecurrenceWithRelations } from '../../repositories/recurrence.repository';

// backend/src/modules/dashboard/dashboard.service.ts
@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);
  constructor(
    private readonly budgetRepo: BudgetDashRepository,
    private readonly accountRepo: AccountDashRepository,
    private readonly incomeExpenseRepo: IncomeExpenseDashRepository,
    private readonly recurrenceRepo: RecurrenceDashRepository,
  ) {}

  private mapBudgetToDTO(budget: BudgetMetric): BudgetDTO {
    return {
      category: budget.category,
      spent: budget.spent.toString(),
      daysElapsed: budget.daysElapsed,
      daysLeft: budget.daysLeft,
      dailyAvg: budget.dailyAvg.toString(),
      projectedEnd: budget.projectedEnd.toString(),
    };
  }

  private mapIncomeExpenseToDTO(
    incomeExpense: IncomeExpenseInterface,
  ): IncomeExpenseDTO {
    return {
      month: incomeExpense.month,
      income: incomeExpense.income.toString(),
      expenses: incomeExpense.expenses.toString(),
    };
  }

  private mapRecurrenceToDTO(r: RecurrenceWithRelations): RecurrenceDTO {
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

  async getBudgetSummary(userId: string): Promise<BudgetDTO[]> {
    if (!userId) throw new BadRequestException('User ID is required');
    this.logger.debug(`Getting budget summary for user ${userId}`);
    const response = await this.budgetRepo.getBudgetMetrics(userId);
    return response.map((budget) => this.mapBudgetToDTO(budget));
  }

  async getRecentAccounts(userId: string): Promise<AccountDTO[]> {
    if (!userId) throw new BadRequestException('User ID is required');
    this.logger.debug(`Getting recent accounts for user ${userId}`);
    const response = await this.accountRepo.getRecentAccounts(userId);
    return response;
  }

  async getMonthlyIncomeExpense(
    userId: string,
    months: number = 6,
  ): Promise<IncomeExpenseDTO[]> {
    if (!userId) throw new BadRequestException('User ID is required');
    this.logger.debug(`Getting monthly income and expense for user ${userId}`);
    const response = await this.incomeExpenseRepo.getMonthlyIncomeExpense(
      userId,
      months,
    );
    return response.map((incomeExpense) =>
      this.mapIncomeExpenseToDTO(incomeExpense),
    );
  }

  async getRecurrencesToPayCurrentMonth(
    userId: string,
  ): Promise<RecurrenceDTO[]> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(
      `Getting recurrences to pay for user ${userId} for current month`,
    );
    const recurrences = await this.recurrenceRepo.getToPayByMonth(userId);
    return recurrences.map((r) => this.mapRecurrenceToDTO(r));
  }
}
