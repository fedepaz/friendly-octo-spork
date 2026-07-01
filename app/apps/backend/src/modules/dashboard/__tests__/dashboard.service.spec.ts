import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { DashboardService } from '../dashboard.service';
import { BudgetDashRepository } from '../repositories/budgetDash.repository';
import { AccountDashRepository } from '../repositories/accountDash.repository';
import { IncomeExpenseDashRepository } from '../repositories/income-expenseDash.repository';
import { RecurrenceDashRepository } from '../repositories/recurrenceDash.repository';
import type { BudgetMetric } from '../repositories/budgetDash.repository';
import type { IncomeExpenseInterface } from '../repositories/income-expenseDash.repository';

describe('DashboardService', () => {
  let service: DashboardService;
  let budgetRepo: {
    getBudgetMetrics: jest.Mock;
  };
  let accountRepo: {
    getRecentAccounts: jest.Mock;
  };
  let incomeExpenseRepo: {
    getMonthlyIncomeExpense: jest.Mock;
  };
  let recurrenceRepo: {
    getToPayByMonth: jest.Mock;
  };

  beforeEach(async () => {
    budgetRepo = {
      getBudgetMetrics: jest.fn(),
    };

    accountRepo = {
      getRecentAccounts: jest.fn(),
    };

    incomeExpenseRepo = {
      getMonthlyIncomeExpense: jest.fn(),
    };

    recurrenceRepo = {
      getToPayByMonth: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: BudgetDashRepository, useValue: budgetRepo },
        { provide: AccountDashRepository, useValue: accountRepo },
        { provide: IncomeExpenseDashRepository, useValue: incomeExpenseRepo },
        { provide: RecurrenceDashRepository, useValue: recurrenceRepo },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBudgetSummary', () => {
    it('should return budget metrics for valid userId', async () => {
      const metrics: BudgetMetric[] = [
        {
          category: 'FOOD' as any,
          spent: { toString: () => '5000.00' } as any,
          daysElapsed: 15,
          daysLeft: 15,
          dailyAvg: { toString: () => '333.33' } as any,
          projectedEnd: { toString: () => '10000.00' } as any,
        },
      ];
      budgetRepo.getBudgetMetrics.mockResolvedValue(metrics);

      const result = await service.getBudgetSummary('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].spent).toBe('5000.00');
      expect(result[0].dailyAvg).toBe('333.33');
      expect(result[0].projectedEnd).toBe('10000.00');
      expect(result[0].daysElapsed).toBe(15);
      expect(result[0].daysLeft).toBe(15);
      expect(budgetRepo.getBudgetMetrics).toHaveBeenCalledWith('user-1');
    });

    it('should return empty array when no budget data exists', async () => {
      budgetRepo.getBudgetMetrics.mockResolvedValue([]);

      const result = await service.getBudgetSummary('user-1');

      expect(result).toEqual([]);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getBudgetSummary('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(service.getBudgetSummary(null as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getRecentAccounts', () => {
    it('should return recent accounts for valid userId', async () => {
      const accounts = [
        { id: 'acc-1', name: 'Checking', balance: 5000 },
        { id: 'acc-2', name: 'Savings', balance: 10000 },
      ];
      accountRepo.getRecentAccounts.mockResolvedValue(accounts);

      const result = await service.getRecentAccounts('user-1');

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('acc-1');
      expect(accountRepo.getRecentAccounts).toHaveBeenCalledWith('user-1');
    });

    it('should return empty array when no accounts exist', async () => {
      accountRepo.getRecentAccounts.mockResolvedValue([]);

      const result = await service.getRecentAccounts('user-1');

      expect(result).toEqual([]);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getRecentAccounts('')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getMonthlyIncomeExpense', () => {
    it('should return monthly income/expense data', async () => {
      const data: IncomeExpenseInterface[] = [
        { month: 'Jan', income: 50000, expenses: 30000 },
        { month: 'Feb', income: 55000, expenses: 35000 },
      ];
      incomeExpenseRepo.getMonthlyIncomeExpense.mockResolvedValue(data);

      const result = await service.getMonthlyIncomeExpense('user-1');

      expect(result).toHaveLength(2);
      expect(result[0].month).toBe('Jan');
      expect(result[0].income).toBe('50000');
      expect(result[0].expenses).toBe('30000');
      expect(incomeExpenseRepo.getMonthlyIncomeExpense).toHaveBeenCalledWith(
        'user-1',
        6,
      );
    });

    it('should pass custom months parameter', async () => {
      incomeExpenseRepo.getMonthlyIncomeExpense.mockResolvedValue([]);

      await service.getMonthlyIncomeExpense('user-1', 12);

      expect(incomeExpenseRepo.getMonthlyIncomeExpense).toHaveBeenCalledWith(
        'user-1',
        12,
      );
    });

    it('should return empty array when no data exists', async () => {
      incomeExpenseRepo.getMonthlyIncomeExpense.mockResolvedValue([]);

      const result = await service.getMonthlyIncomeExpense('user-1');

      expect(result).toEqual([]);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getMonthlyIncomeExpense('')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getRecurrencesToPayCurrentMonth', () => {
    it('should return recurrences to pay for current month', async () => {
      const recurrences = [
        {
          id: 'rec-1',
          name: 'Rent',
          type: 'EXPENSE',
          amount: { toString: () => '1000.00' } as any,
          frequency: 'MONTHLY',
          startDate: new Date(),
          nextDate: new Date(),
          active: true,
          currentPart: 1,
          totalParts: 12,
          category: { id: 'cat-1', name: 'Housing' },
          sourceAccount: {
            id: 'acc-1',
            name: 'Checking',
            balance: { toString: () => '5000.00' },
          },
        },
      ];
      recurrenceRepo.getToPayByMonth.mockResolvedValue(recurrences);

      const result = await service.getRecurrencesToPayCurrentMonth('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].amount).toBe('1000.00');
      expect(result[0].sourceAccount!.balance).toBe('5000.00');
      expect(recurrenceRepo.getToPayByMonth).toHaveBeenCalledWith('user-1');
    });

    it('should return empty array when no recurrences to pay', async () => {
      recurrenceRepo.getToPayByMonth.mockResolvedValue([]);

      const result = await service.getRecurrencesToPayCurrentMonth('user-1');

      expect(result).toEqual([]);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getRecurrencesToPayCurrentMonth('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(
        service.getRecurrencesToPayCurrentMonth(null as any),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
