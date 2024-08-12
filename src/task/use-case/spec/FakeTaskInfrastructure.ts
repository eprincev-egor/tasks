import { FakeEmployeeRepository } from "../../../employee/repository/fake";
import { FakeTaskRepository } from "../../repository/fake";

export class FakeTaskInfrastructure {
    employees = new FakeEmployeeRepository();
    tasks = new FakeTaskRepository();
}