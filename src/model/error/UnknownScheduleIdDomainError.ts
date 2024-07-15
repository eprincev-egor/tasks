import { AbstractDomainError } from "./AbstractDomainError";
import { ScheduleModel } from "../ScheduleModel";

export class UnknownScheduleIdDomainError
    extends AbstractDomainError {

    code = "UNKNOWN_SCHEDULE_ITEM_ID";
    constructor(id: ScheduleModel["id"]) {
        super(`Not found schedule item with: ${id}`);
    }
}