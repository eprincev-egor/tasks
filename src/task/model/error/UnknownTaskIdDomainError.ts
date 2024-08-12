import { AbstractDomainError } from "../../../common/model/error";
import { TaskModel } from "../TaskModel";

export class UnknownTaskIdDomainError
    extends AbstractDomainError {

    code = "UNKNOWN_TASK_ID";
    constructor(id: TaskModel["id"]) {
        super(`Not found task with: ${id}`);
    }
}