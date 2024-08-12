import { AbstractDomainError } from "./AbstractDomainError";

export class ExtraMinutesPrecisionDomainError
    extends AbstractDomainError {

    code = "EXTRA_MINUTES_PRECISION";

    constructor(invalidHours: number) {
        super(`Hours must be a multiple of 0.5, got invalid hours: ${invalidHours}`);
    }
}