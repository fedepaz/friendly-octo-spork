// tests/services/accounts.test.ts
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { prisma } from "../../src/lib/prisma";
import { AccountsService } from "../../src/api/accounts/accounts.service";
import { AccountType, Currency } from "@prisma/client";

describe("AccountsService", () => {
  let service: AccountsService;
  let testUserId: string;

  beforeEach(async () => {
    // Clean database
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    // Create a test user
    const user = await prisma.user.create({
      data: { id: "test-user-123", name: "Test User" },
    });
    testUserId = user.id;

    service = new AccountsService();
  });

  afterEach(async () => {
    // Clean up
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should create an account", async () => {
    const account = await service.createAccount(testUserId, {
      name: "Test Account",
      type: AccountType.BANK,
      currency: Currency.ARS,
      balance: 1000,
    });

    expect(account).toBeDefined();
    expect(account.name).toBe("Test Account");
    expect(account.userId).toBe(testUserId);
  });

  it("should get accounts for a user", async () => {
    await service.createAccount(testUserId, {
      name: "Account 1",
      type: AccountType.BANK,
      currency: Currency.ARS,
      balance: 100,
    });
    await service.createAccount(testUserId, {
      name: "Account 2",
      type: AccountType.CASH,
      currency: Currency.USD,
      balance: 200,
    });

    const accounts = await service.getAccounts(testUserId);
    expect(accounts.length).toBe(2);
    expect(accounts[0].name).toBe("Account 1");
  });

  it("should get a single account by ID", async () => {
    const createdAccount = await service.createAccount(testUserId, {
      name: "Single Account",
      type: AccountType.BANK,
      currency: Currency.ARS,
      balance: 1000,
    });

    const fetchedAccount = await service.getAccountById(testUserId, createdAccount.id);
    expect(fetchedAccount).toBeDefined();
    expect(fetchedAccount?.name).toBe("Single Account");
  });

  it("should update an account", async () => {
    const createdAccount = await service.createAccount(testUserId, {
      name: "Old Name",
      type: AccountType.BANK,
      currency: Currency.ARS,
      balance: 1000,
    });

    const updatedAccount = await service.updateAccount(testUserId, createdAccount.id, {
      name: "New Name",
    });

    expect(updatedAccount.name).toBe("New Name");
  });

  it("should delete an account", async () => {
    const createdAccount = await service.createAccount(testUserId, {
      name: "To Delete",
      type: AccountType.BANK,
      currency: Currency.ARS,
      balance: 1000,
    });

    await service.deleteAccount(testUserId, createdAccount.id);

    const deletedAccount = await service.getAccountById(testUserId, createdAccount.id);
    expect(deletedAccount).toBeNull();
  });

  it("should not get another user's account", async () => {
    const otherUser = await prisma.user.create({
      data: { id: "other-user-id", name: "Other User" },
    });
    const otherAccount = await service.createAccount(otherUser.id, {
      name: "Other Account",
      type: AccountType.BANK,
      currency: Currency.ARS,
      balance: 500,
    });

    const fetchedAccount = await service.getAccountById(testUserId, otherAccount.id);
    expect(fetchedAccount).toBeNull();
  });
});
