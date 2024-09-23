import { Body, Controller, Inject, Param, Patch, Put } from "@nestjs/common";
import { CreateEmployeeUseCase, UpdateEmployeeUseCase } from "../use-case";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../use-case/dto";
import { EmployeeModel } from "../model";

@Controller("employees")
export class EmployeeController {

    constructor(
        @Inject("createEmployee")
        private createEmployee: CreateEmployeeUseCase,

        @Inject("updateEmployee")
        private updateEmployee: UpdateEmployeeUseCase
    ) {}

    @Put()
    async onCreateEmployeeRequest(
        @Body() dto: CreateEmployeeDto
    ) {
        await this.createEmployee.execute(dto);
    }

    @Patch(":id")
    async onUpdateEmployeeRequest(
        @Param("id") id: string,
        @Body() changes: Partial<EmployeeModel>
    ) {
        const dto = new UpdateEmployeeDto({
            id,
            changes
        });
        await this.updateEmployee.execute(dto);
    }
}