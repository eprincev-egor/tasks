import { BaseTypeormRepository } from "../../../common/repository/typeorm";
import { ScheduleRepository } from "../interface";
import { ScheduleModel } from "../../model";
import { DateValueObject } from "../../../common/model";

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