/* eslint-disable class-methods-use-this */
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";
import { AbstractDomainError } from "../../model";

@Catch(AbstractDomainError)
export class GlobalExceptionFilter implements ExceptionFilter {

    catch(exception: AbstractDomainError, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();

        response
            .status(400)
            .json({
                statusCode: exception.code,
                message: exception.message,
                timestamp: new Date().toISOString(),
                path: request.url
            });
    }
}