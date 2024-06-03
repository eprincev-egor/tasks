import { BaseFakeRepository } from "./BaseFakeRepository";
import { TaskRepository } from "../interface";
import { TaskModel } from "../../model";

export class FakeTaskRepository
    extends BaseFakeRepository<TaskModel>
    implements TaskRepository {

    async findOne(id: string): Promise<TaskModel | undefined> {
        return this.getBy((model) => model.id === id);
    }
}