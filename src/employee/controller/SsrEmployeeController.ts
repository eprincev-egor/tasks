import { Controller, Get } from "@nestjs/common";
import { AllEmployeesPageView } from "../view";
import { AllEmployeesPageViewModel } from "../view/model";
import { renderToString } from "react-dom/server";
import { EmployeeViewModel } from "../view/model/EmployeeViewModel";

@Controller()
export class SsrEmployeeController {

    @Get("employees")
    onGetAllTasksPageRequest() {
        const pageView = new AllEmployeesPageView({
            model: new AllEmployeesPageViewModel({
                employees: [
                    new EmployeeViewModel({
                        id: "1",
                        name: "Dan"
                    }),
                    new EmployeeViewModel({
                        id: "2",
                        name: "Sam"
                    }),
                    new EmployeeViewModel({
                        id: "3",
                        name: "John"
                    })
                ]
            })
        });
        const pageHtml = renderToString(pageView.render());
        return pageHtml;
    }

}