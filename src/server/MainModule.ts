import { Module } from "@nestjs/common";
import { TaskModule } from "../task/controller";
import { EmployeeModule } from "../employee/controller";
import { ServeStaticModule } from "@nestjs/serve-static";
import path from "path";
import { AuthModule } from "../auth/controller";

@Module({
    imports: [
        EmployeeModule,
        TaskModule,
        AuthModule,
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, "..", "browser", "static")
        })
    ]
})
export class MainModule {}