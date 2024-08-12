import { BaseFakeRepository } from "../../../common/repository/fake";
import { ScheduleRepository } from "../interface";
import { ScheduleModel } from "../../model";
import { DateValueObject } from "../../../common/model";

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