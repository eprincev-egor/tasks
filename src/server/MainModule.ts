import { Module } from "@nestjs/common";
import { TaskModule } from "../task/controller";
import { EmployeeModule } from "../employee/controller";
import { ServeStaticModule } from "@nestjs/serve-static";
import path from "path";

@Module({
    imports: [
        EmployeeModule,
        TaskModule,
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, "..", "browser", "static")
        })
    ]
})
export class MainModule {}