import { ExtraMinutesPrecisionDomainError, NegativeHoursDomainError } from "./error";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

export class HoursValueObject {

    static fromMs(ms: number) {
        return new HoursValueObject( ms / HOUR );
    }

    static create(quantity: number) {
        return new HoursValueObject(quantity);
    }

    constructor(
        readonly quantity: number
    ) {
        if ( quantity < 0 )
            throw new NegativeHoursDomainError(quantity);

        if ( quantity !== Math.floor(quantity * 2) / 2 )
            throw new ExtraMinutesPrecisionDomainError(quantity);
    }
}
