import { FakeScheduleRepository } from "../../repository/fake";
import { FakeTaskRepository } from "../../repository/fake/FakeTaskRepository";
import { FakeEmployeeRepository } from "../../repository/fake/FakeEmployeeRepository";
import { DateValueObject, EmployeeModel, ScheduleModel, TaskModel } from "../../model";

export interface FakeContext {
    schedules: FakeScheduleRepository;
    tasks: FakeTaskRepository;
    employers: FakeEmployeeRepository;
}

export interface CommonFixture {
    task: TaskModel;
    employee: EmployeeModel;
    schedule: ScheduleModel;
}

export const now = DateValueObject.now();

export function createFake(): FakeContext {
    return {
        schedules: new FakeScheduleRepository(),
        tasks: new FakeTaskRepository(),
        employers: new FakeEmployeeRepository()
    };
}

export function createFixture(): CommonFixture {
    return {
        task: TaskModel.create(),
        employee: EmployeeModel.create(),
        schedule: ScheduleModel.createForMonth(now)
    };
}