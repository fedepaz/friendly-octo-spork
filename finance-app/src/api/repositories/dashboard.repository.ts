// src/api/repositories/dashboard.repository.ts

import { prisma } from "@/lib/prisma";
import type { DashboardInput } from "../dashboard/dashboard.schema";

export class DashboardRepository {
  async getDashboardData(userId: string): Promise<DashboardInput> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );
    const currentDay = now.getDate();

    // 1. Aggregates for Income and Expenses
    const incomeAggregate = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        type: "INCOME",
        date: { gte: startOfMonth, lte: endOfMonth },
      },
    });

    const expenseAggregate = await prisma.transaction.aggregate({
      _sum: { amount: true },
      _count: { id: true },
      where: {
        userId,
        type: "EXPENSE",
        date: { gte: startOfMonth, lte: endOfMonth },
      },
    });

    const monthlyBudget = Number(incomeAggregate._sum.amount ?? 0);
    const monthlySpent = Number(expenseAggregate._sum.amount ?? 0);
    const expenseCount = expenseAggregate._count.id;
    const dailyAverage = currentDay > 0 ? monthlySpent / currentDay : 0;

    // 2. Fetch Accounts
    const accounts = await prisma.account.findMany({
      where: { userId },
    });

    // 3. Fetch Pending Recurrences
    // A recurrence is pending if it is active and its nextDate is in the current month or past.
    const pendingRecurrences = await prisma.recurrence.findMany({
      where: {
        userId,
        active: true,
        OR: [{ nextDate: { lte: endOfMonth } }, { nextDate: null }],
      },
      orderBy: { nextDate: "asc" },
    });

    return {
      monthlySpent,
      monthlyBudget,
      dailyAverage,
      expenseCount,
      accounts: accounts.map((a) => ({
        id: a.id,
        userId: a.userId,
        name: a.name,
        type: a.type,
        currency: a.currency,
        balance: Number(a.balance),
      })),
      pendingRecurrences: pendingRecurrences.map((r) => ({
        id: r.id,
        userId: r.userId,
        name: r.name,
        type: r.type,
        amount: Number(r.amount),
        frequency: r.frequency,
        totalParts: r.totalParts,
        currentPart: r.currentPart,
        startDate: r.startDate,
        nextDate: r.nextDate,
        endDate: r.endDate,
        active: r.active,
        categoryId: r.categoryId,
        sourceAccountId: r.sourceAccountId,
        targetAccountId: r.targetAccountId,
        isCardExpense: r.isCardExpense,
        cardType: r.cardType,
        metadata: r.metadata,
      })),
    };
  }
}
