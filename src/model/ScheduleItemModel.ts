import { EmployeeModel } from "./EmployeeModel";
import { HoursValueObject } from "./HoursValueObject";
import { TaskModel } from "./TaskModel";
import { PickProperties, uuid } from "./utils";

export class ScheduleItemModel {

    static create(task: TaskModel, employee: EmployeeModel) {
        return new ScheduleItemModel({
            id: uuid(),
            sort: 0,
            duration: new HoursValueObject(0),
            employee,
            task
        });
    }

    readonly id!: string;
    readonly sort!: number;
    readonly duration!: HoursValueObject;
    readonly employee!: EmployeeModel;
    readonly task!: TaskModel;
    constructor(params: PickProperties<ScheduleItemModel>) {
        Object.assign(this, params);
    }
}
