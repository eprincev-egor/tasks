import {PickProperties, uuid} from "./utils";

export class EmployeeModel {
    static create(){
        return new EmployeeModel({
            id: uuid(),
        })
    }

    readonly id!: string;
    constructor(params: PickProperties<EmployeeModel>) {
        Object.assign(this, params);
    }
}