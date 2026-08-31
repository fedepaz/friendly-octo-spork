// backend/src/app.module.ts

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validationSchema } from './config/configuration';
import path from 'path';
import { LoggerModule } from 'nestjs-pino';
import { getPinoStream } from './config/logger';
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
import { PermissionsModule } from './modules/permissions/permissions.module';
import { PermissionsGuard } from './modules/permissions/guards/permissions.guard';
import { RequestIdMiddleware } from './shared/middleware/request-id.middleware';
import { AuditLogModule } from './modules/auditLog/auditLog.module';
import { EntitiesModule } from './modules/entities/entities.module';
import { InvestmentsModule } from './modules/investments/investment.module';

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
    LoggerModule.forRootAsync({
      useFactory: async () => ({
        pinoHttp: {
          level:
            process.env.BACKEND_NODE_ENV === 'production' ? 'info' : 'debug',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          stream: await getPinoStream(),
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
    PermissionsModule,
    AuditLogModule,
    EntitiesModule,
    InvestmentsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
