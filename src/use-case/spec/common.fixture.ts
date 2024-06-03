import { FakeScheduleRepository } from "../../repository/fake";
import {FakeTaskRepository} from "../../repository/fake/FakeTaskRepository";
import {FakeEmployeeRepository} from "../../repository/fake/FakeEmployeeRepository";

export interface FakeContext {
    schedules: FakeScheduleRepository;
    tasks: FakeTaskRepository;
    employers: FakeEmployeeRepository;
}

export function createFake(): FakeContext {
    return {
        schedules: new FakeScheduleRepository(),
        tasks: new FakeTaskRepository(),
        employers: new FakeEmployeeRepository()
    };
}