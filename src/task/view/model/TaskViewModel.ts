import { PickProperties } from "../../../common/utils";
import { makeObservable, observable } from "mobx";

export class TaskViewModel {

    id!: string;
    key!: string;
    title!: string;

    constructor(params: Partial<PickProperties<TaskViewModel>>) {
        Object.assign(this, {
            key: "",
            title: "",
            ...params
        });
        makeObservable(this, {
            key: observable,
            title: observable
        });
    }

    setTitle(newTitle: string) {
        this.title = newTitle;
    }
}