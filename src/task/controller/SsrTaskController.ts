import { Controller, Get } from "@nestjs/common";
import { AllTasksPageView } from "../view";
import { renderToString } from "react-dom/server";

@Controller()
export class SsrTaskController {

    @Get("tasks")
    async onGetAllTasksPageRequest() {
        const pageView = new AllTasksPageView({});
        const pageHtml = renderToString(pageView.render());
        return pageHtml;
    }

}