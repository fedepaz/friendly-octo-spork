// backend/src/modules/dashboard/dashboard.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  BudgetDashRepository,
  BudgetInterface,
} from './repositories/budgetDash.repository';
import { AccountDTO, BudgetDTO, IncomeExpenseDTO } from '@repo/shared';
import { BudgetCategory } from '@prisma/client';
import { AccountDashRepository } from './repositories/accountDash.repository';
import {
  IncomeExpenseDashRepository,
  IncomeExpenseInterface,
} from './repositories/income-expenseDash.repository';

// backend/src/modules/dashboard/dashboard.service.ts
@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);
  constructor(
    private readonly budgetRepo: BudgetDashRepository,
    private readonly accountRepo: AccountDashRepository,
    private readonly incomeExpenseRepo: IncomeExpenseDashRepository,
  ) {}

  private mapBudgetToDTO(budget: BudgetInterface): BudgetDTO {
    return {
      category: budget.category as BudgetCategory,
      spent: budget.spent.toString(),
      limit: budget.limit.toString(),
      color: budget.color,
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
  async getBudgetSummary(
    userId: string,
    month?: number,
    year?: number,
  ): Promise<BudgetDTO[]> {
    if (!userId) throw new BadRequestException('User ID is required');
    this.logger.debug(`Getting budget summary for user ${userId}`);
    const thisMonth = month ?? new Date().getMonth() + 1;
    const thisYear = year ?? new Date().getFullYear();
    const response = await this.budgetRepo.getBudgetsWithSpent(
      userId,
      thisMonth,
      thisYear,
    );
    return response.map((budget) => this.mapBudgetToDTO(budget));
  }

  async getRecentAccounts(
    userId: string,
    limit: number = 3,
  ): Promise<AccountDTO[]> {
    if (!userId) throw new BadRequestException('User ID is required');
    this.logger.debug(`Getting recent accounts for user ${userId}`);
    const response = await this.accountRepo.getRecentAccounts(userId, limit);
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
}
