import { Module } from "@nestjs/common";
import { CreateEmployeeUseCase } from "../use-case";
import { EmployeeController } from "./EmployeeController";


@Module({
    controllers: [
        EmployeeController
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