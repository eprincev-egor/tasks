import { EmployeeModel } from "../../employee/model";
import { TaskModel } from "../../task/model";

export class MainFixture {
    manager = EmployeeModel.create("Bob Manager");
    task = TaskModel.create({
        key: "LW-1001",
        title: "Some new task",
        description: "Some description",
        author: this.manager
    });
}