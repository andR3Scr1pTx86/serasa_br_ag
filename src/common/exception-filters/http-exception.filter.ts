import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";

import { Response } from 'express';

import { ValidationError } from "@core/exceptions/validation-error.exception";

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
    catch(exception: ValidationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: exception.message,
            error: 'Bad Request',
        });
    }
}