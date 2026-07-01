import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRepository } from '../transaction.repository';
import { PrismaService } from '../../infra/prisma/prisma.service';

describe('TransactionRepository', () => {
  let repository: TransactionRepository;
  let prisma: {
    transaction: {
      findMany: jest.Mock;
      findFirst: jest.Mock;
      create: jest.Mock;
      count: jest.Mock;
    };
    $transaction: jest.Mock;
  };

  beforeEach(async () => {
    prisma = {
      transaction: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        count: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<TransactionRepository>(TransactionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransactions', () => {
    it('should return paginated transactions with total count', async () => {
      const userId = 'user-123';
      const data = [
        { id: '1', userId, type: 'EXPENSE', amount: 100 },
        { id: '2', userId, type: 'INCOME', amount: 200 },
      ];
      const total = 2;
      prisma.$transaction.mockResolvedValue([data, total]);

      const result = await repository.getTransactions(userId);

      expect(result).toEqual({ data, total });
      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it('should pass page and limit to the query', async () => {
      const userId = 'user-123';
      prisma.$transaction.mockResolvedValue([[], 0]);

      await repository.getTransactions(userId, 2, 10);

      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it('should use default page=1 and limit=50', async () => {
      const userId = 'user-123';
      prisma.$transaction.mockResolvedValue([[], 0]);

      await repository.getTransactions(userId);

      expect(prisma.$transaction).toHaveBeenCalled();
    });
  });

  describe('getTransactionById', () => {
    it('should return a transaction by id and userId', async () => {
      const userId = 'user-123';
      const transactionId = 'txn-456';
      const expected = {
        id: transactionId,
        userId,
        type: 'EXPENSE',
        amount: 100,
      };
      prisma.transaction.findFirst.mockResolvedValue(expected);

      const result = await repository.getTransactionById(userId, transactionId);

      expect(result).toEqual(expected);
      expect(prisma.transaction.findFirst).toHaveBeenCalledWith({
        where: { id: transactionId, userId },
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
          recurrence: true,
        },
      });
    });

    it('should return null if transaction not found', async () => {
      prisma.transaction.findFirst.mockResolvedValue(null);

      const result = await repository.getTransactionById(
        'user-123',
        'nonexistent',
      );

      expect(result).toBeNull();
    });
  });

  describe('saveTransaction', () => {
    it('should create a new transaction', async () => {
      const data = {
        userId: 'user-123',
        type: 'EXPENSE' as const,
        amount: 100,
        categoryId: 'cat-1',
        sourceAccountId: 'acc-1',
        date: new Date('2026-01-15'),
      };
      const expected = { id: '1', ...data };
      prisma.transaction.create.mockResolvedValue(expected);

      const result = await repository.saveTransaction(data);

      expect(result).toEqual(expected);
      expect(prisma.transaction.create).toHaveBeenCalledWith({
        data,
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
          recurrence: true,
        },
      });
    });

    it('should use transaction client when provided', async () => {
      const data = {
        userId: 'user-123',
        type: 'EXPENSE' as const,
        amount: 100,
        categoryId: 'cat-1',
        sourceAccountId: 'acc-1',
        date: new Date('2026-01-15'),
      };
      const txClient = {
        transaction: {
          create: jest.fn().mockResolvedValue({ id: '1', ...data }),
        },
      } as any;

      const result = await repository.saveTransaction(data, txClient);

      expect(result).toEqual({ id: '1', ...data });
      expect(txClient.transaction.create).toHaveBeenCalledWith({
        data,
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
          recurrence: true,
        },
      });
      expect(prisma.transaction.create).not.toHaveBeenCalled();
    });
  });

  describe('getByMonth', () => {
    it('should return transactions for a specific month', async () => {
      const userId = 'user-123';
      const expected = [{ id: '1', userId, date: new Date('2026-01-15') }];
      prisma.transaction.findMany.mockResolvedValue(expected);

      const result = await repository.getByMonth(userId, 1, 2026);

      expect(result).toEqual(expected);
      expect(prisma.transaction.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId,
            date: {
              gte: new Date(2026, 0, 1),
              lte: new Date(2026, 1, 0, 23, 59, 59),
            },
          }),
          orderBy: { date: 'desc' },
        }),
      );
    });

    it('should handle December correctly (month=12)', async () => {
      const userId = 'user-123';
      prisma.transaction.findMany.mockResolvedValue([]);

      await repository.getByMonth(userId, 12, 2026);

      expect(prisma.transaction.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            date: {
              gte: new Date(2026, 11, 1),
              lte: new Date(2026, 12, 0, 23, 59, 59),
            },
          }),
        }),
      );
    });
  });
});
