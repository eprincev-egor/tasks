import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { EmployeeModel } from "../../employee/model";
import { PickProperties, uuid } from "../../common/utils";
import { dateTransformer, DateValueObject } from "../../common/model";

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
    readonly description?: string;

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