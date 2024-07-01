import { EmployeeModel } from "../model/EmployeeModel";
import { TaskModel } from "../model/TaskModel";
import { ScheduleRepository } from "../repository/interface";
import {FakeTaskRepository} from "../repository/fake/FakeTaskRepository";
import {FakeEmployeeRepository} from "../repository/fake/FakeEmployeeRepository";
import {UnknownEmployeeIdDomainError, UnknownTaskIdDomainError} from "../model/error";
import { MissedScheduleDomainError } from "../model/error/MissedScheduleDomainError";
import { DateIntervalValueObject } from "../model/DateIntervalValueObject";

export interface AssignTaskToScheduleDto {
    employeeId: EmployeeModel["id"];
    taskId: TaskModel["id"];
    time: DateIntervalValueObject;
}

export class AssignTaskToScheduleUseCase {

    constructor(
        private schedules: ScheduleRepository,
        private tasks: FakeTaskRepository,
        private employers: FakeEmployeeRepository
    ) {}

    async execute(dto: AssignTaskToScheduleDto) {
        const task = await this.tasks.findOne(dto.taskId);
        const employee = await this.employers.findOne(dto.employeeId);
        const schedule = await this.schedules.findOneWithDate(dto.time.startDate);

        if (!task) throw new UnknownTaskIdDomainError(dto.taskId);
        if (!employee) throw new UnknownEmployeeIdDomainError(dto.employeeId);
        if (!schedule) throw new MissedScheduleDomainError(dto.time.startDate);

        schedule.assignTask({
            task, employee,
            time: dto.time
        });
        await this.schedules.save(schedule);
    }
}