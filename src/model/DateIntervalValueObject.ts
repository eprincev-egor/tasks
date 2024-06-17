import { DateValueObject } from "./DateValueObject";
import { HoursValueObject } from "./HoursValueObject";

export class DateIntervalValueObject {
    constructor(
        readonly date: DateValueObject,
        readonly duration: HoursValueObject
    ) {}

    toString() {
        const start = this.date.toString();
        const end = this.date.plusHours(this.duration).toString();
        return `${start} - ${end}`;
    }
}