// src/modules/auditLog/auditLog.service.ts

import { Injectable } from '@nestjs/common';
import { AuditLogRepository } from './repositories/auditLog.repository';
import { AuditLogQuery } from './dto/audit-log.query';

@Injectable()
export class AuditLogService {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  async findAllByUserId(userId: string, query?: AuditLogQuery) {
    return this.auditLogRepository.findAllByUserId(userId, query);
  }
}
