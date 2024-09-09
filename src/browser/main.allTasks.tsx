import React from "react";
import { hydrateRoot } from "react-dom/client";
import { AllTasksPageView } from "../task/view";
import { AllTasksPageViewModel } from "../task/view/model";

function main() {
    const global = window as any as {rootModel: Record<string, any>; pageModel: any};
    const pageModel = AllTasksPageViewModel.fromJson(global.rootModel);

    // for debug only
    global.pageModel = pageModel;

    hydrateRoot(document, <AllTasksPageView model={pageModel}/>);
}

main();