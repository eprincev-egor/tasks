import { DateValueObject } from "./DateValueObject";
import { HoursValueObject } from "./HoursValueObject";

export class DateIntervalValueObject {

    static create(
        startDate: DateValueObject,
        duration: HoursValueObject
    ) {
        return new DateIntervalValueObject(
            startDate,
            startDate.plusHours(duration)
        );
    }

    private constructor(
        readonly startDate: DateValueObject,
        readonly endDate: DateValueObject
    ) {}

    toString() {
        return `${this.startDate} - ${this.endDate}`;
    }

    isIntersectWith(other: DateIntervalValueObject): boolean {
        const [leastInterval, greatestInterval] = sort(this, other);
        return leastInterval.endDate.greaterThan(greatestInterval.startDate);
    }
}

function sort(...intervals: DateIntervalValueObject[]) {
    return intervals.sort((a, b) =>
        a.startDate.lessThan(b.startDate) ? -1 : 1
    );
}
