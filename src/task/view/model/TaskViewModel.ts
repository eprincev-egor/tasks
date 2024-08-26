import { PickProperties } from "../../../common/utils";
import { makeObservable, observable } from "mobx";

export class TaskViewModel {

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
}