import { FakeEmployeeRepository } from "../../../employee/repository/fake";
import { FakeTaskRepository } from "../../../task/repository/fake";
import { FakeScheduleRepository } from "../../repository/fake";

export class FakeScheduleInfrastructure {
    tasks = new FakeTaskRepository();
    employees = new FakeEmployeeRepository();
    schedules = new FakeScheduleRepository();
}