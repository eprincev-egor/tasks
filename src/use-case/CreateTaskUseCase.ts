import { NewTaskParams, TaskModel } from "../model";
import { TaskRepository } from "../repository/interface";

export type CreateTaskDto = NewTaskParams;

export class CreateTaskUseCase {
    constructor(
        private tasks: TaskRepository
    ) {}

    async execute(dto: CreateTaskDto) {
        const task = TaskModel.create(dto);
        await this.tasks.save(task);
    }
}