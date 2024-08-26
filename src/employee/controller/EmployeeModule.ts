import { Module } from "@nestjs/common";
import { CreateEmployeeUseCase } from "../use-case";
import { EmployeeController } from "./EmployeeController";
import { SsrEmployeeController } from "./SsrEmployeeController";


@Module({
    controllers: [
        EmployeeController,
        SsrEmployeeController
    ],
    providers: [
        {
            provide: "createEmployee",
            useFactory: () => EmployeeModule.createEmployee
        }
    ]
})
export class EmployeeModule {
    static createEmployee: CreateEmployeeUseCase;

}