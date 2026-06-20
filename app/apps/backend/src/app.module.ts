// backend/src/app.module.ts

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validationSchema } from './config/configuration';
import path from 'path';
import { LoggerModule } from 'nestjs-pino';
import { pinoStream } from './config/logger';
import { PrismaModule } from './infra/prisma/prisma.module';
import { IncomingMessage } from 'http';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalAuthGuard } from './modules/auth/guards/global-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AccountsModule } from './modules/accounts/account.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RecurrencesModule } from './modules/recurrences/recurrence.module';
import { TransactionModule } from './modules/transactions/transaction.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CardModule } from './modules/card/card.module';
import { RequestIdMiddleware } from './shared/middleware/request-id.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
      envFilePath: [
        path.join(
          __dirname,
          `../../.env.${process.env.NODE_ENV || 'development'}`,
        ),
        path.join(__dirname, `../../.env`),
      ],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.BACKEND_NODE_ENV === 'production' ? 'info' : 'debug',
        stream: pinoStream,
        redact: [
          'req.headers.authorization',
          'req.body.password',
          'req.body.newPassword',
          'req.body.currentPassword',
          'req.body.token',
          'req.body.refreshToken',
        ],
        customProps: (req: IncomingMessage) => ({
          correlationId: req.headers?.['x-correlation-id'],
        }),
        serializers: {
          req: (req: IncomingMessage) => ({
            method: req.method,
            url: req.url,
            ip: req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress,
          }),
        },
      },
    }),
    AuthModule,
    PrismaModule,
    HealthModule,
    DashboardModule,
    AccountsModule,
    CategoriesModule,
    RecurrencesModule,
    TransactionModule,
    UsersModule,
    CardModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
