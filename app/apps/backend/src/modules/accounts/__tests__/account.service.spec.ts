import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AccountService } from '../account.service';
import { AccountRepository } from '../../../repositories/account.repository';
import type { AccountWithRelations } from '../../../repositories/account.repository';

// Helper to create a mock AccountWithRelations with Decimal-like balance
function mockAccount(
  overrides: Partial<AccountWithRelations> & { name: string },
): AccountWithRelations {
  return {
    id: '1',
    userId: 'user-123',
    type: 'BANK' as const,
    currency: 'ARS' as const,
    balance: {
      toString: () => '0',
    } as unknown as AccountWithRelations['balance'],
    transactionsFrom: [],
    transactionsTo: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...overrides,
  } as AccountWithRelations;
}

describe('AccountService', () => {
  let service: AccountService;
  let repository: {
    getAccounts: jest.Mock;
    getAccountById: jest.Mock;
    saveAccount: jest.Mock;
  };

  beforeEach(async () => {
    repository = {
      getAccounts: jest.fn(),
      getAccountById: jest.fn(),
      saveAccount: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: AccountRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAccounts', () => {
    it('should return accounts for valid userId', async () => {
      const userId = 'user-123';
      repository.getAccounts.mockResolvedValue([
        mockAccount({ name: 'Savings' }),
      ]);

      const result = await service.getAccounts(userId);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
      expect(result[0].name).toBe('Savings');
      expect(result[0].balance).toBe('0');
      expect(repository.getAccounts).toHaveBeenCalledWith(userId);
    });

    it('should convert Decimal balance to string', async () => {
      const userId = 'user-123';
      repository.getAccounts.mockResolvedValue([
        mockAccount({
          name: 'Savings',
          balance: {
            toString: () => '5432.10',
          } as unknown as AccountWithRelations['balance'],
        }),
      ]);

      const result = await service.getAccounts(userId);

      expect(result[0].balance).toBe('5432.10');
    });

    it('should map transactions with string amounts', async () => {
      const userId = 'user-123';
      repository.getAccounts.mockResolvedValue([
        mockAccount({
          name: 'Savings',
          balance: {
            toString: () => '1000',
          } as unknown as AccountWithRelations['balance'],
          transactionsFrom: [
            {
              id: 'tx-1',
              amount: { toString: () => '100' },
              description: 'Coffee',
            },
          ] as unknown as AccountWithRelations['transactionsFrom'],
          transactionsTo: [
            {
              id: 'tx-2',
              amount: { toString: () => '200' },
              description: 'Lunch',
            },
          ] as unknown as AccountWithRelations['transactionsTo'],
        }),
      ]);

      const result = await service.getAccounts(userId);

      expect(result[0].transactionsFrom).toHaveLength(1);
      expect(result[0].transactionsFrom![0].amount).toBe('100');
      expect(result[0].transactionsTo).toHaveLength(1);
      expect(result[0].transactionsTo![0].amount).toBe('200');
    });

    it('should return empty array when no accounts exist', async () => {
      repository.getAccounts.mockResolvedValue([]);

      const result = await service.getAccounts('user-123');

      expect(result).toEqual([]);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getAccounts('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(service.getAccounts(null as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getAccountById', () => {
    it('should return account by id', async () => {
      const userId = 'user-123';
      const accountId = 'account-456';
      repository.getAccountById.mockResolvedValue(
        mockAccount({ id: accountId, name: 'Savings', userId }),
      );

      const result = await service.getAccountById(userId, accountId);

      expect(result).not.toBeNull();
      expect(result!.id).toBe(accountId);
      expect(result!.name).toBe('Savings');
      expect(result!.balance).toBe('0');
      expect(repository.getAccountById).toHaveBeenCalledWith(userId, accountId);
    });

    it('should return null if account not found', async () => {
      repository.getAccountById.mockResolvedValue(null);

      const result = await service.getAccountById('user-123', 'nonexistent');

      expect(result).toBeNull();
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getAccountById('', 'account-123')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(
        service.getAccountById(null as any, 'account-123'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('saveAccount', () => {
    it('should save account successfully', async () => {
      const userId = 'user-123';
      const accountData = {
        name: 'Savings',
        type: 'BANK' as const,
        currency: 'ARS' as const,
        balance: '0',
      };
      repository.saveAccount.mockResolvedValue(
        mockAccount({ id: '1', userId, name: 'Savings' }),
      );

      const result = await service.saveAccount(userId, accountData);

      expect(result.id).toBe('1');
      expect(result.name).toBe('Savings');
      expect(result.balance).toBe('0');
      expect(repository.saveAccount).toHaveBeenCalledWith({
        userId,
        ...accountData,
      });
    });

    it('should map balance to string after saving', async () => {
      const userId = 'user-123';
      const accountData = {
        name: 'Checking',
        type: 'WALLET' as const,
        currency: 'USD' as const,
        balance: '0',
      };
      repository.saveAccount.mockResolvedValue(
        mockAccount({
          id: '2',
          userId,
          name: 'Checking',
          type: 'WALLET',
          currency: 'USD',
          balance: {
            toString: () => '250.75',
          } as unknown as AccountWithRelations['balance'],
        }),
      );

      const result = await service.saveAccount(userId, accountData);

      expect(result.balance).toBe('250.75');
    });

    it('should throw BadRequestException for empty userId', async () => {
      const accountData = {
        name: 'Savings',
        type: 'BANK' as const,
        currency: 'ARS' as const,
        balance: '0',
      };
      await expect(service.saveAccount('', accountData)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      const accountData = {
        name: 'Savings',
        type: 'BANK' as const,
        currency: 'ARS' as const,
        balance: '0',
      };
      await expect(
        service.saveAccount(null as any, accountData),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
