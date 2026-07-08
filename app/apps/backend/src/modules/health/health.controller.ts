import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { HealthService } from './health.service';
import { Public } from '../../shared/decorators/public.decorator';
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);
  constructor(private readonly healthService: HealthService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @Public()
  async healthCheck() {
    return this.healthService.getAllServicesStatus();
  }

  @Get('auth')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'user_profile', action: 'read' })
  authCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      auth: 'authenticated',
    };
  }
}
