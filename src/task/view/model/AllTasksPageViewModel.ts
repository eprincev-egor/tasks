import { PickProperties } from "../../../common/utils";
import { TaskViewModel } from "./TaskViewModel";
import { plainToInstance, Type } from "class-transformer";
import { makeObservable, observable } from "mobx";
import "reflect-metadata";

export class AllTasksPageViewModel {

    static fromJson(json: Record<string, any>) {
        return plainToInstance(AllTasksPageViewModel, json);
    }

    newTaskKey?: string;
    newTaskTitle?: string;

    @Type(() => TaskViewModel)
    public tasks!: TaskViewModel[];

    constructor(params: Partial<PickProperties<AllTasksPageViewModel>>) {
        Object.assign(this, {
            newTaskKey: "",
            newTaskTitle: "",
            tasks: [],
            ...params
        });
        makeObservable(this, {
            tasks: observable,
            newTaskKey: observable,
            newTaskTitle: observable
        });
    }

    setNewTaskKey(key: string) {
        this.newTaskKey = key;
    }

    setNewTaskTitle(key: string) {
        this.newTaskTitle = key;
    }

    addTask(task: TaskViewModel) {
        this.tasks.push(task);
    }
}