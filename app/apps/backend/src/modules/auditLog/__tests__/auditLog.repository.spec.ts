import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogRepository } from '../repositories/auditLog.repository';
import { PrismaService } from '../../../infra/prisma/prisma.service';

describe('AuditLogRepository', () => {
  let repository: AuditLogRepository;
  let prisma: {
    auditLog: {
      findMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      auditLog: {
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditLogRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<AuditLogRepository>(AuditLogRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAllByUserId', () => {
    it('should return audit logs for a user', async () => {
      const mockLogs = [
        {
          id: '1',
          userId: 'user-1',
          action: 'CREATE',
          entityType: 'ACCOUNT',
          entityId: 'acc-1',
          changes: null,
          endpoint: '/accounts',
          method: 'POST',
          ipAddress: '127.0.0.1',
          userAgent: 'Mozilla/5.0',
          durationMs: 42,
          createdAt: new Date(),
        },
      ];
      prisma.auditLog.findMany.mockResolvedValue(mockLogs);

      const result = await repository.findAllByUserId('user-1');

      expect(result).toEqual(mockLogs);
      expect(prisma.auditLog.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return empty array when no logs exist', async () => {
      prisma.auditLog.findMany.mockResolvedValue([]);

      const result = await repository.findAllByUserId('user-999');

      expect(result).toEqual([]);
      expect(prisma.auditLog.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-999' },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
