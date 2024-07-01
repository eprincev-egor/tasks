import { AssignTaskToScheduleDto, AssignTaskToScheduleUseCase } from "../AssignTaskToScheduleUseCase";
import { CommonFixture, FakeContext, createFake, createFixture, now } from "./common.fixture";
import { TooLateForNewTaskDomainError, UnknownEmployeeIdDomainError } from "../../model/error";
import { UnknownTaskIdDomainError } from "../../model/error/UnknownTaskIdDomainError";
import { MissedScheduleDomainError } from "../../model/error/MissedScheduleDomainError";
import { DateIntervalValueObject } from "../../model/DateIntervalValueObject";
import { DateValueObject, WORK_DAY_DURATION } from "../../model";
import { BusyEmployeeDomainError } from "../../model/error/BusyEmployeeDomainError";
import { strict } from "assert";

describe.only("AssignTaskToScheduleUseCase", () => {

    let fake: FakeContext;
    let fixture: CommonFixture;
    beforeEach(() => {
        fake = createFake();
        fixture = createFixture();

        fake.employers.set(fixture.employee);
        fake.tasks.set(fixture.task);
        fake.schedules.set(fixture.schedule);
    });

    it("should reject unknown employee", async () => {
        await strict.rejects(
            assignTaskToSchedule({
                employeeId: "unknown"
            }),
            UnknownEmployeeIdDomainError
        );
    });

    it("should reject unknown task", async () => {
        await strict.rejects(
            assignTaskToSchedule({
                taskId: "unknown"
            }),
            UnknownTaskIdDomainError
        );
    });

    it("should reject task if not exist schedule", async () => {
        await strict.rejects(
            assignTaskToSchedule({
                time: DateIntervalValueObject.create(now.plusMonth(), 1)
            }),
            MissedScheduleDomainError
        );
    });

    it("should assign task", async () => {
        await assignTaskToSchedule();

        fake.schedules.wasSaved({
            id: fixture.schedule.id,
            items: [{task: fixture.task}]
        });
    });

    it("should assign task to correct employee", async () => {
        await assignTaskToSchedule();

        fake.schedules.wasSaved({
            id: fixture.schedule.id,
            items: [{employee: fixture.employee}]
        });
    });

    it("should assign task to correct date/time", async () => {
        await assignTaskToSchedule();

        fake.schedules.wasSaved({
            id: fixture.schedule.id,
            items: [{time: fixture.wholeDay}]
        });
    });

    it("should reject second task if employee is busy", async () => {
        // Arrange
        await assignTaskToSchedule();

        await strict.rejects(
            assignTaskToSchedule(),
            BusyEmployeeDomainError
        );
    });

    it("should assign task if next task starts immediately after previous", async () => {
        // Arrange
        const someTaskTime = DateIntervalValueObject.create(
            DateValueObject.now().toWorkDayStart(), 4
        );
        const immediatelyNextTaskTime = DateIntervalValueObject.create(
            someTaskTime.endDate, 4
        );
        await assignTaskToSchedule({ time: someTaskTime });

        // Act
        await assignTaskToSchedule({ time: immediatelyNextTaskTime });

        // Assert
        fake.schedules.wasSaved({
            id: fixture.schedule.id,
            items: [
                {time: someTaskTime},
                {time: immediatelyNextTaskTime}
            ]
        });
    });

    it("should assign tasks on same time for different employees", async () => {
        // Arrange
        fake.employers.set(fixture.employee2);
        const sameTime = fixture.wholeDay;
        await assignTaskToSchedule({
            time: sameTime,
            employeeId: fixture.employee.id
        });

        // Act
        await assignTaskToSchedule({
            time: sameTime,
            employeeId: fixture.employee2.id
        });

        // Assert
        fake.schedules.wasSaved({
            id: fixture.schedule.id,
            items: [
                {employee: fixture.employee, time: sameTime},
                {employee: fixture.employee2, time: sameTime}
            ]
        });
    });

    it("should reject task on end of work day", async () => {
        const oneHourBeforeEndOfDay = DateValueObject.now().toWorkDayStart()
            .plusHours(WORK_DAY_DURATION - 1);

        await strict.rejects(
            assignTaskToSchedule({
                time: DateIntervalValueObject.create(oneHourBeforeEndOfDay, 1)
            }),
            TooLateForNewTaskDomainError
        );
    });

    async function assignTaskToSchedule(dto: Partial<AssignTaskToScheduleDto> = {}) {
        const assignTaskToSchedule = new AssignTaskToScheduleUseCase(
            fake.schedules,
            fake.tasks,
            fake.employers
        );
        await assignTaskToSchedule.execute({
            employeeId: fixture.employee.id,
            taskId: fixture.task.id,
            time: fixture.wholeDay,
            ...dto
        });
    }

});