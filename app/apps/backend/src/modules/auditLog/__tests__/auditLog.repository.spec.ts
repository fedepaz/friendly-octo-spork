import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogRepository } from '../repositories/auditLog.repository';
import { PrismaService } from '../../../infra/prisma/prisma.service';

describe('AuditLogRepository', () => {
  let repository: AuditLogRepository;
  let prisma: {
    auditLog: {
      findMany: jest.Mock;
    };
    user: {
      findMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      auditLog: {
        findMany: jest.fn(),
      },
      user: {
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
    it('should attach the user relation to owned entries', async () => {
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
      prisma.user.findMany.mockResolvedValue([
        { id: 'user-1', name: 'masterofmoney', email: 'a@b.com' },
      ]);

      const result = await repository.findAllByUserId('user-1');

      expect(result).toEqual([
        {
          ...mockLogs[0],
          user: { id: 'user-1', name: 'masterofmoney', email: 'a@b.com' },
        },
      ]);
      expect(prisma.auditLog.findMany).toHaveBeenCalledWith({
        where: { OR: [{ userId: 'user-1' }, { userId: null }] },
        orderBy: { createdAt: 'desc' },
      });
      // select-only: passwordHash must never be selected
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { id: { in: ['user-1'] } },
        select: { id: true, name: true, email: true },
      });
    });

    it('should leave user undefined for system entries (userId null)', async () => {
      prisma.auditLog.findMany.mockResolvedValue([
        { id: '2', userId: null, endpoint: '/auth/login' },
      ]);

      const result = await repository.findAllByUserId('user-1');

      expect(result).toEqual([
        { id: '2', userId: null, endpoint: '/auth/login', user: undefined },
      ]);
      expect(prisma.user.findMany).not.toHaveBeenCalled();
    });

    it('should return empty array when no logs exist', async () => {
      prisma.auditLog.findMany.mockResolvedValue([]);

      const result = await repository.findAllByUserId('user-999');

      expect(result).toEqual([]);
      expect(prisma.user.findMany).not.toHaveBeenCalled();
    });
  });
});
