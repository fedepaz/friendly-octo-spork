import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogService } from '../auditLog.service';
import { AuditLogRepository } from '../repositories/auditLog.repository';

describe('AuditLogService', () => {
  let service: AuditLogService;
  let repository: { findAllByUserId: jest.Mock };

  beforeEach(async () => {
    repository = { findAllByUserId: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditLogService,
        { provide: AuditLogRepository, useValue: repository },
      ],
    }).compile();

    service = module.get(AuditLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllByUserId', () => {
    it('should return audit logs for a user', async () => {
      const mockLogs = [
        { id: '1', userId: 'user-1', action: 'CREATE', entityType: 'ACCOUNT' },
      ];
      repository.findAllByUserId.mockResolvedValue(mockLogs);

      const result = await service.findAllByUserId('user-1');

      expect(result).toEqual(mockLogs);
      expect(repository.findAllByUserId).toHaveBeenCalledWith(
        'user-1',
        undefined,
      );
    });

    it('should forward the query to the repository', async () => {
      repository.findAllByUserId.mockResolvedValue([]);

      const query = { month: 11, year: 2026, action: 'DELETE' as const };
      await service.findAllByUserId('user-1', query);

      expect(repository.findAllByUserId).toHaveBeenCalledWith('user-1', query);
    });

    it('should return empty array when no logs exist', async () => {
      repository.findAllByUserId.mockResolvedValue([]);

      const result = await service.findAllByUserId('user-999');

      expect(result).toEqual([]);
    });
  });
});
