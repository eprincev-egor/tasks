import { DateIntervalValueObject } from "./DateIntervalValueObject";
import { EmployeeModel } from "./EmployeeModel";
import { TaskModel } from "./TaskModel";
import { PickProperties, uuid } from "./utils";

export interface ScheduleItemParams {
    task: TaskModel;
    employee: EmployeeModel;
    time: DateIntervalValueObject;
}

export class ScheduleItemModel {

    static create(params: ScheduleItemParams) {
        return new ScheduleItemModel({
            id: uuid(),
            time: params.time,
            employee: params.employee,
            task: params.task
        });
    }

    readonly id!: string;
    readonly time!: DateIntervalValueObject;
    readonly employee!: EmployeeModel;
    readonly task!: TaskModel;
    constructor(params: PickProperties<ScheduleItemModel>) {
        Object.assign(this, params);
    }

    isIntersectTimeWith(item: ScheduleItemModel): boolean {
        return this.time.isIntersectWith(item.time);
    }
}
