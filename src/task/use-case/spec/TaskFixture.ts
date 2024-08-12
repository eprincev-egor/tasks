import { EmployeeModel } from "../../../employee/model";

export class TaskFixture {
    manager = EmployeeModel.create("Bob Manager");
}