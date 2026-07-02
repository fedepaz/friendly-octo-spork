import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TransactionService } from '../transaction.service';
import { TransactionRepository } from '../../../repositories/transaction.repository';
import { AccountRepository } from '../../../repositories/account.repository';
import { RecurrenceService } from '../../recurrences/recurrence.service';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import type { TransactionWithRelations } from '../../../repositories/transaction.repository';

// Helper to create a mock TransactionWithRelations
function mockTransaction(
  overrides: Partial<TransactionWithRelations> = {},
): TransactionWithRelations {
  return {
    id: 'tx-1',
    userId: 'user-1',
    type: 'EXPENSE',
    amount: { toString: () => '100.00' } as any,
    date: new Date(),
    description: 'Groceries',
    category: { id: 'cat-1', name: 'Food' } as any,
    sourceAccount: {
      id: 'acc-1',
      name: 'Checking',
      balance: { toString: () => '5000.00' },
    } as any,
    targetAccount: null,
    recurrence: null,
    recurrencePartNumber: null,
    isBudgetedExpense: false,
    budgetCategory: null,
    isCardExpense: false,
    cardType: null,
    source: null,
    metadata: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as TransactionWithRelations;
}

describe('TransactionService', () => {
  let service: TransactionService;
  let transactionRepo: {
    getTransactions: jest.Mock;
    getTransactionById: jest.Mock;
    saveTransaction: jest.Mock;
    getByMonth: jest.Mock;
  };
  let accountRepo: {
    getAccountById: jest.Mock;
    updateBalance: jest.Mock;
  };
  let recurrenceService: {
    createRecurrenceForTransaction: jest.Mock;
    updateRecurrenceForTransaction: jest.Mock;
  };
  let prisma: {
    $transaction: jest.Mock;
  };

  beforeEach(async () => {
    transactionRepo = {
      getTransactions: jest.fn(),
      getTransactionById: jest.fn(),
      saveTransaction: jest.fn(),
      getByMonth: jest.fn(),
    };

    accountRepo = {
      getAccountById: jest.fn(),
      updateBalance: jest.fn(),
    };

    recurrenceService = {
      createRecurrenceForTransaction: jest.fn(),
      updateRecurrenceForTransaction: jest.fn(),
    };

    prisma = {
      $transaction: jest.fn().mockImplementation((cb: any) => {
        return cb({});
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: TransactionRepository, useValue: transactionRepo },
        { provide: AccountRepository, useValue: accountRepo },
        { provide: RecurrenceService, useValue: recurrenceService },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransactions', () => {
    it('should return paginated transactions for valid userId', async () => {
      const transactions = [mockTransaction()];
      transactionRepo.getTransactions.mockResolvedValue({
        data: transactions,
        total: 1,
      });

      const result = await service.getTransactions('user-1');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(50);
      expect(result.totalPages).toBe(1);
      expect(result.data[0].amount).toBe('100.00');
      expect(transactionRepo.getTransactions).toHaveBeenCalledWith(
        'user-1',
        1,
        50,
      );
    });

    it('should support pagination parameters', async () => {
      transactionRepo.getTransactions.mockResolvedValue({
        data: [mockTransaction()],
        total: 100,
      });

      const result = await service.getTransactions('user-1', 2, 10);

      expect(result.page).toBe(2);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(10);
      expect(transactionRepo.getTransactions).toHaveBeenCalledWith(
        'user-1',
        2,
        10,
      );
    });

    it('should return empty array when no transactions exist', async () => {
      transactionRepo.getTransactions.mockResolvedValue({
        data: [],
        total: 0,
      });

      const result = await service.getTransactions('user-1');

      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getTransactions('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(
        service.getTransactions(null as unknown as string),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getTransactionsByMonth', () => {
    it('should return transactions for a specific month', async () => {
      const transactions = [mockTransaction()];
      transactionRepo.getByMonth.mockResolvedValue(transactions);

      const result = await service.getTransactionsByMonth('user-1', 6, 2024);

      expect(result).toHaveLength(1);
      expect(result[0].amount).toBe('100.00');
      expect(transactionRepo.getByMonth).toHaveBeenCalledWith(
        'user-1',
        6,
        2024,
      );
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getTransactionsByMonth('', 6, 2024)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getTransactionById', () => {
    it('should return transaction by id', async () => {
      const transaction = mockTransaction({ id: 'tx-123' });
      transactionRepo.getTransactionById.mockResolvedValue(transaction);

      const result = await service.getTransactionById('user-1', 'tx-123');

      expect(result).not.toBeNull();
      expect(result!.id).toBe('tx-123');
      expect(result!.amount).toBe('100.00');
      expect(transactionRepo.getTransactionById).toHaveBeenCalledWith(
        'user-1',
        'tx-123',
      );
    });

    it('should throw NotFoundException if transaction not found', async () => {
      transactionRepo.getTransactionById.mockResolvedValue(null);

      await expect(
        service.getTransactionById('user-1', 'nonexistent'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getTransactionById('', 'tx-1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateTransactionSource', () => {
    it('should update transaction source', async () => {
      prisma.$transaction.mockResolvedValue(undefined);

      // The method uses prisma.transaction.update directly
      // We need to mock the prisma object's transaction property
      const mockUpdate = jest.fn().mockResolvedValue({});
      (prisma as any).transaction = { update: mockUpdate };

      await service.updateTransactionSource('user-1', 'tx-1', 'manual');

      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: 'tx-1', userId: 'user-1' },
        data: { source: 'manual' },
      });
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(
        service.updateTransactionSource('', 'tx-1', 'manual'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for empty transactionId', async () => {
      await expect(
        service.updateTransactionSource('user-1', '', 'manual'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
