import { Module } from "@nestjs/common";
import { TaskModule } from "../task/controller";
import { EmployeeModule } from "../employee/controller";

@Module({
    imports: [
        EmployeeModule,
        TaskModule
    ]
})
export class MainModule {}