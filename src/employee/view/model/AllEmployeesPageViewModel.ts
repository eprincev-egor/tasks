import { plainToInstance, Type } from "class-transformer";
import { EmployeeViewModel } from "./EmployeeViewModel";
import { PickProperties } from "../../../common/utils";
import { makeObservable, observable } from "mobx";
import "reflect-metadata";

export class AllEmployeesPageViewModel {

    static fromJson(json: Record<string, any>) {
        return plainToInstance(AllEmployeesPageViewModel, json);
    }

    @Type(() => EmployeeViewModel)
    public employees!: EmployeeViewModel[];

    constructor(params: Partial<PickProperties<AllEmployeesPageViewModel>>) {
        Object.assign(this, {
            employees: [],
            ...params
        });

        makeObservable(this, {
            employees: observable
        });
    }
}