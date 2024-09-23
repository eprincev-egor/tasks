import { AllEmployeesPageViewModel } from "./model";
import React from "react";
import { AbstractPageView } from "../../common/view/page";
import { EmployeeViewModel } from "./model/EmployeeViewModel";
import { Grid, GridColumn } from "../../common/view/component/grid";
import { observer } from "mobx-react";
import { AllEmployeesPageController } from "./controller";
import { HttpDriver } from "../../common/driver/http/interface";

const columns: GridColumn<EmployeeViewModel>[] = [
    {field: "name", headerName: "Name", editable: true, valueSetter: event => {
        if (event.node?.isRowPinned()) return false;

        const employee = event.data;
        employee.setName(event.newValue as string);
        return true;
    }}
];

@observer
export class AllEmployeesPageView extends AbstractPageView<{
    model: AllEmployeesPageViewModel;
    http: HttpDriver;
}> {
    protected title = "All employees";
    protected jsBundleName = "main.allEmployees";
    protected cssBundleName = "AllEmployeesPageView";
    private controller = new AllEmployeesPageController(this.props.http);

    renderContent() {
        return <div className="AllEmployeesPageView--employees">
            <Grid
                columns={columns}
                rows={this.model.employees}
                onRowCreate={row => this.controller.onCreateEmployee(row)}
                onRowUpdate={(row, changes) => this.controller.onRowUpdate(row, changes)}
            />
        </div>;
    }
}