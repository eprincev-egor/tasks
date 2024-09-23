import { Module } from "@nestjs/common";
import { CreateEmployeeUseCase, UpdateEmployeeUseCase } from "../use-case";
import { EmployeeController } from "./EmployeeController";
import { SsrEmployeeController } from "./SsrEmployeeController";
import { EmployeeRepository } from "../repository/interface";


@Module({
    controllers: [
        EmployeeController,
        SsrEmployeeController
    ],
    providers: [
        {
            provide: "employees",
            useFactory: () => EmployeeModule.employees
        },
        {
            provide: "createEmployee",
            useFactory: () => EmployeeModule.createEmployee
        },
        {
            provide: "updateEmployee",
            useFactory: () => EmployeeModule.updateEmployee
        }
    ]
})
export class EmployeeModule {
    static employees: EmployeeRepository;
    static createEmployee: CreateEmployeeUseCase;
    static updateEmployee: UpdateEmployeeUseCase;

}