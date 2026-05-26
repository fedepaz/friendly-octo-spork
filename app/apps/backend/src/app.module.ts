// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validationSchema } from './config/configuration';
import path from 'path';
import { LoggerModule } from 'nestjs-pino';
import { pinoStream } from './config/logger';
import { PrismaModule } from './infra/prisma/prisma.module';
import { IncomingMessage } from 'http';

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
        level: 'debug',
        stream: pinoStream,
        redact: [
          'req.headers.authorization',
          'req.body.password',
          'req.body.token',
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
    PrismaModule,
  ],
})
export class AppModule {}
