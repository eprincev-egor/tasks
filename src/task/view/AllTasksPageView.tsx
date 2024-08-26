import { AbstractPageView } from "../../common/view/page";
import { AllTasksPageViewModel, TaskViewModel } from "./model";
import { InputView } from "../../common/view/component/input";
import { AllTasksPageController } from "./controller";
import React from "react";
import { observer } from "mobx-react";

@observer
export class AllTasksPageView extends AbstractPageView<{
    model: AllTasksPageViewModel;
}> {
    private controller = new AllTasksPageController(this.model);
    protected title = "All tasks";
    protected jsBundleName = "main.allTasks";
    protected cssBundleName = "AllTasksPageView";

    renderContent() {
        return <div className="AllTasksPageView--tasks">
            <div className="AllTasksPageView--tasksHead">
                <div className="AllTasksPageView--taskColumn">Key</div>
                <div className="AllTasksPageView--taskColumn">Title</div>
            </div>
            {this.model.tasks.map(renderTask)}

            <div className="AllTasksPageView--tasksNewRow">
                <div className="AllTasksPageView--taskNewRowCell">
                    <InputView
                        placeholder="Enter new task key*"
                        value={this.model.newTaskKey}
                        onChange={(value) => this.controller.onChangeNewTaskKey(value)}
                        onKeyDown={(keyCode) => this.controller.onKeyUpDownTaskInput(keyCode)}
                    />
                </div>
                <div className="AllTasksPageView--taskNewRowCell">
                    <InputView
                        placeholder="Enter new task title*"
                        value={this.model.newTaskTitle}
                        onChange={(value) => this.controller.onChangeNewTaskTitle(value)}
                        onKeyDown={(keyCode) => this.controller.onKeyUpDownTaskInput(keyCode)}
                    />
                </div>
            </div>
        </div>;
    }
}

function renderTask(task: TaskViewModel) {
    return <div className="AllTasksPageView--taskRow" key={task.key}>
        <div className="AllTasksPageView--taskCell">{task.key}</div>
        <div className="AllTasksPageView--taskCell">{task.title}</div>
    </div>;
}