import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuditLogService } from './auditLog.service';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'audit_logs', action: 'read' })
  async findAll(@CurrentUser() user: AuthUser) {
    return this.auditLogService.findAllByUserId(user.id);
  }
}
