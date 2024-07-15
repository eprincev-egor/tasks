import {PickProperties, uuid} from "./utils";

export class TaskModel {
    static create() {
        return new TaskModel({
            id: uuid()
        });
    }

    readonly id!: string;
    constructor(params: PickProperties<TaskModel>) {
        Object.assign(this, params);
    }
}