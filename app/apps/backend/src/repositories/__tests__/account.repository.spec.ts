import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from '../account.repository';
import { PrismaService } from '../../infra/prisma/prisma.service';

describe('AccountRepository', () => {
  let repository: AccountRepository;
  let prisma: {
    account: {
      findMany: jest.Mock;
      findFirst: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      account: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<AccountRepository>(AccountRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAccounts', () => {
    it('should return accounts for a user', async () => {
      const userId = 'user-123';
      const expected = [{ id: '1', name: 'Savings', userId }];
      prisma.account.findMany.mockResolvedValue(expected);

      const result = await repository.getAccounts(userId);

      expect(result).toEqual(expected);
      expect(prisma.account.findMany).toHaveBeenCalledWith({
        where: { userId, deletedAt: null },
        include: { transactionsFrom: true, transactionsTo: true },
      });
    });

    it('should exclude soft-deleted accounts', async () => {
      const userId = 'user-123';
      prisma.account.findMany.mockResolvedValue([]);

      await repository.getAccounts(userId);

      expect(prisma.account.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ deletedAt: null }),
        }),
      );
    });
  });

  describe('getAccountById', () => {
    it('should return account by id and userId', async () => {
      const userId = 'user-123';
      const accountId = 'account-456';
      const expected = { id: accountId, name: 'Savings', userId };
      prisma.account.findFirst.mockResolvedValue(expected);

      const result = await repository.getAccountById(userId, accountId);

      expect(result).toEqual(expected);
      expect(prisma.account.findFirst).toHaveBeenCalledWith({
        where: { id: accountId, userId, deletedAt: null },
        include: { transactionsFrom: true, transactionsTo: true },
      });
    });

    it('should return null if account not found', async () => {
      prisma.account.findFirst.mockResolvedValue(null);

      const result = await repository.getAccountById('user-123', 'nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('saveAccount', () => {
    it('should create a new account', async () => {
      const data = {
        userId: 'user-123',
        name: 'Savings',
        type: 'BANK' as const,
        currency: 'ARS' as const,
      };
      const expected = { id: '1', ...data };
      prisma.account.create.mockResolvedValue(expected);

      const result = await repository.saveAccount(data);

      expect(result).toEqual(expected);
      expect(prisma.account.create).toHaveBeenCalledWith({
        data,
        include: { transactionsFrom: true, transactionsTo: true },
      });
    });

    it('should use transaction client when provided', async () => {
      const data = {
        userId: 'user-123',
        name: 'Savings',
        type: 'BANK' as const,
        currency: 'ARS' as const,
      };
      const txClient = {
        account: { create: jest.fn().mockResolvedValue({ id: '1', ...data }) },
      } as any;

      const result = await repository.saveAccount(data, txClient);

      expect(result).toEqual({ id: '1', ...data });
      expect(txClient.account.create).toHaveBeenCalledWith({
        data,
        include: { transactionsFrom: true, transactionsTo: true },
      });
      expect(prisma.account.create).not.toHaveBeenCalled();
    });
  });

  describe('updateBalance', () => {
    it('should increment balance', async () => {
      const id = 'account-123';
      const amount = 1000;
      prisma.account.update.mockResolvedValue({ id, balance: 5000 });

      const result = await repository.updateBalance(id, amount, 'increment');

      expect(result.balance).toBe(5000);
      expect(prisma.account.update).toHaveBeenCalledWith({
        where: { id },
        data: { balance: { increment: amount } },
        include: { transactionsFrom: true, transactionsTo: true },
      });
    });

    it('should decrement balance', async () => {
      const id = 'account-123';
      const amount = 500;
      prisma.account.update.mockResolvedValue({ id, balance: 4500 });

      await repository.updateBalance(id, amount, 'decrement');

      expect(prisma.account.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { balance: { decrement: amount } },
        }),
      );
    });

    it('should use transaction client when provided', async () => {
      const id = 'account-123';
      const amount = 500;
      const txClient = {
        account: {
          update: jest.fn().mockResolvedValue({ id, balance: 4500 }),
        },
      } as any;

      await repository.updateBalance(id, amount, 'decrement', txClient);

      expect(txClient.account.update).toHaveBeenCalledWith({
        where: { id },
        data: { balance: { decrement: amount } },
        include: { transactionsFrom: true, transactionsTo: true },
      });
      expect(prisma.account.update).not.toHaveBeenCalled();
    });
  });
});
