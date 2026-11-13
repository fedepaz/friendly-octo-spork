// src/modules/auditLog/repositories/auditLog.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';

@Injectable()
export class AuditLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUserId(userId: string) {
    return this.prisma.auditLog.findMany({
      // userId: null rows are system entries (public auth POSTs have no
      // session user yet) — include them alongside the caller's own entries
      where: { OR: [{ userId }, { userId: null }] },
      orderBy: { createdAt: 'desc' },
    });
  }
}
