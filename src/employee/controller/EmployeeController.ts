import { Body, Controller, Inject, Put } from "@nestjs/common";
import { CreateEmployeeUseCase } from "../use-case";
import { CreateEmployeeDto } from "../use-case/dto";

@Controller("employees")
export class EmployeeController {

    constructor(
        @Inject("createEmployee")
        private createEmployee: CreateEmployeeUseCase
    ) {}

    @Put()
    async onCreateEmployeeRequest(
        @Body() dto: CreateEmployeeDto
    ) {
        await this.createEmployee.execute(dto);
    }

}