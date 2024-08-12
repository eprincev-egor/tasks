import { FakeEmployeeRepository } from "../../repository/fake";

export class FakeEmployeeInfrastructure {
    employees = new FakeEmployeeRepository();
}