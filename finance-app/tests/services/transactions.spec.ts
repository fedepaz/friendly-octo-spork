// tests/services/transactions.test.ts
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { prisma } from "@/lib/prisma";
import { TransactionsService } from "@/api/transactions/transactions.service";
import { TransactionType, AccountType, Currency, CategoryType } from "@prisma/client";

describe("TransactionsService", () => {
  let service: TransactionsService;
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

    service = new TransactionsService();
  });

  afterEach(async () => {
    // Clean up
    await prisma.transaction.deleteMany();
    await prisma.account.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should create an expense transaction and update account balance", async () => {
    const initialBalance = (await prisma.account.findUnique({ where: { id: testSourceAccountId } }))?.balance;

    const transaction = await service.createTransaction(testUserId, {
      type: TransactionType.EXPENSE,
      amount: 50,
      date: "2025-01-01T00:00:00Z",
      description: "Groceries",
      categoryId: testCategoryId,
      sourceAccountId: testSourceAccountId,
    });

    expect(transaction).toBeDefined();
    expect(transaction.description).toBe("Groceries");

    const updatedSourceAccount = await prisma.account.findUnique({
      where: { id: testSourceAccountId },
    });
    expect(updatedSourceAccount?.balance).toBe(Number(initialBalance) - 50);
  });

  it("should create an income transaction and update account balance", async () => {
    const initialBalance = (await prisma.account.findUnique({ where: { id: testTargetAccountId } }))?.balance;

    const transaction = await service.createTransaction(testUserId, {
      type: TransactionType.INCOME,
      amount: 200,
      date: "2025-01-01T00:00:00Z",
      description: "Salary",
      targetAccountId: testTargetAccountId,
    });

    expect(transaction).toBeDefined();
    expect(transaction.description).toBe("Salary");

    const updatedTargetAccount = await prisma.account.findUnique({
      where: { id: testTargetAccountId },
    });
    expect(updatedTargetAccount?.balance).toBe(Number(initialBalance) + 200);
  });

  it("should create a transfer transaction and update both account balances", async () => {
    const initialSourceBalance = (await prisma.account.findUnique({ where: { id: testSourceAccountId } }))?.balance;
    const initialTargetBalance = (await prisma.account.findUnique({ where: { id: testTargetAccountId } }))?.balance;

    const transaction = await service.createTransaction(testUserId, {
      type: TransactionType.TRANSFER,
      amount: 100,
      date: "2025-01-01T00:00:00Z",
      description: "Transfer to Savings",
      sourceAccountId: testSourceAccountId,
      targetAccountId: testTargetAccountId,
    });

    expect(transaction).toBeDefined();
    expect(transaction.description).toBe("Transfer to Savings");

    const updatedSourceAccount = await prisma.account.findUnique({
      where: { id: testSourceAccountId },
    });
    expect(updatedSourceAccount?.balance).toBe(Number(initialSourceBalance) - 100);

    const updatedTargetAccount = await prisma.account.findUnique({
      where: { id: testTargetAccountId },
    });
    expect(updatedTargetAccount?.balance).toBe(Number(initialTargetBalance) + 100);
  });

  it("should get transactions for a user", async () => {
    await service.createTransaction(testUserId, {
      type: TransactionType.EXPENSE,
      amount: 50,
      date: "2025-01-01T00:00:00Z",
      description: "Tx1",
      categoryId: testCategoryId,
      sourceAccountId: testSourceAccountId,
    });
    await service.createTransaction(testUserId, {
      type: TransactionType.INCOME,
      amount: 100,
      date: "2025-01-02T00:00:00Z",
      description: "Tx2",
      targetAccountId: testTargetAccountId,
    });

    const transactions = await service.getTransactions(testUserId, {});
    expect(transactions.length).toBe(2);
    expect(transactions[0].description).toBe("Tx2"); // Ordered by date desc
  });

  it("should get a single transaction by ID", async () => {
    const createdTransaction = await service.createTransaction(testUserId, {
      type: TransactionType.EXPENSE,
      amount: 50,
      date: "2025-01-01T00:00:00Z",
      description: "Single Tx",
      categoryId: testCategoryId,
      sourceAccountId: testSourceAccountId,
    });

    const fetchedTransaction = await service.getTransactionById(testUserId, createdTransaction.id);
    expect(fetchedTransaction).toBeDefined();
    expect(fetchedTransaction?.description).toBe("Single Tx");
  });

  it("should update a transaction", async () => {
    const createdTransaction = await service.createTransaction(testUserId, {
      type: TransactionType.EXPENSE,
      amount: 50,
      date: "2025-01-01T00:00:00Z",
      description: "Old Tx",
      categoryId: testCategoryId,
      sourceAccountId: testSourceAccountId,
    });

    const updatedTransaction = await service.updateTransaction(testUserId, createdTransaction.id, {
      description: "New Tx",
    });

    expect(updatedTransaction.description).toBe("New Tx");
  });

  it("should delete a transaction", async () => {
    const createdTransaction = await service.createTransaction(testUserId, {
      type: TransactionType.EXPENSE,
      amount: 50,
      date: "2025-01-01T00:00:00Z",
      description: "To Delete",
      categoryId: testCategoryId,
      sourceAccountId: testSourceAccountId,
    });

    await service.deleteTransaction(testUserId, createdTransaction.id);

    const deletedTransaction = await service.getTransactionById(testUserId, createdTransaction.id);
    expect(deletedTransaction).toBeNull();
  });
});
