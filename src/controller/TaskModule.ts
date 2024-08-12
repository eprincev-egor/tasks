import { Module } from "@nestjs/common";
import { EmployeeController } from "./EmployeeController";
import { CreateEmployeeUseCase, CreateTaskUseCase } from "../use-case";
import { TaskController } from "./TaskController";

@Module({
    controllers: [
        EmployeeController,
        TaskController
    ],
    providers: [
        {
            provide: "createEmployee",
            useFactory: () => TaskModule.createEmployee
        },
        {
            provide: "createTask",
            useFactory: () => TaskModule.createTask
        }
    ]
})
export class TaskModule {
    static createEmployee: CreateEmployeeUseCase;
    static createTask: CreateTaskUseCase;
}
