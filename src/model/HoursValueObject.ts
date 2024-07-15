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
            throw new Error(`Hours cannot be negative, got invalid hours: ${quantity}`);

        if ( quantity !== Math.floor(quantity * 2) / 2 )
            throw new Error(`Hours must be a multiple of 0.5, got invalid hours: ${quantity}`);
    }
}
