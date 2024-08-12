import { EmployeeModel } from "../model";
import { EmployeeRepository } from "../repository/interface";
import { CreateEmployeeDto } from "./dto";

export class CreateEmployeeUseCase {
    constructor(
        private employees: EmployeeRepository
    ) {}

    async execute(dto: CreateEmployeeDto) {
        const employee = EmployeeModel.create(dto.name);
        await this.employees.save(employee);
    }
}