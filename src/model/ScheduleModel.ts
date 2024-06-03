import { DateValueObject } from "./DateValueObject";
import { PickProperties, uuid } from "./utils";

export class ScheduleModel {

    static createForMonth(startMonthDate: DateValueObject) {
        return new ScheduleModel({
            id: uuid(),
            startDate: startMonthDate.toMonthStart(),
            finishDate: startMonthDate.toMonthEnd()
        });
    }

    readonly id!: string;
    readonly startDate!: DateValueObject;
    readonly finishDate!: DateValueObject;
    constructor(params: PickProperties<ScheduleModel>) {
        Object.assign(this, params);
    }
}