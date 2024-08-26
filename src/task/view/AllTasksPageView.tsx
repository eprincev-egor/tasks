import React from "react";
import { AllTasksPageViewModel, TaskViewModel } from "./model";
import { InputView } from "./component/input";
import { AllTasksPageController } from "./controller";
import { observer } from "mobx-react";

@observer
export class AllTasksPageView extends React.Component<{
    model: AllTasksPageViewModel;
}> {
    private model = this.props.model;
    private controller = new AllTasksPageController(this.model);

    render() {
        return <html lang="en">
            <head>
                <meta charSet="utf8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>All tasks</title>
                <link rel="stylesheet" href="/AllTasksPageView.css" />
            </head>
            <body>
                <div className="AllTasksPageView">
                    <h1 className="AllTasksPageView--title">All tasks</h1>
                    <div className="AllTasksPageView--tasks">
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
                    </div>
                </div>

                <script dangerouslySetInnerHTML={{
                    __html: "window.rootModel = " + JSON.stringify(this.model)
                        .replaceAll(/<\s*\/\s*script\s*>/gi, "<\\/script>")
                }}></script>
                <script src="/main.allTasks.js"></script>
            </body>
        </html>;
    }
}

function renderTask(task: TaskViewModel) {
    return <div className="AllTasksPageView--taskRow" key={task.key}>
        <div className="AllTasksPageView--taskCell">{task.key}</div>
        <div className="AllTasksPageView--taskCell">{task.title}</div>
    </div>;
}