// src/main.ts

import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost, app.get(Logger)),
  );

  const configService = app.get(ConfigService);

  const env = configService.get<string>('config.environment');

  const port = Number(process.env.PORT);

  const corsOrigins = configService
    .get<string>('config.cors.origins', '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'OPTIONS'],
  });

  // Enable shutdown hooks for graceful database connection closing
  app.enableShutdownHooks();

  try {
    await app.listen(port, '0.0.0.0');
    console.log('🚀 Backend started', {
      port,
      environment: env,
      corsOrigins,
    });
  } catch (error) {
    console.error('❌ BACKEND STARTUP FAILED');
    console.error(`   Error: ${error}`);
    process.exit(1); // Crash immediately - no point continuing
  }
}
void bootstrap();
