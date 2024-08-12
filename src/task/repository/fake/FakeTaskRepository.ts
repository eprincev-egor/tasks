import { BaseFakeRepository } from "../../../common/repository/fake";
import { TaskRepository } from "../interface";
import { TaskModel } from "../../model";

export class FakeTaskRepository
    extends BaseFakeRepository<TaskModel>
    implements TaskRepository {

    async findOne(id: string): Promise<TaskModel | undefined> {
        return this.getBy((model) => model.id === id);
    }

    async findOneByKey(key: string): Promise<TaskModel | undefined> {
        return this.getBy((model) => model.key === key);
    }
}