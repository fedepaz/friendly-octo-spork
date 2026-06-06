// src/shared/filters/http-exception.filter.ts

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

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? this.parseExceptionResponse(exception.getResponse())
        : null;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    // Build standard error DTO
    const responseBody = {
      statusCode: httpStatus,
      code: this.getErrorCode(httpStatus, exceptionResponse),
      message: this.getErrorMessage(exceptionResponse) || message,
      details: this.getErrorDetails(exceptionResponse),
      timestamp: new Date().toISOString(),
      path,
    };

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
      return response.code as string;

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
      // NestJS class-validator or our custom Zod pipe details
      return response.error ?? response.details ?? null;
    }
    return null;
  }
}
