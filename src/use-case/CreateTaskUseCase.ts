import { TaskModel, UnknownEmployeeIdDomainError } from "../model";
import { EmployeeRepository, TaskRepository } from "../repository/interface";
import { CreateTaskDto } from "./dto";

export class CreateTaskUseCase {
    constructor(
        private employees: EmployeeRepository,
        private tasks: TaskRepository
    ) {}

    async execute(dto: CreateTaskDto) {
        const author = await this.employees.findOne(dto.authorId);
        if ( !author ) throw new UnknownEmployeeIdDomainError(dto.authorId);

        const task = TaskModel.create({
            ...dto,
            author
        });
        await this.tasks.save(task);
    }
}