import { Controller, Get } from "@nestjs/common";
import { AllEmployeesPageView } from "../view";
import { AllEmployeesPageViewModel } from "../view/model";
import { renderToString } from "react-dom/server";

@Controller()
export class SsrEmployeeController {

    @Get("employees")
    onGetAllTasksPageRequest() {
        const pageView = new AllEmployeesPageView({
            model: new AllEmployeesPageViewModel()
        });
        const pageHtml = renderToString(pageView.render());
        return pageHtml;
    }

}