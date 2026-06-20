import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly configService: ConfigService) {
    const databaseUrl = configService.get<string>(
      'config.database_dev.databaseUrl',
    );
    const adapter = new PrismaPg({ connectionString: databaseUrl });
    super({ adapter, log: ['info', 'warn', 'error'] });
  }

  async onModuleInit() {
    this.logger.log('🔄 INITIALIZING DATABASE CONNECTION...');

    const maxRetries = 5;
    const retryDelay = 3000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const user = this.configService.get<string>('config.database_dev.user');
        const databaseName = this.configService.get<string>(
          'config.database_dev.databaseName',
        );
        await this.$connect();
        await this.$queryRaw`SELECT 1 as health`;
        this.logger.log(
          `Database connection successful: -user: ${user} -database: ${databaseName}`,
        );
        return;
      } catch (error) {
        const errorMsg = (error as Error).message;
        if (attempt === maxRetries) {
          this.logger.error('❌ DATABASE CONNECTION FAILED AFTER RETRIES');
          throw error;
        }
        this.logger.warn(
          `⚠️  Attempt ${attempt}/${maxRetries} failed, retrying in ${retryDelay}ms...`,
        );
        this.logger.debug(`   Error: ${errorMsg}`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        continue;
      }
    }
  }

  async onModuleDestroy() {
    this.logger.log('🔌 CLOSING DATABASE CONNECTION...');
    try {
      await this.$disconnect();
      this.logger.log('✅ DATABASE CONNECTION CLOSED');
    } catch (error) {
      this.logger.error('❌ DATABASE CONNECTION FAILED TO CLOSE');
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`   Error: ${errorMsg}`);
    }
  }

  async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    retryDelay = 1000,
  ): Promise<T> {
    let lastError: Error = new Error('Unknown error');
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        const isPoolTimeout =
          lastError.message.includes('pool is closed') ||
          lastError.message.includes('Connection killed');
        if (isPoolTimeout && attempt < maxRetries) {
          this.logger.warn(
            `Pool timeout (attempt ${attempt}/${maxRetries}), retrying...`,
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          continue;
        }
        throw lastError;
      }
    }
    throw lastError;
  }

  async checkHealth(timeout = 10000): Promise<boolean> {
    try {
      const result = await Promise.race([
        this.$executeRaw`SELECT 1 as health`,
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Health Timeout')), timeout),
        ),
      ]);
      this.logger.debug(`Database health check result: ${result}`);
      return true;
    } catch (error) {
      this.logger.error('Database health check failed', error);
      try {
        this.logger.warn('Trying to reconnect');
        await this.$disconnect();
        await this.$connect();
        this.logger.log('Database connection recovered');
        return true;
      } catch (recoverError) {
        this.logger.error('Database connection recovery failed', recoverError);
        return false;
      }
    }
  }
}
