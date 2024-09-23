import { AbstractDomainError } from "../../../common/model/error";
import { EmployeeModel } from "../EmployeeModel";

export class RequiredNameInChangesDomainError
    extends AbstractDomainError {

    code = "REQUIRED_NAME_IN_CHANGES";
    constructor(changes: Partial<EmployeeModel>) {
        super(`invalid changes, expected new name:\n${JSON.stringify(changes, null, 4)}`);
    }
}