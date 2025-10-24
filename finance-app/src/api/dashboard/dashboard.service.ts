// src/api/dashboard/dashboard.service.ts

import { prisma } from "@/lib/prisma";
import type { DashboardInput } from "./dashboard.schema";

export class DashboardService {
  async getDashboardData(userId: string): Promise<DashboardInput> {
    const startOfMonth = new Date(new Date().setDate(1));
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const totalIncome = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: "INCOME",
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    const totalExpense = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: "EXPENSE",
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    const totalIncomeToInteger = Number(totalIncome._sum.amount ?? 0);
    const totalExpenseToInteger = Number(totalExpense._sum.amount ?? 0);

    return {
      monthlySpent: totalIncomeToInteger,
      monthlyBudget: totalExpenseToInteger,
      dailyAverage: 0,
      expenseCount: 0,
      recentTransactions: [],
      categories: [],
      accounts: [],
    };
  }
}
