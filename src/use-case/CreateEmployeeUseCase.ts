import { EmployeeModel, EmployeeParams } from "../model";
import { EmployeeRepository } from "../repository/interface";

export type CreateEmployeeDto = Omit<EmployeeParams, "id">;

export class CreateEmployeeUseCase {
    constructor(
        private employees: EmployeeRepository
    ) {}

    async execute(dto: CreateEmployeeDto) {
        const employee = EmployeeModel.create(dto.name);
        await this.employees.save(employee);
    }
}