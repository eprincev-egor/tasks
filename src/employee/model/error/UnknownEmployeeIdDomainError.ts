import { AbstractDomainError } from "../../../common/model/error";
import { EmployeeModel } from "../EmployeeModel";

export class UnknownEmployeeIdDomainError
    extends AbstractDomainError {

    code = "UNKNOWN_EMPLOYEE_ID";
    constructor(id: EmployeeModel["id"]) {
        super(`Not found employee with: ${id}`);
    }
}