import React from "react";
import { hydrateRoot } from "react-dom/client";
import { AllEmployeesPageView } from "../employee/view";
import { AllEmployeesPageViewModel } from "../employee/view/model";

function main() {
    const global = window as any as {rootModel: Record<string, any>; pageModel: any};
    const pageModel = AllEmployeesPageViewModel.fromJson(global.rootModel);

    // for debug only
    global.pageModel = pageModel;

    hydrateRoot(document, <AllEmployeesPageView model={pageModel}/>);
}

main();