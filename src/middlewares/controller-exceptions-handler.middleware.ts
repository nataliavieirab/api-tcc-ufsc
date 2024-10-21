import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Catch,
} from '@nestjs/common';
import { BaseError } from 'src/errors/base.error';

@Catch()
export class ControllerExceptionsHandler implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: any = ctx.getResponse<Response>();

    const status = this.getStatus(exception);
    const message = this.getResponse(exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: message,
    });
  }

  private getStatus(exception: Error): number {
    return exception instanceof BaseError || exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getResponse(exception: Error): string | object {
    if (exception instanceof BaseError || exception instanceof HttpException)
      return exception.getResponse();
    throw exception;
  }
}
