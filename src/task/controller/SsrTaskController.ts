import { Controller, Get } from "@nestjs/common";
import { AllTasksPageView } from "../view";
import { renderToString } from "react-dom/server";
import { AllTasksPageViewModel, TaskViewModel } from "../view/model";

@Controller()
export class SsrTaskController {

    @Get("tasks")
    onGetAllTasksPageRequest() {
        const pageView = new AllTasksPageView({
            model: new AllTasksPageViewModel({
                tasks: [
                    new TaskViewModel({
                        key: "LW-1001",
                        title: "Some task"
                    }),
                    new TaskViewModel({
                        key: "LW-1002",
                        title: "Another task"
                    })
                ]
            })
        });
        const pageHtml = renderToString(pageView.render());
        return pageHtml;
    }

}