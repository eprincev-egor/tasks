import {AbstractDomainError} from "./AbstractDomainError";

export class NegativeHoursDomainError
    extends AbstractDomainError {

    code = "NEGATIVE_HOURS";

    constructor(invalidHours: number) {
        super(`Hours cannot be negative, got invalid hours: ${invalidHours}`);
    }
}