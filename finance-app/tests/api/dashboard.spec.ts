// tests/api/dashboard.test.ts
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { prisma } from "@/lib/prisma";
import app from "@/index";
import { sign } from "hono/jwt";
import { TransactionType, AccountType, Currency, CategoryType } from "@prisma/client";

// Mock environment variables for testing
process.env.JWT_SECRET = "test-jwt-secret";
process.env.ADMIN_USERNAME = "test-admin";
process.env.ADMIN_PASSWORD_HASH = await Bun.password.hash("test-password", {
  algorithm: "bcrypt",
  cost: 4,
});

const generateAuthCookie = async (userId: string) => {
  const token = await sign({ sub: userId }, process.env.JWT_SECRET!);
  return `auth_token=${token}`;
};

describe("Dashboard API", () => {
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

    // Add some transactions for testing dashboard stats
    await prisma.transaction.createMany({
      data: [
        { userId: testUserId, type: TransactionType.EXPENSE, amount: 50, date: new Date("2025-01-10"), description: "Lunch", categoryId: testCategoryId, sourceAccountId: testSourceAccountId },
        { userId: testUserId, type: TransactionType.EXPENSE, amount: 30, date: new Date("2025-01-15"), description: "Coffee", categoryId: testCategoryId, sourceAccountId: testSourceAccountId },
        { userId: testUserId, type: TransactionType.INCOME, amount: 200, date: new Date("2025-01-05"), description: "Salary", targetAccountId: testTargetAccountId },
      ],
    });
  });

  afterEach(async () => {
    // Clean up
    await prisma.transaction.deleteMany();
    await prisma.account.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
  });

  describe("GET /dashboard", () => {
    it("should render the dashboard page for authenticated user", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/dashboard", {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("Dashboard");
      expect(html).toContain("Monthly Budget");
      expect(html).toContain("Recent Expenses");
    });

    it("should redirect to login if not authenticated", async () => {
      const res = await app.request("/dashboard", {
        method: "GET",
      });

      expect(res.status).toBe(302); // Redirect to login
      expect(res.headers.get("location")).toBe("/login");
    });
  });

  describe("GET /api/dashboard/stats", () => {
    it("should return monthly stats for authenticated user", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/dashboard/stats", {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const stats = await res.json();
      expect(stats.totalIncome).toBe(200);
      expect(stats.totalExpense).toBe(80);
      expect(stats.netBalance).toBe(120);
      expect(stats.expenseByCategory.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/dashboard/recent", () => {
    it("should return recent transactions for authenticated user", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/dashboard/recent", {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("Lunch");
      expect(html).toContain("Coffee");
    });
  });
});
