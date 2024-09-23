import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { strict } from "assert";
import { Request } from "express";

export const UserId = createParamDecorator((data: string, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const userId = request.cookies.userId;

    strict.ok(userId, "required call GlobalAuthGuard before this");
    return userId;
});