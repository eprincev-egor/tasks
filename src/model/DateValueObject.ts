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

    equals(someDate: DateValueObject): boolean {
        return +this.date === +someDate.date;
    }

    toString(){
        return this.date.toISOString();
    }
}
