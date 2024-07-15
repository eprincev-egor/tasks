import { EmployeeModel, TaskModel, DateIntervalValueObject } from "../model";
import { UnknownEmployeeIdDomainError, UnknownTaskIdDomainError, MissedScheduleDomainError } from "../model/error";
import { EmployeeRepository, ScheduleRepository, TaskRepository } from "../repository/interface";

export interface AssignTaskToScheduleDto {
    employeeId: EmployeeModel["id"];
    taskId: TaskModel["id"];
    time: DateIntervalValueObject;
}

export class AssignTaskToScheduleUseCase {

    constructor(
        private schedules: ScheduleRepository,
        private tasks: TaskRepository,
        private employers: EmployeeRepository
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