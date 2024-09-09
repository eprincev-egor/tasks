import { AbstractPageView } from "../../common/view/page";
import { AllEmployeesPageViewModel } from "./model";
import React from "react";

export class AllEmployeesPageView extends AbstractPageView<{
    model: AllEmployeesPageViewModel;
}> {
    protected title = "All employees";
    protected jsBundleName = "main.allEmployees";
    protected cssBundleName = "AllEmployeesPageView";

    renderContent() {
        return <div class="AllEmployeesPageView--employees">

        </div>;
    }
}