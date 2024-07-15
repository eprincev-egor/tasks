import { DateValueObject } from "../model";
import { EmployeeModel } from "../model/EmployeeModel";
import { ScheduleModel } from "../model/ScheduleModel";
import { TaskModel } from "../model/TaskModel";

export interface ScheduleRepository {
    findOne(scheduleId: ScheduleModel["id"]): Promise<ScheduleModel | undefined>;
    findOneWithDate(startMonthDate: DateValueObject): Promise<ScheduleModel | undefined>;
    save(model: ScheduleModel): Promise<void>;
}

export interface EmployeeRepository {
    findOne(id: string): Promise<EmployeeModel | undefined>;
    save(employee: EmployeeModel): Promise<void>;
}

export interface TaskRepository {
    findOne(id: string): Promise<TaskModel | undefined>;
}