import { AllTasksPageViewModel, TaskViewModel } from "../model";

export class AllTasksPageController {

    constructor(
        private model: AllTasksPageViewModel
    ) {}

    onChangeNewTaskKey(key: string) {
        this.model.setNewTaskKey(key);
    }

    onChangeNewTaskTitle(title: string) {
        this.model.setNewTaskTitle(title);
    }

    onKeyUpDownTaskInput(keyCode: string) {
        if ( keyCode === "Enter" || keyCode === "NumpadEnter" ) {
            this.onEnterNewRow();
        }
    }

    onEnterNewRow() {
        if ( !this.model.newTaskKey || !this.model.newTaskTitle) return;

        const task = new TaskViewModel({
            key: this.model.newTaskKey,
            title: this.model.newTaskTitle
        });
        this.model.addTask(task);
        this.model.setNewTaskKey("");
        this.model.setNewTaskTitle("");
    }
}