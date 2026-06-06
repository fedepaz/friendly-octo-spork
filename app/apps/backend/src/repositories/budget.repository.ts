// backend/src/repositories/budget.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma/prisma.service';

@Injectable()
export class BudgetRepository {
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
}
