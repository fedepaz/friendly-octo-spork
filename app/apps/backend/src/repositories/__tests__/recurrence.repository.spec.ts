import { Test, TestingModule } from '@nestjs/testing';
import { RecurrenceRepository } from '../recurrence.repository';
import { PrismaService } from '../../infra/prisma/prisma.service';

describe('RecurrenceRepository', () => {
  let repository: RecurrenceRepository;
  let prisma: {
    recurrence: {
      findMany: jest.Mock;
      findFirst: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      recurrence: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecurrenceRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<RecurrenceRepository>(RecurrenceRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getRecurrences', () => {
    it('should return recurrences for a user with relations', async () => {
      const userId = 'user-123';
      const expected = [
        {
          id: '1',
          userId,
          category: { id: 'cat-1', name: 'Food' },
          sourceAccount: { id: 'acc-1', name: 'Checking' },
          targetAccount: null,
        },
      ];
      prisma.recurrence.findMany.mockResolvedValue(expected);

      const result = await repository.getRecurrences(userId);

      expect(result).toEqual(expected);
      expect(prisma.recurrence.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
        },
      });
    });

    it('should return empty array when no recurrences exist', async () => {
      prisma.recurrence.findMany.mockResolvedValue([]);

      const result = await repository.getRecurrences('user-123');

      expect(result).toEqual([]);
    });
  });

  describe('getRecurrenceById', () => {
    it('should return a recurrence by id and userId', async () => {
      const userId = 'user-123';
      const recurrenceId = 'rec-456';
      const expected = {
        id: recurrenceId,
        userId,
        category: { id: 'cat-1', name: 'Food' },
        sourceAccount: { id: 'acc-1', name: 'Checking' },
        targetAccount: null,
      };
      prisma.recurrence.findFirst.mockResolvedValue(expected);

      const result = await repository.getRecurrenceById(userId, recurrenceId);

      expect(result).toEqual(expected);
      expect(prisma.recurrence.findFirst).toHaveBeenCalledWith({
        where: { id: recurrenceId, userId },
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
        },
      });
    });

    it('should return null if recurrence not found', async () => {
      prisma.recurrence.findFirst.mockResolvedValue(null);

      const result = await repository.getRecurrenceById(
        'user-123',
        'nonexistent',
      );

      expect(result).toBeNull();
    });
  });

  describe('saveRecurrence', () => {
    it('should create a new recurrence', async () => {
      const data = {
        userId: 'user-123',
        name: 'Netflix Subscription',
        type: 'EXPENSE' as const,
        amount: 50,
        frequency: 'MONTHLY' as const,
        categoryId: 'cat-1',
        sourceAccountId: 'acc-1',
        startDate: new Date('2026-01-01'),
      };
      const expected = { id: '1', ...data };
      prisma.recurrence.create.mockResolvedValue(expected);

      const result = await repository.saveRecurrence(data);

      expect(result).toEqual(expected);
      expect(prisma.recurrence.create).toHaveBeenCalledWith({
        data,
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
        },
      });
    });

    it('should use transaction client when provided', async () => {
      const data = {
        userId: 'user-123',
        name: 'Netflix Subscription',
        type: 'EXPENSE' as const,
        amount: 50,
        frequency: 'MONTHLY' as const,
        categoryId: 'cat-1',
        sourceAccountId: 'acc-1',
        startDate: new Date('2026-01-01'),
      };
      const txClient = {
        recurrence: {
          create: jest.fn().mockResolvedValue({ id: '1', ...data }),
        },
      } as any;

      const result = await repository.saveRecurrence(data, txClient);

      expect(result).toEqual({ id: '1', ...data });
      expect(txClient.recurrence.create).toHaveBeenCalledWith({
        data,
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
        },
      });
      expect(prisma.recurrence.create).not.toHaveBeenCalled();
    });
  });

  describe('updateRecurrence', () => {
    it('should update a recurrence', async () => {
      const id = 'rec-456';
      const data = { amount: 75 };
      const expected = { id, ...data };
      prisma.recurrence.update.mockResolvedValue(expected);

      const result = await repository.updateRecurrence(id, data);

      expect(result).toEqual(expected);
      expect(prisma.recurrence.update).toHaveBeenCalledWith({
        where: { id },
        data,
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
        },
      });
    });

    it('should use transaction client when provided', async () => {
      const id = 'rec-456';
      const data = { amount: 75 };
      const txClient = {
        recurrence: {
          update: jest.fn().mockResolvedValue({ id, ...data }),
        },
      } as any;

      const result = await repository.updateRecurrence(id, data, txClient);

      expect(result).toEqual({ id, ...data });
      expect(txClient.recurrence.update).toHaveBeenCalledWith({
        where: { id },
        data,
        include: {
          category: true,
          sourceAccount: true,
          targetAccount: true,
        },
      });
      expect(prisma.recurrence.update).not.toHaveBeenCalled();
    });
  });

  describe('getByMonthByTransactionType', () => {
    it('should return recurrences for a specific month and type', async () => {
      const userId = 'user-123';
      const expected = [
        {
          id: '1',
          userId,
          type: 'EXPENSE',
          startDate: new Date('2026-01-01'),
          endDate: null,
          isCardExpense: false,
        },
      ];
      prisma.recurrence.findMany.mockResolvedValue(expected);

      const result = await repository.getByMonthByTransactionType(
        userId,
        1,
        2026,
        'EXPENSE',
      );

      expect(result).toEqual(expected);
      expect(prisma.recurrence.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId,
            startDate: { lte: new Date(2026, 1, 0, 23, 59, 59) },
            type: 'EXPENSE',
            isCardExpense: false,
          }),
          include: {
            category: true,
            sourceAccount: true,
            targetAccount: true,
          },
          orderBy: [
            { currentPart: 'desc' },
            { nextDate: { sort: 'asc', nulls: 'last' } },
          ],
        }),
      );
    });

    it('should handle December correctly', async () => {
      const userId = 'user-123';
      prisma.recurrence.findMany.mockResolvedValue([]);

      await repository.getByMonthByTransactionType(userId, 12, 2026, 'INCOME');

      expect(prisma.recurrence.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            startDate: { lte: new Date(2026, 12, 0, 23, 59, 59) },
            type: 'INCOME',
          }),
        }),
      );
    });
  });
});
