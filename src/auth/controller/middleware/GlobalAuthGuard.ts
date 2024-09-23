/* eslint-disable class-methods-use-this */
import { AuthClient } from "@gsoft/auth";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request, Response } from "express";

export class GlobalAuthGuard implements CanActivate {

    constructor(
        private authClient: AuthClient,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>( "isPublic", context.getHandler() );
        if ( isPublic ) return true;

        const request: Request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();

        try {
            const {userId} = await this.authClient.authorize({
                token: request.cookies.token,
                deviceIp: request.ip!
            });
            request.cookies.userId = userId;
            return true;
        }
        catch {
            const loginUrl = await this.authClient.generateOpenIdLoginUrl();
            response.redirect(loginUrl);
            return false;
        }
    }

}
