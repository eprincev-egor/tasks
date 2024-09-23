import { AuthClient } from "@gsoft/auth";
import { Controller, Get, Inject, Request, Response } from "@nestjs/common";
import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { Public } from "./middleware";

@Controller("openid")
export class OpenidController {

    constructor(
        @Inject("authClient")
        private authClient: AuthClient
    ) {}

    @Public()
    @Get("callback")
    async onOpenIdCallbackRequest(
        @Request() request: ExpressRequest,
        @Response() response: ExpressResponse
    ) {
        const {token} = await this.authClient.finishOpenIdLogin({
            callback: {
                url: `http://${request.headers.host}${request.url}`,
                ip: request.ip
            }
        });
        response.cookie("token", token.value);
        response.send("<script>location.href = \"/\";</script>");
    }

    @Get("logout")
    async onLogoutRequest(
        @Request() request: ExpressRequest,
        @Response() response: ExpressResponse
    ) {
        await this.authClient.logout({
            token: request.cookies.token,
            deviceIp: request.ip!
        });
        response.cookie("token", undefined);
        response.send("<script>location.href = \"/\";</script>");
    }
}
