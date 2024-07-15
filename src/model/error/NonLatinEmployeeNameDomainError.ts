import {AbstractDomainError} from "./AbstractDomainError";

export class NonLatinEmployeeNameDomainError
    extends AbstractDomainError {

    code = "NON_LATIN_EMPLOYEE_NAME";

    constructor(invalidName: string) {
        super(`The name of the employee must be in Latin, got invalid name: ${invalidName}`);
    }
}