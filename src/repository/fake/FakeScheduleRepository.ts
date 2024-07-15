import { ScheduleRepository } from "../interface";
import { BaseFakeRepository } from "./BaseFakeRepository";
import { DateValueObject, ScheduleModel } from "../../model";

export class FakeScheduleRepository
    extends BaseFakeRepository<ScheduleModel>
    implements ScheduleRepository {

    async findOne(scheduleId: ScheduleModel["id"]): Promise<ScheduleModel | undefined> {
        return this.getBy((model) => model.id === scheduleId);
    }

    async findOneWithDate(startMonthDate: DateValueObject): Promise<ScheduleModel | undefined> {
        return this.getBy((model) =>
            model.startDate.equals(startMonthDate.toMonthStart())
        );
    }
}