import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { RecurrenceService } from '../recurrence.service';
import { RecurrenceRepository } from '../../../repositories/recurrence.repository';
import type { RecurrenceWithRelations } from '../../../repositories/recurrence.repository';

// Helper to create a mock RecurrenceWithRelations
function mockRecurrence(
  overrides: Partial<RecurrenceWithRelations> = {},
): RecurrenceWithRelations {
  return {
    id: 'rec-1',
    userId: 'user-1',
    name: 'Monthly Rent',
    type: 'EXPENSE',
    amount: { toString: () => '1000.00' } as any,
    frequency: 'MONTHLY',
    totalParts: 12,
    currentPart: 1,
    startDate: new Date('2024-01-01'),
    nextDate: new Date('2024-02-01'),
    endDate: new Date('2024-12-31'),
    active: true,
    categoryId: 'cat-1',
    sourceAccountId: 'acc-1',
    targetAccountId: null,
    isCardExpense: false,
    cardType: null,
    metadata: null,
    category: { id: 'cat-1', name: 'Housing' } as any,
    sourceAccount: {
      id: 'acc-1',
      name: 'Checking',
      balance: { toString: () => '5000.00' },
    } as any,
    targetAccount: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as RecurrenceWithRelations;
}

describe('RecurrenceService', () => {
  let service: RecurrenceService;
  let recurrenceRepo: {
    getRecurrences: jest.Mock;
    getRecurrenceById: jest.Mock;
    saveRecurrence: jest.Mock;
    updateRecurrence: jest.Mock;
    getByMonthByTransactionType: jest.Mock;
  };

  beforeEach(async () => {
    recurrenceRepo = {
      getRecurrences: jest.fn(),
      getRecurrenceById: jest.fn(),
      saveRecurrence: jest.fn(),
      updateRecurrence: jest.fn(),
      getByMonthByTransactionType: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecurrenceService,
        { provide: RecurrenceRepository, useValue: recurrenceRepo },
      ],
    }).compile();

    service = module.get<RecurrenceService>(RecurrenceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getRecurrences', () => {
    it('should return recurrences for valid userId', async () => {
      const recurrences = [mockRecurrence()];
      recurrenceRepo.getRecurrences.mockResolvedValue(recurrences);

      const result = await service.getRecurrences('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('rec-1');
      expect(result[0].amount).toBe('1000.00');
      expect(result[0].sourceAccount!.balance).toBe('5000.00');
      expect(recurrenceRepo.getRecurrences).toHaveBeenCalledWith('user-1');
    });

    it('should return empty array when no recurrences exist', async () => {
      recurrenceRepo.getRecurrences.mockResolvedValue([]);

      const result = await service.getRecurrences('user-1');

      expect(result).toEqual([]);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getRecurrences('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(service.getRecurrences(null as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getRecurrenceById', () => {
    it('should return recurrence by id', async () => {
      const recurrence = mockRecurrence({ id: 'rec-123' });
      recurrenceRepo.getRecurrenceById.mockResolvedValue(recurrence);

      const result = await service.getRecurrenceById('user-1', 'rec-123');

      expect(result).not.toBeNull();
      expect(result!.id).toBe('rec-123');
      expect(result!.amount).toBe('1000.00');
      expect(recurrenceRepo.getRecurrenceById).toHaveBeenCalledWith(
        'user-1',
        'rec-123',
      );
    });

    it('should return null if recurrence not found', async () => {
      recurrenceRepo.getRecurrenceById.mockResolvedValue(null);

      const result = await service.getRecurrenceById('user-1', 'nonexistent');

      expect(result).toBeNull();
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getRecurrenceById('', 'rec-1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('createRecurrenceForTransaction', () => {
    it('should create a recurrence successfully', async () => {
      const data = {
        recurrenceName: 'Monthly Rent',
        type: 'EXPENSE' as const,
        amount: '1000.00',
        frequency: 'MONTHLY' as const,
        totalParts: 12,
        date: new Date('2024-01-01'),
        isFirstPayment: true,
        isRecurrence: true,
        categoryId: 'cat-1',
        sourceAccountId: 'acc-1',
        targetAccountId: null,
        shouldStopRecurrence: false,
        isCardExpense: false,
        cardType: null,
        metadata: null,
      };

      const savedRecurrence = mockRecurrence();
      recurrenceRepo.saveRecurrence.mockResolvedValue(savedRecurrence);

      const result = await service.createRecurrenceForTransaction(
        data as any,
        'user-1',
        {} as any,
      );

      expect(result).not.toBeNull();
      expect(result.id).toBe('rec-1');
      expect(result.amount).toBe('1000.00');
      expect(recurrenceRepo.saveRecurrence).toHaveBeenCalled();
    });

    it('should throw BadRequestException if recurrence name is missing', async () => {
      const data = {
        recurrenceName: undefined,
        type: 'EXPENSE',
        amount: '1000.00',
        frequency: 'MONTHLY',
        date: new Date('2024-01-01'),
        isFirstPayment: true,
        isRecurrence: true,
      };

      await expect(
        service.createRecurrenceForTransaction(
          data as any,
          'user-1',
          {} as any,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should calculate correct dates for monthly frequency', async () => {
      const data = {
        recurrenceName: 'Monthly Bill',
        type: 'EXPENSE' as const,
        amount: '500.00',
        frequency: 'MONTHLY' as const,
        totalParts: 3,
        date: new Date('2024-01-15'),
        isFirstPayment: true,
        isRecurrence: true,
        categoryId: 'cat-1',
        sourceAccountId: 'acc-1',
        shouldStopRecurrence: false,
      };

      const savedRecurrence = mockRecurrence();
      recurrenceRepo.saveRecurrence.mockResolvedValue(savedRecurrence);

      await service.createRecurrenceForTransaction(
        data as any,
        'user-1',
        {} as any,
      );

      // Verify the saveRecurrence was called with calculated dates
      const saveCall = recurrenceRepo.saveRecurrence.mock.calls[0][0];
      expect(saveCall.startDate).toBeInstanceOf(Date);
      expect(saveCall.nextDate).toBeInstanceOf(Date);
      expect(saveCall.endDate).toBeInstanceOf(Date);
    });

    it('should set nextDate to startDate when isFirstPayment is false', async () => {
      const data = {
        recurrenceName: 'Monthly Bill',
        type: 'EXPENSE' as const,
        amount: '500.00',
        frequency: 'MONTHLY' as const,
        totalParts: 3,
        date: new Date('2024-01-15'),
        isFirstPayment: false,
        isRecurrence: true,
        categoryId: 'cat-1',
        sourceAccountId: 'acc-1',
        shouldStopRecurrence: false,
      };

      const savedRecurrence = mockRecurrence();
      recurrenceRepo.saveRecurrence.mockResolvedValue(savedRecurrence);

      await service.createRecurrenceForTransaction(
        data as any,
        'user-1',
        {} as any,
      );

      const saveCall = recurrenceRepo.saveRecurrence.mock.calls[0][0];
      // When isFirstPayment is false, startDate should be advanced by frequency
      expect(saveCall.startDate).toBeInstanceOf(Date);
      expect(saveCall.nextDate).toBeInstanceOf(Date);
    });
  });

  describe('updateRecurrenceForTransaction', () => {
    it('should update recurrence successfully', async () => {
      const recurrence = mockRecurrence();
      recurrenceRepo.getRecurrenceById.mockResolvedValue(recurrence);
      const updatedRecurrence = mockRecurrence({ currentPart: 2 });
      recurrenceRepo.updateRecurrence.mockResolvedValue(updatedRecurrence);

      const result = await service.updateRecurrenceForTransaction(
        'rec-1',
        'user-1',
        { shouldStopRecurrence: false } as any,
        {} as any,
      );

      expect(result).not.toBeNull();
      expect(result.currentPart).toBe(2);
      expect(recurrenceRepo.updateRecurrence).toHaveBeenCalled();
    });

    it('should throw BadRequestException if recurrence id is empty', async () => {
      await expect(
        service.updateRecurrenceForTransaction(
          '',
          'user-1',
          {} as any,
          {} as any,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if userId is empty', async () => {
      await expect(
        service.updateRecurrenceForTransaction(
          'rec-1',
          '',
          {} as any,
          {} as any,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if recurrence not found', async () => {
      recurrenceRepo.getRecurrenceById.mockResolvedValue(null);

      await expect(
        service.updateRecurrenceForTransaction(
          'nonexistent',
          'user-1',
          {} as any,
          {} as any,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should deactivate recurrence when it is the last part', async () => {
      const recurrence = mockRecurrence({
        totalParts: 3,
        currentPart: 2,
      });
      recurrenceRepo.getRecurrenceById.mockResolvedValue(recurrence);
      const updatedRecurrence = mockRecurrence({
        totalParts: 3,
        currentPart: 3,
        active: false,
      });
      recurrenceRepo.updateRecurrence.mockResolvedValue(updatedRecurrence);

      const result = await service.updateRecurrenceForTransaction(
        'rec-1',
        'user-1',
        { shouldStopRecurrence: false } as any,
        {} as any,
      );

      expect(result.active).toBe(false);
    });

    it('should deactivate recurrence when shouldStopRecurrence is true', async () => {
      const recurrence = mockRecurrence();
      recurrenceRepo.getRecurrenceById.mockResolvedValue(recurrence);
      const updatedRecurrence = mockRecurrence({ active: false });
      recurrenceRepo.updateRecurrence.mockResolvedValue(updatedRecurrence);

      const result = await service.updateRecurrenceForTransaction(
        'rec-1',
        'user-1',
        { shouldStopRecurrence: true } as any,
        {} as any,
      );

      expect(result.active).toBe(false);
    });
  });

  describe('getRecurrencesByMonth', () => {
    it('should return recurrences for a specific month', async () => {
      const recurrences = [mockRecurrence()];
      recurrenceRepo.getByMonthByTransactionType.mockResolvedValue(recurrences);

      const result = await service.getRecurrencesByMonth(
        'user-1',
        6,
        2024,
        'EXPENSE',
      );

      expect(result).toHaveLength(1);
      expect(result[0].amount).toBe('1000.00');
      expect(recurrenceRepo.getByMonthByTransactionType).toHaveBeenCalledWith(
        'user-1',
        6,
        2024,
        'EXPENSE',
      );
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(
        service.getRecurrencesByMonth('', 6, 2024, 'EXPENSE'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
