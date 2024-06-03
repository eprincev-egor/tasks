export class HoursValueObject {
    constructor(
        readonly quantity: number
    ) {
        if ( quantity < 0 )
            throw new Error(`Hours cannot be negative, got invalid hours: ${quantity}`);

        if ( quantity !== Math.floor(quantity * 2) / 2 )
            throw new Error(`Hours must be a multiple of 0.5, got invalid hours: ${quantity}`);
    }
}
