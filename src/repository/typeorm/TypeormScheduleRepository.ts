import { BaseTypeormRepository } from "./BaseTypeormRepository";
import { ScheduleRepository } from "../interface";
import { DateValueObject, ScheduleModel } from "../../model";

export class TypeormScheduleRepository
    extends BaseTypeormRepository<ScheduleModel>
    implements ScheduleRepository {

    async findOne(id: string): Promise<ScheduleModel | undefined> {
        return await this.findOneWhere({ id });
    }

    async findOneWithDate(startMonthDate: DateValueObject): Promise<ScheduleModel | undefined> {
        return await this.findOneWhere({
            startDate: startMonthDate.toMonthStart()
        });
    }
}