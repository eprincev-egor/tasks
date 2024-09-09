import { PickProperties } from "../../../common/utils";
import { makeObservable, observable } from "mobx";

export class EmployeeViewModel {
    id!: string;
    name!: string;

    constructor(params: Partial<PickProperties<EmployeeViewModel>>) {
        Object.assign(this, {
            name: "",
            ...params
        });

        makeObservable(this, {
            name: observable
        });
    }

    setName(newName: string) {
        this.name = newName;
    }
}