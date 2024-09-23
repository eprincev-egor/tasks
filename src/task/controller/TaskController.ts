import { Body, Controller, Inject, Put } from "@nestjs/common";
import { CreateTaskUseCase } from "../use-case";
import { CreateTaskDto } from "../use-case/dto";
import { UserId } from "../../auth/controller/middleware";

@Controller("tasks")
export class TaskController {

    constructor(
        @Inject("createTask")
        private createTask: CreateTaskUseCase
    ) {}

    @Put()
    async onCreateTaskRequest(
        @UserId() userId: string,
        @Body() dto: CreateTaskDto
    ) {
        await this.createTask.execute(dto);
    }
}