import { Controller, Get, Inject } from "@nestjs/common";
import { AllEmployeesPageView } from "../view";
import { AllEmployeesPageViewModel } from "../view/model";
import { renderToString } from "react-dom/server";
import { EmployeeViewModel } from "../view/model/EmployeeViewModel";
import { EmployeeRepository } from "../repository/interface";
import { DummyHttpDriver } from "../../common/driver/http/dummy";

@Controller()
export class SsrEmployeeController {

    constructor(
        @Inject("employees")
        private employees: EmployeeRepository
    ) {}

    @Get("employees")
    async onGetAllTasksPageRequest() {
        const employees = await this.employees.findMany({ limit: 10 });
        const employeesViewModels = employees.map(employee =>
            new EmployeeViewModel({
                id: employee.id,
                name: employee.name
            })
        );
        const pageViewModel = new AllEmployeesPageViewModel({
            employees: employeesViewModels
        });

        const pageView = new AllEmployeesPageView({
            model: pageViewModel,
            http: new DummyHttpDriver()
        });
        const pageHtml = renderToString(pageView.render());
        return pageHtml;
    }

}