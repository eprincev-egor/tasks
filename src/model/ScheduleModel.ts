import { DateValueObject } from "./DateValueObject";
import { ScheduleItemModel, ScheduleItemParams } from "./ScheduleItemModel";
import { BusyEmployeeDomainError } from "./error";
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

    assignTask(itemParams: ScheduleItemParams) {
        const newItem = ScheduleItemModel.create(itemParams);

        const timeIsBusy = this.items.some((item) =>
            item.isIntersectTimeWith(newItem) &&
            !item.employee.equals(newItem.employee)
        );
        if ( timeIsBusy )
            throw new BusyEmployeeDomainError(newItem.employee, newItem.time);

        this.items.push(newItem);
    }
}