// tests/services/dashboard.test.ts
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { prisma } from "../../src/lib/prisma";
import { DashboardService } from "../../src/api/dashboard/dashboard.service";
import { TransactionType, AccountType, Currency, CategoryType } from "@prisma/client";

describe("DashboardService", () => {
  let service: DashboardService;
  let testUserId: string;
  let testCategoryId: number;
  let testSourceAccountId: number;
  let testTargetAccountId: number;

  beforeEach(async () => {
    // Clean database
    await prisma.transaction.deleteMany();
    await prisma.account.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Create a test user
    const user = await prisma.user.create({
      data: { id: "test-user-123", name: "Test User" },
    });
    testUserId = user.id;

    // Create test category and accounts
    const category = await prisma.category.create({
      data: { userId: testUserId, name: "Food", type: CategoryType.GASTO },
    });
    testCategoryId = category.id;

    const sourceAccount = await prisma.account.create({
      data: { userId: testUserId, name: "Checking", type: AccountType.BANK, currency: Currency.ARS, balance: 1000 },
    });
    testSourceAccountId = sourceAccount.id;

    const targetAccount = await prisma.account.create({
      data: { userId: testUserId, name: "Savings", type: AccountType.BANK, currency: Currency.ARS, balance: 500 },
    });
    testTargetAccountId = targetAccount.id;

    service = new DashboardService();
  });

  afterEach(async () => {
    // Clean up
    await prisma.transaction.deleteMany();
    await prisma.account.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should calculate monthly stats correctly", async () => {
    const currentMonth = new Date(2025, 0, 15); // January 2025

    await prisma.transaction.createMany({
      data: [
        { userId: testUserId, type: TransactionType.EXPENSE, amount: 50, date: new Date(2025, 0, 10), description: "Lunch", categoryId: testCategoryId, sourceAccountId: testSourceAccountId },
        { userId: testUserId, type: TransactionType.EXPENSE, amount: 30, date: new Date(2025, 0, 15), description: "Coffee", categoryId: testCategoryId, sourceAccountId: testSourceAccountId },
        { userId: testUserId, type: TransactionType.INCOME, amount: 200, date: new Date(2025, 0, 5), description: "Salary", targetAccountId: testTargetAccountId },
        { userId: testUserId, type: TransactionType.TRANSFER, amount: 100, date: new Date(2025, 0, 20), description: "Transfer", sourceAccountId: testSourceAccountId, targetAccountId: testTargetAccountId },
        // Transaction from another month
        { userId: testUserId, type: TransactionType.EXPENSE, amount: 20, date: new Date(2024, 11, 25), description: "Old Expense", categoryId: testCategoryId, sourceAccountId: testSourceAccountId },
      ],
    });

    const stats = await service.getMonthlyStats(testUserId, currentMonth);

    expect(stats.totalIncome).toBe(200);
    expect(stats.totalExpense).toBe(80);
    expect(stats.netBalance).toBe(120);
    expect(stats.expenseByCategory.length).toBeGreaterThan(0);
    expect(stats.recentTransactions.length).toBe(4); // Only current month transactions
  });

  it("should get overall dashboard data", async () => {
    await prisma.account.update({
      where: { id: testSourceAccountId },
      data: { balance: 1500 },
    });
    await prisma.account.update({
      where: { id: testTargetAccountId },
      data: { balance: 700 },
    });

    await prisma.transaction.createMany({
      data: [
        { userId: testUserId, type: TransactionType.EXPENSE, amount: 50, date: new Date(2025, 0, 10), description: "Lunch", categoryId: testCategoryId, sourceAccountId: testSourceAccountId },
        { userId: testUserId, type: TransactionType.INCOME, amount: 200, date: new Date(2025, 0, 5), description: "Salary", targetAccountId: testTargetAccountId },
      ],
    });

    const dashboardData = await service.getDashboardData(testUserId);

    expect(dashboardData.totalIncome).toBe(200);
    expect(dashboardData.totalExpense).toBe(50);
    expect(dashboardData.netBalance).toBe(150);
    expect(dashboardData.totalAccountsBalance).toBe(2200); // 1500 + 700
  });
});
