import { Module } from "@nestjs/common";
import { OpenidController } from "./OpenidController";
import { AuthClient } from "@gsoft/auth";

@Module({
    controllers: [
        OpenidController
    ],
    providers: [
        {
            provide: "authClient",
            useFactory: () => AuthModule.authClient
        }
    ]
})
export class AuthModule {
    static authClient: AuthClient;
}