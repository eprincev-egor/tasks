import { BaseTypeormRepository } from "./BaseTypeormRepository";
import { TaskRepository } from "../interface";
import { TaskModel } from "../../model";

export class TypeormTaskRepository
    extends BaseTypeormRepository<TaskModel>
    implements TaskRepository {

    async findOne(id: string): Promise<TaskModel | undefined> {
        return await this.findOneWhere({ id });
    }

    async findOneByKey(key: string): Promise<TaskModel | undefined> {
        return await this.findOneWhere({ key });
    }
}
