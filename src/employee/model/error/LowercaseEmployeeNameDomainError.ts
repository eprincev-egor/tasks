import { AbstractDomainError } from "../../../common/model/error";

export class LowercaseEmployeeNameDomainError
    extends AbstractDomainError {

    code = "LOWERCASE_EMPLOYEE_NAME";

    constructor(invalidName: string) {
        super(`Each word in name should starts with the uppercase, got invalid name: ${invalidName}`);
    }
}