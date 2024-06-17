import { DateValueObject } from "./DateValueObject";
import { EmployeeModel } from "./EmployeeModel";
import { ScheduleItemModel } from "./ScheduleItemModel";
import { TaskModel } from "./TaskModel";
import { PickProperties, uuid } from "./utils";

export class ScheduleModel {

    static createForMonth(startMonthDate: DateValueObject) {
        return new ScheduleModel({
            id: uuid(),
            startDate: startMonthDate.toMonthStart(),
            finishDate: startMonthDate.toMonthEnd(),
            items: []
        });
    }

    readonly id!: string;
    readonly startDate!: DateValueObject;
    readonly finishDate!: DateValueObject;
    readonly items!: ScheduleItemModel[];
    constructor(params: PickProperties<ScheduleModel>) {
        Object.assign(this, params);
    }

    assignTask(task: TaskModel, employee: EmployeeModel) {
        const item = ScheduleItemModel.create(task, employee);
        this.items.push(item);
    }
}