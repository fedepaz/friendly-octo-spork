// src/api/dashboard/dashboard.service.ts
import { prisma } from "../../lib/prisma";
import { TransactionType } from "../../lib/prisma";

export class DashboardService {
  async getMonthlyStats(userId: string, month: Date) {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const totalIncome = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        type: TransactionType.INCOME,
        date: { gte: startOfMonth, lte: endOfMonth },
      },
    });

    const totalExpense = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        type: TransactionType.EXPENSE,
        date: { gte: startOfMonth, lte: endOfMonth },
      },
    });

    const expenseByCategory = await prisma.transaction.groupBy({
      by: ["categoryId"],
      _sum: { amount: true },
      where: {
        userId,
        type: TransactionType.EXPENSE,
        date: { gte: startOfMonth, lte: endOfMonth },
      },
      orderBy: { _sum: { amount: "desc" } },
      take: 5,
    });

    const categories = await prisma.category.findMany({
      where: { userId, id: { in: expenseByCategory.map((e) => e.categoryId || 0) } },
    });

    const recentTransactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: { gte: startOfMonth, lte: endOfMonth },
      },
      include: { category: true, sourceAccount: true, targetAccount: true },
      orderBy: { date: "desc" },
      take: 5,
    });

    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const dailyAverage = (totalExpense._sum.amount ?? 0) / daysInMonth;

    return {
      totalIncome: totalIncome._sum.amount ?? 0,
      totalExpense: totalExpense._sum.amount ?? 0,
      netBalance: (totalIncome._sum.amount ?? 0) - (totalExpense._sum.amount ?? 0),
      monthlySpent: totalExpense._sum.amount ?? 0, // Add monthlySpent
      monthlyBudget: 0, // Default to 0 as requested
      expenseByCategory: expenseByCategory.map((e) => ({
        category: categories.find((c) => c.id === e.categoryId)?.name || "Unknown",
        amount: e._sum?.amount ?? 0,
      })),
      recentTransactions,
      dailyAverage,
      daysInMonth,
    };
  }

  async getDashboardData(userId: string) {
    const currentMonth = new Date();
    const monthlyStats = await this.getMonthlyStats(userId, currentMonth);

    const totalAccountsBalance = await prisma.account.aggregate({
      _sum: { balance: true },
      where: { userId },
    });

    return {
      ...monthlyStats,
      totalAccountsBalance: totalAccountsBalance._sum.balance || 0,
    };
  }
}