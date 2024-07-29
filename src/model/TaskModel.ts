import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { dateTransformer, DateValueObject } from "./DateValueObject";
import { EmployeeModel } from "./EmployeeModel";
import { PickProperties, uuid } from "./utils";

export type TaskParams = PickProperties<TaskModel>;
export type NewTaskParams = Omit<TaskParams, "id" | "creationDate">;

@Entity("tasks")
export class TaskModel {

    static create(params: NewTaskParams) {
        return new TaskModel({
            id: uuid(),
            creationDate: DateValueObject.now(),
            ...params
        });
    }

    @PrimaryColumn()
    readonly id!: string;

    @Column({ unique: true, nullable: false })
    readonly key!: string;

    @Column({ nullable: false })
    readonly title!: string;

    @Column({ nullable: true })
    readonly description!: string;

    @ManyToOne(() => EmployeeModel, {
        eager: true
    })
    readonly author!: EmployeeModel;

    @Column("timestamptz", {
        nullable: false,
        transformer: dateTransformer
    })
    readonly creationDate!: DateValueObject;

    constructor(params: TaskParams) {
        Object.assign(this, params);
    }
}