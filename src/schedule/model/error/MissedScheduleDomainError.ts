import {AbstractDomainError} from "../../../common/model/error";
import { DateValueObject } from "../../../common/model";

export class MissedScheduleDomainError
    extends AbstractDomainError {

    code = "MISSED_SCHEDULE";

    constructor(date: DateValueObject) {
        super(`Not found schedule for month: ${date.toString()}`);
    }
}