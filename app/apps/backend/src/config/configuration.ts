// apps/backend/src/config/configuration.ts
import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

// Define a strict type for our configuration
export type AppConfig = {
  environment: string;
  port: number;
  url: string;
  cors: {
    origins: string;
  };
  database_dev: {
    databaseUrl: string;
    host: string;
    port: number;
    databaseName: string;
    user: string;
    password: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  defaultPassword: string;
};

// Create a typed factory function
const configFactory = (): AppConfig => ({
  environment: process.env.BACKEND_NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  url: process.env.URL || 'http://localhost:3001',
  cors: {
    origins: process.env.CORS_ORIGINS || '',
  },
  database_dev: {
    databaseUrl: process.env.DATABASE_URL || '',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    databaseName: process.env.DATABASE_DATABASE_NAME || 'finance-app',
    user: process.env.DATABASE_USER || 'user',
    password: process.env.DATABASE_PASSWORD || 'password',
  },
  jwt: {
    secret:
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-prod',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret:
      process.env.JWT_REFRESH_SECRET ||
      'your-super-secret-refresh-jwt-key-change-in-prod',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '12h',
  },
  defaultPassword: process.env.DEFAULT_PASSWORD || '',
});

// Export the final configuration
export const configuration = registerAs<AppConfig>('config', configFactory);

// Joi validation schema
export const validationSchema = Joi.object({
  BACKEND_NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().port().default(3001),
  URL: Joi.string().uri().default('http://localhost:3001'),
  CORS_ORIGINS: Joi.string().optional(),

  DATABASE_URL: Joi.string().required(),
  DATABASE_HOST: Joi.string().hostname().required(),
  DATABASE_PORT: Joi.number().port().required(),
  DATABASE_DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),

  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  DEFAULT_PASSWORD: Joi.string().optional().allow(''),
});
