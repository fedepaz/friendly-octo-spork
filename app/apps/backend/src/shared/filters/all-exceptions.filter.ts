// src/shared/filters/all-exceptions.filter.ts

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ErrorCode } from '@repo/shared';

interface ExceptionResponse {
  code?: ErrorCode;
  message?: string | string[];
  error?: unknown;
  details?: unknown;
}

const DB_ERROR_PATTERNS = [
  'pool_timeout',
  'econnrefused',
  'etimedout',
  'connection timeout',
  'P1001',
  'P1008',
  'P1017',
  'ECONNRESET',
];

const SENSITIVE_MESSAGE_PATTERNS = [
  /password/gi,
  /secret/gi,
  /token/gi,
  /key/gi,
  /authorization/gi,
  /bearer/gi,
  /credential/gi,
];

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Record<string, unknown>>();
    const response = ctx.getResponse<Record<string, unknown>>();
    const path = httpAdapter.getRequestUrl(request) as string;

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? this.parseExceptionResponse(exception.getResponse())
        : null;

    let message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    // Database error detection → 503
    const rawMessage = this.getErrorMessage(exceptionResponse) || message;
    const isDbError = DB_ERROR_PATTERNS.some((p) =>
      rawMessage.toLowerCase().includes(p.toLowerCase()),
    );
    if (isDbError) {
      httpStatus = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'Service temporarily unavailable';
    }

    // Sanitize sensitive messages
    const sanitizedMessage = this.sanitizeMessage(rawMessage);

    // Build standard error DTO
    const responseBody: Record<string, unknown> = {
      statusCode: httpStatus,
      code: this.getErrorCode(httpStatus, exceptionResponse),
      message: isDbError ? message : sanitizedMessage,
      details: this.getErrorDetails(exceptionResponse),
      timestamp: new Date().toISOString(),
      path,
    };

    // Dev stack trace exposure
    if (process.env.NODE_ENV !== 'production' && exception instanceof Error) {
      responseBody.debug = exception.stack;
    }

    // Production error hiding for 500+
    if (process.env.NODE_ENV === 'production' && httpStatus >= 500) {
      responseBody.message = 'Internal Server Error';
      delete responseBody.debug;
    }

    // Pino Logging Logic
    if (httpStatus >= 500) {
      this.logger.error(
        {
          err: exception,
          path: responseBody.path,
        },
        `Unhandled Exception: ${message}`,
      );
    } else {
      this.logger.warn(
        {
          statusCode: httpStatus,
          path: responseBody.path,
          details: responseBody.details,
        },
        `Client Error: ${message}`,
      );
    }

    httpAdapter.reply(response, responseBody, httpStatus);
  }

  private sanitizeMessage(message: string): string {
    for (const pattern of SENSITIVE_MESSAGE_PATTERNS) {
      if (pattern.test(message)) {
        return 'Invalid Request';
      }
    }
    return message;
  }

  private parseExceptionResponse(
    response: string | object,
  ): ExceptionResponse | string {
    if (typeof response === 'string') return response;
    return response;
  }

  private getErrorCode(
    status: number,
    response: ExceptionResponse | string | null,
  ): string {
    if (response && typeof response === 'object' && response.code)
      return response.code;

    switch (status) {
      case 400:
        return 'VALIDATION_ERROR';
      case 401:
        return 'UNAUTHORIZED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      case 408:
        return 'TIMEOUT_ERROR';
      case 503:
        return 'SERVICE_UNAVAILABLE';
      default:
        return 'INTERNAL_ERROR';
    }
  }

  private getErrorMessage(response: ExceptionResponse | string | null): string {
    if (typeof response === 'string') return response;
    if (response?.message) {
      return Array.isArray(response.message)
        ? response.message[0]
        : response.message;
    }
    return 'Internal server error';
  }

  private getErrorDetails(
    response: ExceptionResponse | string | null,
  ): unknown {
    if (typeof response === 'object' && response !== null) {
      return response.error ?? response.details ?? null;
    }
    return null;
  }
}
