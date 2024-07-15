import { FakeScheduleRepository } from "../../repository/fake";
import { FakeTaskRepository } from "../../repository/fake/FakeTaskRepository";
import { FakeEmployeeRepository } from "../../repository/fake/FakeEmployeeRepository";
import { DateValueObject, EmployeeModel, ScheduleModel, TaskModel, WORK_DAY_DURATION } from "../../model";
import { DateIntervalValueObject } from "../../model/DateIntervalValueObject";

export interface FakeContext {
    schedules: FakeScheduleRepository;
    tasks: FakeTaskRepository;
    employers: FakeEmployeeRepository;
}

export interface CommonFixture {
    task: TaskModel;
    employee: EmployeeModel;
    employee2: EmployeeModel;
    schedule: ScheduleModel;
    workDayStart: DateValueObject;
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
        employee2: EmployeeModel.create("Mark Twain"),
        workDayStart: now.toWorkDayStart(),
        wholeDay: DateIntervalValueObject.create(
            now.toWorkDayStart(), WORK_DAY_DURATION
        ),
        schedule: ScheduleModel.createForMonth(now)
    };
}