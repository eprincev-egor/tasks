import { TaskModel } from "../TaskModel";
import { AbstractDomainError } from "./AbstractDomainError";

export class UnknownTaskIdDomainError
    extends AbstractDomainError {

    code = "UNKNOWN_TASK_ID";
    constructor(id: TaskModel["id"]) {
        super(`Not found task with: ${id}`);
    }
}