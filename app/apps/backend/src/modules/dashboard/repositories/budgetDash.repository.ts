// backend/src/modules/dashboard/repositories/budgetDash.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { BudgetCategory } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/client';

export interface BudgetMetric {
  category: BudgetCategory;
  spent: Decimal; // total spent this month so far
  daysElapsed: number; // days from month start to today (1‑based)
  daysLeft: number; // remaining days in month
  dailyAvg: Decimal; // spent / daysElapsed
  projectedEnd: Decimal; // spent + dailyAvg * daysLeft
}

@Injectable()
export class BudgetDashRepository {
  constructor(private prisma: PrismaService) {}

  async getBudgetMetrics(userId: string): Promise<BudgetMetric[]> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Days elapsed (1‑based) and total days in month
    const daysElapsed = now.getDate();
    const totalDays = new Date(year, month, 0).getDate();

    return this.prisma.$queryRaw<BudgetMetric[]>`
      WITH category_spending AS (
        SELECT
          t."budgetCategory" AS category,
          COALESCE(SUM(t.amount), 0) AS spent
        FROM "Transaction" t
        WHERE t."userId" = ${userId}
          AND t."budgetCategory" IS NOT NULL
          AND t.date BETWEEN ${startDate} AND ${endDate}
        GROUP BY t."budgetCategory"
      )
      SELECT
        c.category,
        c.spent,
        ${daysElapsed}::int AS "daysElapsed",
        ${totalDays - daysElapsed}::int AS "daysLeft",
        CASE
          WHEN ${daysElapsed} = 0 THEN 0
          ELSE c.spent / ${daysElapsed}
        END AS "dailyAvg",
        CASE
          WHEN ${daysElapsed} = 0 THEN c.spent
          ELSE c.spent + (c.spent / ${daysElapsed}) * (${totalDays - daysElapsed})
        END AS "projectedEnd"
      FROM category_spending c
      ORDER BY c.spent DESC
    `;
  }
}
