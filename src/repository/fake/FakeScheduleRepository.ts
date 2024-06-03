import { ScheduleRepository } from "../interface";
import { BaseFakeRepository } from "./BaseFakeRepository";
import { DateValueObject, ScheduleModel } from "../../model";

export class FakeScheduleRepository
    extends BaseFakeRepository<ScheduleModel>
    implements ScheduleRepository {

    async findOne(startMonthDate: DateValueObject): Promise<ScheduleModel | undefined> {
        return this.getBy((model) =>
            model.startDate.equals(startMonthDate)
        );
    }
}