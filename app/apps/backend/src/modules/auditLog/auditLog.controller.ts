import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AuditLogService } from './auditLog.service';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation-pipe';
import { auditLogQuerySchema, AuditLogQuery } from './dto/audit-log.query';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'audit_logs', action: 'read' })
  async findAll(
    @CurrentUser() user: AuthUser,
    @Query(new ZodValidationPipe(auditLogQuerySchema)) query: AuditLogQuery,
  ) {
    return this.auditLogService.findAllByUserId(user.id, query);
  }
}
