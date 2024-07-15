import { AbstractDomainError } from "./AbstractDomainError";
import { EmployeeModel } from "../EmployeeModel";
import { DateIntervalValueObject } from "../DateIntervalValueObject";

export class BusyEmployeeDomainError
    extends AbstractDomainError {

    code = "EMPLOYEE_IS_BUSY";

    constructor({employee, requestedTime, busyTime}: {
        employee: EmployeeModel;
        requestedTime: DateIntervalValueObject;
        busyTime: DateIntervalValueObject;
    }) {
        super(`Employee ${employee.name} is busy on ${busyTime.toString()}, requested ${requestedTime.toString()}`);
    }
}