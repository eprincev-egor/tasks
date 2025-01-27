import { DateValueObject } from "./DateValueObject";

export const dateIntervalTransformer = {
    to: (value?: DateIntervalValueObject) => value ? {
        startDate: value.startDate.toString(),
        duration: value.duration.quantity,
        endDate: value.endDate.toString()
    } : undefined,
    from: (value?: {
        startDate: string;
        duration: number;
    }) => value ? DateIntervalValueObject.create(
        DateValueObject.fromIso( value.startDate ),
        value.duration
    ) : undefined
};

export class DateIntervalValueObject {

    static create(
        startDate: DateValueObject,
        duration: number
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

    get duration() {
        return this.endDate.minus(this.startDate);
    }

    toString() {
        return `${this.startDate} - ${this.endDate}`;
    }

    isOneHourBeforeEndOfWorkDay() {
        return this.startDate.isOneHourBeforeEndOfWorkDay();
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
