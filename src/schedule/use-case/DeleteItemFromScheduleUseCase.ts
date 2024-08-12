import { ScheduleRepository } from "../repository/interface";
import { ScheduleItemModel, ScheduleModel } from "../model";
import { UnknownScheduleIdDomainError } from "../model/error";

export interface DeleteItemFromScheduleDto {
    scheduleId: ScheduleModel["id"];
    itemId: ScheduleItemModel["id"];
}

export class DeleteItemFromScheduleUseCase {

    constructor(
        private schedules: ScheduleRepository
    ) {}

    async execute(dto: DeleteItemFromScheduleDto) {
        const schedule = await this.schedules.findOne(dto.scheduleId);
        if ( !schedule) throw new UnknownScheduleIdDomainError(dto.scheduleId);

        schedule.deleteItem(dto.itemId);
        await this.schedules.save(schedule);
    }
}