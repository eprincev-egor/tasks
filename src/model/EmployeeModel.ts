import {PickProperties, uuid} from "./utils";

export class EmployeeModel {

    static create(name: string) {
        return new EmployeeModel({
            id: uuid(),
            name
        });
    }

    readonly id!: string;
    readonly name!: string;
    constructor(params: PickProperties<EmployeeModel>) {
        Object.assign(this, params);
    }

    equals(other: EmployeeModel) {
        return this.id === other.id;
    }
}