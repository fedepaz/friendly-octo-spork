// backend/src/modules/dashboard/repositories/budgetDash.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { BudgetCategory } from 'generated/prisma';
import { Decimal } from '@prisma/client/runtime/client';

export interface BudgetInterface {
  category: string;
  spent: number | Decimal;
  limit: number;
  color: string;
}

// Hardcoded limits & colors per BudgetCategory
const BUDGET_CONFIG: Record<BudgetCategory, { limit: number; color: string }> =
  {
    DAILY_EXPENSES: { limit: 500, color: 'bg-chart-1' },
    FOOD_GROCERIES: { limit: 800, color: 'bg-chart-2' },
    ENTERTAINMENT: { limit: 200, color: 'bg-chart-3' },
    TRANSPORTATION: { limit: 400, color: 'bg-chart-4' },
    HEALTH: { limit: 300, color: 'bg-chart-5' },
    UTILITIES: { limit: 350, color: 'bg-chart-6' },
  };

@Injectable()
export class BudgetDashRepository {
  constructor(private prisma: PrismaService) {}
  async getBudgetSummary(userId: string, month: number, year: number) {
    return this.prisma.$queryRaw`
    SELECT 
      "budgetCategory",
      SUM(amount) FILTER (
        WHERE EXTRACT(MONTH FROM date) = ${month}
        AND EXTRACT(YEAR FROM date) = ${year}
      ) as this_month,
      SUM(amount) FILTER (
        WHERE EXTRACT(MONTH FROM date) = ${month - 1}
        AND EXTRACT(YEAR FROM date) = ${year}
      ) as last_month,
      COUNT(*) as transaction_count
    FROM "Transaction"
    WHERE "userId" = ${userId}
      AND "isBudgetedExpense" = true
      AND "budgetCategory" IS NOT NULL
    GROUP BY "budgetCategory"
  `;
  }

  async getBudgetsWithSpent(
    userId: string,
    month: number,
    year: number,
  ): Promise<BudgetInterface[]> {
    // 1. Get actual spending for the month, grouped by budgetCategory
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1); // first day of next month

    const spendingRaw = await this.prisma.transaction.groupBy({
      by: ['budgetCategory'],
      where: {
        userId,
        isBudgetedExpense: true,
        budgetCategory: { not: null },
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: { amount: true },
    });

    // Convert to Map for easy lookup
    const spentMap = new Map(
      spendingRaw.map((item) => [item.budgetCategory!, item._sum.amount ?? 0]),
    );

    // 2. Build result array from the hardcoded config
    const result = Object.entries(BUDGET_CONFIG).map(([category, config]) => ({
      category: this.formatCategoryName(category), // e.g., "Food & Dining"
      spent: spentMap.get(category as BudgetCategory) ?? 0,
      limit: config.limit,
      color: config.color,
    }));

    // Optional: sort by spent descending or category name
    return result;
  }

  // Helper to convert enum key to user‑friendly string
  private formatCategoryName(category: string): string {
    const mapping: Record<string, string> = {
      DAILY_EXPENSES: 'Daily Expenses',
      FOOD_GROCERIES: 'Food & Dining',
      ENTERTAINMENT: 'Entertainment',
      TRANSPORTATION: 'Transportation',
      HEALTH: 'Health & Medical',
      UTILITIES: 'Utilities',
    };
    return mapping[category] ?? category.replace(/_/g, ' ');
  }
}
