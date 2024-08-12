import { Body, Controller, Inject, Put } from "@nestjs/common";
import { CreateTaskUseCase } from "../use-case";
import { CreateTaskDto } from "../use-case/dto";

@Controller("tasks")
export class TaskController {

    constructor(
        @Inject("createTask")
        private createTask: CreateTaskUseCase
    ) {}

    @Put()
    async onCreateTaskRequest(
        @Body() dto: CreateTaskDto
    ) {
        await this.createTask.execute(dto);
    }
}