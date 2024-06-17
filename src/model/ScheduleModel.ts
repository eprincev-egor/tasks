import { DateValueObject } from "./DateValueObject";
import { ScheduleItemModel, ScheduleItemParams } from "./ScheduleItemModel";
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
        const item = ScheduleItemModel.create(itemParams);
        this.items.push(item);
    }
}