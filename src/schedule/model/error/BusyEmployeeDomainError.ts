import { AbstractDomainError } from "../../../common/model/error";
import { DateIntervalValueObject } from "../../../common/model";
import { EmployeeModel } from "../../../employee/model";

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