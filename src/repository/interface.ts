import { DateValueObject } from "../model";
import { ScheduleModel } from "../model/ScheduleModel";

export interface ScheduleRepository {
    findOne(startMonthDate: DateValueObject): Promise<ScheduleModel | undefined>;
    save(model: ScheduleModel): Promise<void>;
}