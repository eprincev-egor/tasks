import { DateIntervalValueObject } from "./DateIntervalValueObject";
import { DateValueObject, WORK_DAY_DURATION } from "./DateValueObject";
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

    assignTask({employee, task, time}: ScheduleItemParams) {
        const firstDayDuration = Math.min(
            time.duration.quantity,
            time.startDate.getHoursToEndOfWorkDay().quantity
        );
        const firstDayInterval = DateIntervalValueObject.create(
            time.startDate,
            firstDayDuration
        );
        this.addItem({
            employee, task,
            time: firstDayInterval
        });

        let remainder = time.duration.quantity - firstDayInterval.duration.quantity;
        let dayStart = firstDayInterval.endDate.plusDay().toWorkDayStart();
        while ( remainder > 0 ) {
            const nextDuration = Math.min(remainder, WORK_DAY_DURATION);
            this.addItem({
                employee, task,
                time: DateIntervalValueObject.create( dayStart, nextDuration )
            });

            remainder -= WORK_DAY_DURATION;
            dayStart = dayStart.plusDay();
        }
    }

    private addItem(newItemParams: ScheduleItemParams) {
        const newItem = ScheduleItemModel.create(newItemParams);

        for (const item of this.items) {
            const timeIsBusy = (
                item.isIntersectTimeWith(newItem) &&
                item.employee.equals(newItem.employee)
            );
            if ( timeIsBusy )
                throw new BusyEmployeeDomainError({
                    employee: newItem.employee,
                    requestedTime: newItem.time,
                    busyTime: item.time
                });
        }

        this.items.push(newItem);
    }
}