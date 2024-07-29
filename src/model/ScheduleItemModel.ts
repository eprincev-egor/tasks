import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { dateIntervalTransformer, DateIntervalValueObject } from "./DateIntervalValueObject";
import { EmployeeModel } from "./EmployeeModel";
import { TaskModel } from "./TaskModel";
import { TooLateForNewTaskDomainError } from "./error";
import { PickProperties, uuid } from "./utils";
import { ScheduleModel } from "./ScheduleModel";

export interface ScheduleItemParams {
    task: TaskModel;
    employee: EmployeeModel;
    time: DateIntervalValueObject;
}

@Entity("schedule_items")
export class ScheduleItemModel {

    static create(params: ScheduleItemParams) {
        return new ScheduleItemModel({
            id: uuid(),
            time: params.time,
            employee: params.employee,
            task: params.task
        });
    }

    @PrimaryColumn()
    readonly id!: string;

    @Column("jsonb", {
        transformer: dateIntervalTransformer
    })
    readonly time!: DateIntervalValueObject;

    @ManyToOne(() => EmployeeModel, {
        nullable: false
    })
    readonly employee!: EmployeeModel;

    @ManyToOne(() => TaskModel, {
        nullable: false
    })
    readonly task!: TaskModel;

    @ManyToOne(() => ScheduleModel, (schedule) => schedule.items)
    public fkSchedule?: ScheduleModel;

    constructor(params: PickProperties<ScheduleItemModel>) {
        Object.assign(this, params);

        if ( this.time.isOneHourBeforeEndOfWorkDay() )
            throw new TooLateForNewTaskDomainError(this.time.startDate);
    }

    isIntersectTimeWith(item: ScheduleItemModel): boolean {
        return this.time.isIntersectWith(item.time);
    }
}
