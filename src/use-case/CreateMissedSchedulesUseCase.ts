import { DateValueObject, ScheduleModel } from "../model";
import { ScheduleRepository } from "../repository/interface";

export class CreateMissedSchedulesUseCase {

    constructor(
        private schedules: ScheduleRepository
    ) {}

    async execute(now: DateValueObject) {
        let month = now;
        for (let i = 0; i < 12; i++) {
            await this.createIfNotExistsFor(month);
            month = month.plusMonth();
        }
    }

    private async createIfNotExistsFor(month: DateValueObject) {
        const existentSchedule = await this.schedules.findOneWithDate(month.toMonthStart());
        if ( existentSchedule ) return;

        const schedule = ScheduleModel.createForMonth(month);
        await this.schedules.save(schedule);
    }
}