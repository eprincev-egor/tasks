import { ScheduleModel } from "../model";
import { DateValueObject } from "../../common/model";

export interface ScheduleRepository {
    findOne(scheduleId: ScheduleModel["id"]): Promise<ScheduleModel | undefined>;
    findOneWithDate(startMonthDate: DateValueObject): Promise<ScheduleModel | undefined>;
    save(model: ScheduleModel): Promise<void>;
}
