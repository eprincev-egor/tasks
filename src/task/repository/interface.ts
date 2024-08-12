import { TaskModel } from "../model";

export interface TaskRepository {
    findOneByKey(key: string): Promise<TaskModel | undefined>;
    findOne(id: string): Promise<TaskModel | undefined>;
    save(task: TaskModel): Promise<void>;
}