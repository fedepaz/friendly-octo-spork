// src/modules/auditLog/auditLog.controller.ts

import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuditLogService } from './auditLog.service';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@CurrentUser() user: AuthUser) {
    return this.auditLogService.findAllByUserId(user.id);
  }
}
