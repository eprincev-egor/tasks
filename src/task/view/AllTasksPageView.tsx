import { AbstractPageView } from "../../common/view/page";
import { AllTasksPageViewModel, TaskViewModel } from "./model";
import { AllTasksPageController } from "./controller";
import React from "react";
import { Grid, GridColumn } from "../../common/view/component/grid";
import { observer } from "mobx-react";

const columns: GridColumn<TaskViewModel>[] = [
    {field: "key", headerName: "Key", width: 90, editable: true},
    {field: "title", headerName: "Title", editable: true, valueSetter: event => {
        const task = event.data;
        task.setTitle(event.newValue as string);
        return true;
    }}
];

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
            <Grid
                columns={columns}
                rows={this.model.tasks}
            />
        </div>;
    }
}
