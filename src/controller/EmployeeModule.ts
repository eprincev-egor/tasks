import { Module } from "@nestjs/common";
import { EmployeeController } from "./EmployeeController";
import { CreateEmployeeUseCase } from "../use-case";

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
