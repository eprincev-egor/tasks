import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { DateIntervalValueObject, dateTransformer, DateValueObject, WORK_DAY_DURATION } from "../../common/model";
import { ScheduleItemModel, ScheduleItemParams } from "./ScheduleItemModel";
import { BusyEmployeeDomainError, UnknownScheduleItemIdDomainError } from "./error";
import { PickProperties, uuid } from "../../common/utils";

@Entity("schedules")
export class ScheduleModel {

    static createForMonth(startMonthDate: DateValueObject) {
        return new ScheduleModel({
            id: uuid(),
            startDate: startMonthDate.toMonthStart(),
            finishDate: startMonthDate.toMonthEnd(),
            items: []
        });
    }

    @PrimaryColumn()
    readonly id!: string;

    @Column("timestamptz", {
        nullable: false,
        transformer: dateTransformer
    })
    readonly startDate!: DateValueObject;

    @Column("timestamptz", {
        nullable: false,
        transformer: dateTransformer
    })
    readonly finishDate!: DateValueObject;

    @OneToMany(() => ScheduleItemModel, (item) => item.fkSchedule, {
        eager: true,
        nullable: false,
        cascade: ["insert", "update", "recover", "soft-remove", "remove"]
    })
    public items!: ScheduleItemModel[];

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

    deleteItem(itemId: ScheduleItemModel["id"]) {
        const item = this.items.find((item) => item.id == itemId);
        if ( !item ) throw new UnknownScheduleItemIdDomainError(itemId);

        this.items = this.items.filter((item) => item.id !== itemId);
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