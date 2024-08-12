import { UnknownEmployeeIdDomainError } from "../../employee/model/error";
import { EmployeeRepository } from "../../employee/repository/interface";
import { TaskRepository } from "../repository/interface";
import { CreateTaskDto } from "./dto";

export class CreateTaskUseCase {
    constructor(
        private employees: EmployeeRepository,
        private tasks: TaskRepository
    ) {}

    async execute(dto: CreateTaskDto) {
        const author = await this.employees.findOne(dto.authorId);
        if ( !author ) throw new UnknownEmployeeIdDomainError(dto.authorId);

        const task = dto.createTask(author);
        await this.tasks.save(task);
    }
}