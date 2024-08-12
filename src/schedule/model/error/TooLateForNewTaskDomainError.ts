import { AbstractDomainError } from "../../../common/model/error";
import { DateValueObject } from "../../../common/model";

export class TooLateForNewTaskDomainError
    extends AbstractDomainError {

    code = "TOO_LATE_FOR_NEW_TASK";
    constructor(time: DateValueObject) {
        super(`${time} is too late for assign new task`);
    }
}