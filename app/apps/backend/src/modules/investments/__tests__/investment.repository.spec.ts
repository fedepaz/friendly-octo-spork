import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentRepository } from '../repositories/investment.repository';
import { PrismaService } from '../../../infra/prisma/prisma.service';

describe('InvestmentRepository', () => {
  let repository: InvestmentRepository;
  let prisma: {
    $queryRaw: jest.Mock;
  };

  beforeEach(async () => {
    prisma = { $queryRaw: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestmentRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<InvestmentRepository>(InvestmentRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getInvestmentAccounts', () => {
    it('should call prisma.$queryRaw with SQL containing INVESTMENT type', async () => {
      prisma.$queryRaw.mockResolvedValue([]);

      await repository.getInvestmentAccounts('user-1');

      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
      const sql = prisma.$queryRaw.mock.calls[0][0];
      expect(sql.join('')).toContain("a.type = 'INVESTMENT'");
    });

    it('should pass userId as parameter in query', async () => {
      prisma.$queryRaw.mockResolvedValue([]);

      await repository.getInvestmentAccounts('user-123');

      const sql = prisma.$queryRaw.mock.calls[0][0];
      const fullQuery = sql.join('?');
      expect(fullQuery).toContain('userId');
    });

    it('should return empty array when no rows match', async () => {
      prisma.$queryRaw.mockResolvedValue([]);

      const result = await repository.getInvestmentAccounts('user-1');

      expect(result).toEqual([]);
    });

    it('should return mapped rows with correct field names', async () => {
      const mockRow = {
        id: 'inv-1',
        name: 'FCI',
        currency: 'ARS',
        principal: { toString: () => '10000.00' },
        totalEarned: { toString: () => '1000.00' },
        transactionCount: BigInt(2),
      };
      prisma.$queryRaw.mockResolvedValue([mockRow]);

      const result = await repository.getInvestmentAccounts('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('inv-1');
      expect(result[0].name).toBe('FCI');
      expect(result[0].currency).toBe('ARS');
    });
  });
});
