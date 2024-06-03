import { EmployeeModel } from "../EmployeeModel";
import { AbstractDomainError } from "./AbstractDomainError";

export class UnknownEmployeeIdDomainError
    extends AbstractDomainError {

    code = "UNKNOWN_EMPLOYEE_ID";
    constructor(id: EmployeeModel["id"]) {
        super(`Not found employee with: ${id}`);
    }
}