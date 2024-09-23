import React from "react";
import { hydrateRoot } from "react-dom/client";
import { AllEmployeesPageView } from "../employee/view";
import { AllEmployeesPageViewModel } from "../employee/view/model";
import { BrowserFetchHttpDriver } from "../common/driver/http/browser-fetch";

function main() {
    const global = window as any as {rootModel: Record<string, any>; pageModel: any};
    const pageModel = AllEmployeesPageViewModel.fromJson(global.rootModel);

    // for debug only
    global.pageModel = pageModel;

    const http = new BrowserFetchHttpDriver();

    hydrateRoot(document, <AllEmployeesPageView model={pageModel} http={http}/>);
}

main();