import React from "react";
import { hydrateRoot } from "react-dom/client";
import { AllTasksPageView } from "../task/view";

function main() {
    hydrateRoot(document, <AllTasksPageView/>);
}

main();