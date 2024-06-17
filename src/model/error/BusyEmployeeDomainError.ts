import { AbstractDomainError } from "./AbstractDomainError";
import { EmployeeModel } from "../EmployeeModel";
import { DateIntervalValueObject } from "../DateIntervalValueObject";

export class BusyEmployeeDomainError
    extends AbstractDomainError {

    code = "EMPLOYEE_IS_BUSY";

    constructor(employee: EmployeeModel, time: DateIntervalValueObject) {
        super(`Employee ${employee.name} is busy on ${time.toString()}`);
    }
}