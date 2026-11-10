import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { InvestmentService } from '../investment.service';
import { InvestmentRepository } from '../repositories/investment.repository';

describe('InvestmentService', () => {
  let service: InvestmentService;
  let repo: {
    getInvestmentAccounts: jest.Mock;
  };

  beforeEach(async () => {
    repo = { getInvestmentAccounts: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestmentService,
        { provide: InvestmentRepository, useValue: repo },
      ],
    }).compile();

    service = module.get<InvestmentService>(InvestmentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getInvestments', () => {
    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getInvestments('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(
        service.getInvestments(null as unknown as string),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return empty array when no investment accounts exist', async () => {
      repo.getInvestmentAccounts.mockResolvedValue([]);

      const result = await service.getInvestments('user-1');

      expect(result).toEqual([]);
      expect(repo.getInvestmentAccounts).toHaveBeenCalledWith('user-1');
    });

    it('should return InvestmentDTO[] with correct totalValue', async () => {
      repo.getInvestmentAccounts.mockResolvedValue([
        {
          id: 'inv-1',
          name: 'Fondo RyC',
          currency: 'ARS',
          principal: { plus: (_o: any) => ({ toString: () => '15000.00' }) },
          totalEarned: { toString: () => '5000.00' },
          transactionCount: BigInt(3),
        },
      ]);

      const result = await service.getInvestments('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('inv-1');
      expect(result[0].name).toBe('Fondo RyC');
      expect(result[0].totalValue).toBe('15000.00');
    });

    it('should convert Decimal fields to strings', async () => {
      repo.getInvestmentAccounts.mockResolvedValue([
        {
          id: 'inv-1',
          name: 'FCI',
          currency: 'USD',
          principal: { plus: (_o: any) => ({ toString: () => '1000.00' }) },
          totalEarned: { toString: () => '250.00' },
          transactionCount: BigInt(1),
        },
      ]);

      const result = await service.getInvestments('user-1');

      expect(typeof result[0].principal).toBe('string');
      expect(typeof result[0].totalEarned).toBe('string');
      expect(typeof result[0].totalValue).toBe('string');
    });

    it('should convert bigint transactionCount to number', async () => {
      repo.getInvestmentAccounts.mockResolvedValue([
        {
          id: 'inv-1',
          name: 'Bono',
          currency: 'ARS',
          principal: { plus: (_o: any) => ({ toString: () => '5000.00' }) },
          totalEarned: { toString: () => '500.00' },
          transactionCount: BigInt(7),
        },
      ]);

      const result = await service.getInvestments('user-1');

      expect(typeof result[0].transactionCount).toBe('number');
      expect(result[0].transactionCount).toBe(7);
    });

    it('should handle multiple investment accounts', async () => {
      repo.getInvestmentAccounts.mockResolvedValue([
        {
          id: 'inv-1',
          name: 'FCI',
          currency: 'ARS',
          principal: { plus: (_o: any) => ({ toString: () => '10000.00' }) },
          totalEarned: { toString: () => '1000.00' },
          transactionCount: BigInt(2),
        },
        {
          id: 'inv-2',
          name: 'Dolar MEP',
          currency: 'USD',
          principal: { plus: (_o: any) => ({ toString: () => '500.00' }) },
          totalEarned: { toString: () => '50.00' },
          transactionCount: BigInt(1),
        },
      ]);

      const result = await service.getInvestments('user-1');

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('FCI');
      expect(result[1].name).toBe('Dolar MEP');
    });

    it('should handle zero totalEarned (no RETURN transactions)', async () => {
      repo.getInvestmentAccounts.mockResolvedValue([
        {
          id: 'inv-1',
          name: 'Plazo Fijo',
          currency: 'ARS',
          principal: { plus: (_o: any) => ({ toString: () => '5000.00' }) },
          totalEarned: { toString: () => '0' },
          transactionCount: BigInt(0),
        },
      ]);

      const result = await service.getInvestments('user-1');

      expect(result[0].totalEarned).toBe('0');
      expect(result[0].transactionCount).toBe(0);
    });
  });
});
