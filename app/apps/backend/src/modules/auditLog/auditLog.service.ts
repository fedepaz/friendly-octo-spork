// src/modules/auditLog/auditLog.service.ts

import { Injectable } from '@nestjs/common';
import { AuditLogRepository } from './repositories/auditLog.repository';

@Injectable()
export class AuditLogService {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  async findAllByUserId(userId: string) {
    return this.auditLogRepository.findAllByUserId(userId);
  }
}
