import { Module } from "@nestjs/common";
import { CreateTaskUseCase } from "../use-case";
import { TaskController } from "./TaskController";

@Module({
    controllers: [TaskController],
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