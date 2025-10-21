// tests/api/transactions.test.ts
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

describe("Transactions API", () => {
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
  });

  afterEach(async () => {
    // Clean up
    await prisma.transaction.deleteMany();
    await prisma.account.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
  });

  describe("POST /api/transactions", () => {
    it("should create an expense transaction with valid data", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: authCookie,
        },
        body: `type=${TransactionType.EXPENSE}&amount=50&date=2025-01-01T00:00:00Z&description=Groceries&categoryId=${testCategoryId}&sourceAccountId=${testSourceAccountId}`,
      });

      expect(res.status).toBe(201);
      const html = await res.text();
      expect(html).toContain("Groceries");

      const dbTransaction = await prisma.transaction.findFirst({
        where: { userId: testUserId, description: "Groceries" },
      });
      expect(dbTransaction).toBeDefined();

      const updatedSourceAccount = await prisma.account.findUnique({
        where: { id: testSourceAccountId },
      });
      expect(updatedSourceAccount?.balance).toBe(950);
    });

    it("should create an income transaction with valid data", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: authCookie,
        },
        body: `type=${TransactionType.INCOME}&amount=200&date=2025-01-01T00:00:00Z&description=Salary&targetAccountId=${testTargetAccountId}`,
      });

      expect(res.status).toBe(201);
      const html = await res.text();
      expect(html).toContain("Salary");

      const updatedTargetAccount = await prisma.account.findUnique({
        where: { id: testTargetAccountId },
      });
      expect(updatedTargetAccount?.balance).toBe(700);
    });

    it("should create a transfer transaction with valid data", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: authCookie,
        },
        body: `type=${TransactionType.TRANSFER}&amount=100&date=2025-01-01T00:00:00Z&description=Transfer+to+Savings&sourceAccountId=${testSourceAccountId}&targetAccountId=${testTargetAccountId}`,
      });

      expect(res.status).toBe(201);
      const html = await res.text();
      expect(html).toContain("Transfer to Savings");

      const updatedSourceAccount = await prisma.account.findUnique({
        where: { id: testSourceAccountId },
      });
      expect(updatedSourceAccount?.balance).toBe(900);

      const updatedTargetAccount = await prisma.account.findUnique({
        where: { id: testTargetAccountId },
      });
      expect(updatedTargetAccount?.balance).toBe(600);
    });

    it("should reject invalid data", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: authCookie,
        },
        body: `type=${TransactionType.EXPENSE}&amount=-50&date=2025-01-01T00:00:00Z&description=Groceries&categoryId=${testCategoryId}&sourceAccountId=${testSourceAccountId}`,
      });

      expect(res.status).toBe(400);
      const error = await res.json();
      expect(error.error).toBe("Validation failed");
    });

    it("should require authentication", async () => {
      const res = await app.request("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: TransactionType.EXPENSE,
          amount: 50,
          date: "2025-01-01T00:00:00Z",
          description: "Groceries",
          categoryId: testCategoryId,
          sourceAccountId: testSourceAccountId,
        }),
      });

      expect(res.status).toBe(302); // Redirect to login
      expect(res.headers.get("location")).toBe("/login");
    });
  });

  describe("GET /api/transactions", () => {
    it("should list transactions for the authenticated user", async () => {
      await prisma.transaction.createMany({
        data: [
          { userId: testUserId, type: TransactionType.EXPENSE, amount: 50, date: new Date("2025-01-01"), description: "Tx1", categoryId: testCategoryId, sourceAccountId: testSourceAccountId },
          { userId: testUserId, type: TransactionType.INCOME, amount: 100, date: new Date("2025-01-02"), description: "Tx2", targetAccountId: testTargetAccountId },
        ],
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/transactions", {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const transactions = await res.json();
      expect(transactions.length).toBe(2);
      expect(transactions[0].description).toBe("Tx2"); // Ordered by date desc
    });

    it("should filter transactions by type", async () => {
      await prisma.transaction.createMany({
        data: [
          { userId: testUserId, type: TransactionType.EXPENSE, amount: 50, date: new Date("2025-01-01"), description: "Tx1", categoryId: testCategoryId, sourceAccountId: testSourceAccountId },
          { userId: testUserId, type: TransactionType.INCOME, amount: 100, date: new Date("2025-01-02"), description: "Tx2", targetAccountId: testTargetAccountId },
        ],
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/transactions?type=${TransactionType.EXPENSE}`, {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const transactions = await res.json();
      expect(transactions.length).toBe(1);
      expect(transactions[0].type).toBe(TransactionType.EXPENSE);
    });
  });

  describe("GET /api/transactions/:id", () => {
    it("should get a single transaction by ID", async () => {
      const transaction = await prisma.transaction.create({
        data: { userId: testUserId, type: TransactionType.EXPENSE, amount: 50, date: new Date("2025-01-01"), description: "Single Tx", categoryId: testCategoryId, sourceAccountId: testSourceAccountId },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/transactions/${transaction.id}`, {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const fetchedTransaction = await res.json();
      expect(fetchedTransaction.description).toBe("Single Tx");
    });
  });

  describe("PUT /api/transactions/:id", () => {
    it("should update a transaction", async () => {
      const transaction = await prisma.transaction.create({
        data: { userId: testUserId, type: TransactionType.EXPENSE, amount: 50, date: new Date("2025-01-01"), description: "Old Tx", categoryId: testCategoryId, sourceAccountId: testSourceAccountId },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/transactions/${transaction.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
        body: JSON.stringify({ description: "New Tx" }),
      });

      expect(res.status).toBe(200);
      const updatedTransaction = await res.json();
      expect(updatedTransaction.description).toBe("New Tx");

      const dbTransaction = await prisma.transaction.findUnique({
        where: { id: transaction.id },
      });
      expect(dbTransaction?.description).toBe("New Tx");
    });
  });

  describe("DELETE /api/transactions/:id", () => {
    it("should delete a transaction", async () => {
      const transaction = await prisma.transaction.create({
        data: { userId: testUserId, type: TransactionType.EXPENSE, amount: 50, date: new Date("2025-01-01"), description: "To Delete", categoryId: testCategoryId, sourceAccountId: testSourceAccountId },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/transactions/${transaction.id}`, {
        method: "DELETE",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(204);

      const dbTransaction = await prisma.transaction.findUnique({
        where: { id: transaction.id },
      });
      expect(dbTransaction).toBeNull();
    });
  });
});
