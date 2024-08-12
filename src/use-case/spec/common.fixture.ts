import { FakeScheduleRepository } from "../../repository/fake";
import { FakeTaskRepository } from "../../repository/fake/FakeTaskRepository";
import { FakeEmployeeRepository } from "../../repository/fake/FakeEmployeeRepository";
import { DateValueObject, EmployeeModel, ScheduleModel, TaskModel, WORK_DAY_DURATION } from "../../model";
import { DateIntervalValueObject } from "../../model/DateIntervalValueObject";

export interface FakeContext {
    schedules: FakeScheduleRepository;
    tasks: FakeTaskRepository;
    employees: FakeEmployeeRepository;
}

export interface CommonFixture {
    task: TaskModel;
    programmer: EmployeeModel;
    programmer2: EmployeeModel;
    manager: EmployeeModel;
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
        employees: new FakeEmployeeRepository()
    };
}

export function createFixture(): CommonFixture {
    const manager = EmployeeModel.create("Bob Manager");
    return {
        task: TaskModel.create({
            title: "Some Task",
            key: "LW-1001",
            author: manager,
            description: "Add feature"
        }),
        programmer: EmployeeModel.create("Oliver Twist"),
        programmer2: EmployeeModel.create("Mark Twain"),
        manager,
        workDayStart: now.toWorkDayStart(),
        wholeDay: DateIntervalValueObject.create(
            now.toWorkDayStart(), WORK_DAY_DURATION
        ),
        schedule: ScheduleModel.createForMonth(now)
    };
}