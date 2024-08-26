import { Module } from "@nestjs/common";
import { CreateTaskUseCase } from "../use-case";
import { TaskController } from "./TaskController";
import { SsrTaskController } from "./SsrTaskController";

@Module({
    controllers: [TaskController, SsrTaskController],
    providers: [
        {
            provide: "createTask",
            useFactory: () => TaskModule.createTask
        }
    ]
})
export class TaskModule {
    static createTask: CreateTaskUseCase;
}