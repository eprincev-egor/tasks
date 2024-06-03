import { DateValueObject } from "../model";
import { EmployeeModel } from "../model/EmployeeModel";
import { TaskModel } from "../model/TaskModel";
import { UnknownEmployeeIdDomainError } from "../model/error";
import { ScheduleRepository } from "../repository/interface";

export interface AssignTaskToScheduleDto {
    employeeId: EmployeeModel["id"];
    taskId: TaskModel["id"];
    date: DateValueObject;
}

export class AssignTaskToScheduleUseCase {

    constructor(
        private schedules: ScheduleRepository
    ) {}

    async execute(dto: AssignTaskToScheduleDto) {
        throw new UnknownEmployeeIdDomainError(dto.employeeId);
    }
}