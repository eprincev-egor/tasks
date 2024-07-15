import { DateValueObject } from "./DateValueObject";
import { EmployeeModel } from "./EmployeeModel";
import { PickProperties, uuid } from "./utils";

export type TaskParams = PickProperties<TaskModel>;
export type NewTaskParams = Omit<TaskParams, "id" | "creationDate">;

export class TaskModel {

    static create(params: NewTaskParams) {
        return new TaskModel({
            id: uuid(),
            creationDate: DateValueObject.now(),
            ...params
        });
    }

    readonly id!: string;
    readonly key!: string;
    readonly title!: string;
    readonly description!: string;
    readonly author!: EmployeeModel;
    readonly creationDate!: DateValueObject;
    constructor(params: TaskParams) {
        Object.assign(this, params);
    }
}