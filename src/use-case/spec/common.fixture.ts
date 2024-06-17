import { FakeScheduleRepository } from "../../repository/fake";
import { FakeTaskRepository } from "../../repository/fake/FakeTaskRepository";
import { FakeEmployeeRepository } from "../../repository/fake/FakeEmployeeRepository";
import { DateValueObject, EmployeeModel, HoursValueObject, ScheduleModel, TaskModel } from "../../model";
import { DateIntervalValueObject } from "../../model/DateIntervalValueObject";

export interface FakeContext {
    schedules: FakeScheduleRepository;
    tasks: FakeTaskRepository;
    employers: FakeEmployeeRepository;
}

export interface CommonFixture {
    task: TaskModel;
    employee: EmployeeModel;
    schedule: ScheduleModel;
    /** 8 hours */
    wholeDay: DateIntervalValueObject;
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
        employee: EmployeeModel.create("Oliver Twist"),
        wholeDay: new DateIntervalValueObject(
            now.toWorkDayStart(),
            new HoursValueObject(8)
        ),
        schedule: ScheduleModel.createForMonth(now)
    };
}