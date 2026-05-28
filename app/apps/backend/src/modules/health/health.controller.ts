// src/modules/health/health.controller.ts

import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { HealthService } from './health.service';
import { Public } from '../../shared/decorators/public.decorator';

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
  authCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      auth: 'authenticated',
    };
  }
}
