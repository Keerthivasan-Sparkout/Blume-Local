// src/common/filters/all-exceptions.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseUtil } from '../utils/response.utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse() as
        | { message: string | string[] }
        | string;
      message =
        typeof responseBody === 'string'
          ? responseBody
          : Array.isArray(responseBody.message)
          ? responseBody.message.join(', ')
          : responseBody.message;
    } else if ((exception as any)?.message) {
      message = (exception as any).message;
    }

    this.logger.error(`${request.method} ${request.url} → ${message}`);

    response.status(status).json(
      ResponseUtil.error(message, status),
    );
  }
}
