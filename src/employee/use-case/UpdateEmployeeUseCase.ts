import { UnknownEmployeeIdDomainError } from "../model/error";
import { EmployeeRepository } from "../repository/interface";
import { UpdateEmployeeDto } from "./dto";

export class UpdateEmployeeUseCase {
    constructor(
        private employees: EmployeeRepository
    ) {}

    async execute(dto: UpdateEmployeeDto) {
        dto.validate();

        const employee = await this.employees.findOne(dto.id);
        if ( !employee ) throw new UnknownEmployeeIdDomainError(dto.id);

        employee.setName(dto.changes.name!);
        await this.employees.save(employee);
    }
}