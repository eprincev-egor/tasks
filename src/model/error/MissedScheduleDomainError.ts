import {AbstractDomainError} from "./AbstractDomainError";
import {DateValueObject} from "../DateValueObject";

export class MissedScheduleDomainError
    extends AbstractDomainError {

    code = "MISSED_SCHEDULE";

    constructor(date: DateValueObject) {
        super(`Not found schedule for month: ${date.toString()}`);
    }
}