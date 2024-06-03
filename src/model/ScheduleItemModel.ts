import { EmployeeModel } from "./EmployeeModel";
import { HoursValueObject } from "./HoursValueObject";
import { TaskModel } from "./TaskModel";

export class ScheduleItemModel {
    constructor(
        readonly id: string,
        readonly sort: number,
        readonly duration: HoursValueObject,
        readonly employee: EmployeeModel,
        readonly task: TaskModel
    ) {}
}