import { AbstractDomainError } from "../../../common/model/error";
import { ScheduleItemModel } from "../ScheduleItemModel";

export class UnknownScheduleItemIdDomainError
    extends AbstractDomainError {

    code = "UNKNOWN_SCHEDULE_ITEM_ID";
    constructor(id: ScheduleItemModel["id"]) {
        super(`Not found schedule item with: ${id}`);
    }
}