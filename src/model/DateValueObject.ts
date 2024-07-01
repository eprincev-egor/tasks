import { HoursValueObject } from "./HoursValueObject";

export const WORK_DAY_DURATION = 9;

export class DateValueObject {

    static now() {
        const now = new Date();
        return new DateValueObject(now);
    }

    constructor(
        private readonly date: Date
    ) {}

    toYearStart(): DateValueObject {
        const yearStart = new Date(+this.date);
        yearStart.setMonth(0);
        yearStart.setDate(1);
        yearStart.setHours(0);
        yearStart.setMinutes(0);
        yearStart.setSeconds(0);
        yearStart.setMilliseconds(0);
        return new DateValueObject(yearStart);
    }

    toWorkDayEnd(): DateValueObject {
        return this.toWorkDayStart().plusHours(WORK_DAY_DURATION);
    }

    toWorkDayStart(): DateValueObject {
        const dayStartInMoscow = new Date(+this.date);

        // TODO: test for time zone
        const myTimeZone = new Date().getTimezoneOffset();
        const mscTimeZone = -180;
        const delta = (myTimeZone - mscTimeZone) / 60;
        dayStartInMoscow.setHours(10 - delta);

        dayStartInMoscow.setMinutes(0);
        dayStartInMoscow.setSeconds(0);
        dayStartInMoscow.setMilliseconds(0);
        return new DateValueObject(dayStartInMoscow);
    }

    toMonthStart(): DateValueObject {
        const monthStart = new Date(+this.date);
        monthStart.setDate(1);
        monthStart.setHours(0);
        monthStart.setMinutes(0);
        monthStart.setSeconds(0);
        monthStart.setMilliseconds(0);
        return new DateValueObject(monthStart);
    }

    toMonthEnd(): DateValueObject {
        const monthEnd = new Date(+this.date);

        monthEnd.setMonth(this.date.getMonth() + 1);
        monthEnd.setDate(0);

        monthEnd.setHours(23);
        monthEnd.setMinutes(59);
        monthEnd.setSeconds(59);
        monthEnd.setMilliseconds(999);
        return new DateValueObject(monthEnd);
    }

    plusMonth() {
        const nextMonth = new Date(+this.date);
        nextMonth.setMonth(this.date.getMonth() + 1);
        return new DateValueObject(nextMonth);
    }

    plusHours(rawHours: HoursValueObject | number) {
        const hours = HoursValueObject.create(rawHours);
        const nextDate = new Date(+this.date);
        nextDate.setHours(this.date.getHours() + hours.quantity);
        return new DateValueObject(nextDate);
    }

    minusHours(rawHours: HoursValueObject | number) {
        const hours = HoursValueObject.create(rawHours);
        const nextDate = new Date(+this.date);
        nextDate.setHours(this.date.getHours() - hours.quantity);
        return new DateValueObject(nextDate);
    }

    equals(someDate: DateValueObject): boolean {
        return +this.date === +someDate.date;
    }

    lessThan(other: DateValueObject) {
        return this.date < other.date;
    }

    greaterThan(other: DateValueObject) {
        return this.date > other.date;
    }

    isOneHourBeforeEndOfWorkDay() {
        const oneHourBeforeEndOfDay = this.toWorkDayEnd().minusHours(1);
        return this.date >= oneHourBeforeEndOfDay.date;
    }

    toString() {
        return this.date.toISOString();
    }
}
