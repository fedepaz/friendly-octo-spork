// src/modules/dashboard/repositories/income-expenseDash.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { TransactionType } from '@prisma/client';

export interface IncomeExpenseInterface {
  month: string;
  income: number;
  expenses: number;
}

@Injectable()
export class IncomeExpenseDashRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Returns monthly income and expense totals for the last `months` months,
   * including the current month (most recent first).
   */
  async getMonthlyIncomeExpense(
    userId: string,
    months: number = 6,
  ): Promise<IncomeExpenseInterface[]> {
    // Get current date
    const now = new Date();
    const startDate = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - months, 1, 0, 0, 0),
    );

    // Raw SQL to get income and expenses for each month
    const results = await this.prisma.$queryRaw<
      Array<{
        year: number;
        month: number;
        income: number;
        expenses: number;
      }>
    >`
         SELECT 
        EXTRACT(YEAR FROM date)::int as year,
        EXTRACT(MONTH FROM date)::int as month,
        SUM(CASE WHEN type = ${TransactionType.INCOME} THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = ${TransactionType.EXPENSE} THEN amount ELSE 0 END) as expenses
      FROM "Transaction"
      WHERE "userId" = ${userId}
        AND (type = ${TransactionType.INCOME} OR type = ${TransactionType.EXPENSE})
        AND date >= ${startDate}
      GROUP BY year, month
      ORDER BY year DESC, month DESC
    `;

    // Map to frontend‑expected format (month name, income, expenses)
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const timeline: IncomeExpenseInterface[] = [];

    for (let i = months - 1; i >= 0; i--) {
      // oldest to newest
      const d = new Date();
      d.setUTCMonth(d.getUTCMonth() - i);
      const year = d.getUTCFullYear();
      const month = d.getUTCMonth() + 1;
      const found = results.find((r) => r.year === year && r.month === month);
      timeline.push({
        month: monthNames[month - 1],
        income: found ? Number(found.income) : 0,
        expenses: found ? Number(found.expenses) : 0,
      });
    }

    return timeline;
  }
}
