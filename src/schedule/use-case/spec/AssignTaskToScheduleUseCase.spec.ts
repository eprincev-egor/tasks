import { AssignTaskToScheduleDto, AssignTaskToScheduleUseCase } from "../AssignTaskToScheduleUseCase";
import { TooLateForNewTaskDomainError, BusyEmployeeDomainError } from "../../model/";
import { UnknownTaskIdDomainError } from "../../../task/model/error";
import { UnknownEmployeeIdDomainError } from "../../../employee/model/error";
import { MissedScheduleDomainError } from "../../model/error";
import { DateIntervalValueObject, DateValueObject, WORK_DAY_DURATION } from "../../../common/model";
import { FakeScheduleInfrastructure } from "./FakeScheduleInfrastructure";
import { ScheduleFixture } from "./ScheduleFixture";
import { strict } from "assert";

describe("AssignTaskToScheduleUseCase", () => {

    let fake: FakeScheduleInfrastructure;
    let fixture: ScheduleFixture;
    beforeEach(() => {
        fake = new FakeScheduleInfrastructure();
        fixture = new ScheduleFixture();

        fake.employees.set(fixture.programmer);
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
                time: DateIntervalValueObject.create(fixture.now.plusMonth(), 1)
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
            items: [{employee: fixture.programmer}]
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
        fake.employees.set(fixture.programmer2);
        const sameTime = fixture.wholeDay;
        await assignTaskToSchedule({
            time: sameTime,
            employeeId: fixture.programmer.id
        });

        // Act
        await assignTaskToSchedule({
            time: sameTime,
            employeeId: fixture.programmer2.id
        });

        // Assert
        fake.schedules.wasSaved({
            id: fixture.schedule.id,
            items: [
                {employee: fixture.programmer, time: sameTime},
                {employee: fixture.programmer2, time: sameTime}
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

    it("should split task if it is too long for one day", async () => {
        // Arrange
        const longTime = WORK_DAY_DURATION * 2;
        const firstPart = DateIntervalValueObject.create(
            fixture.workDayStart, longTime / 2
        );
        const secondPart = DateIntervalValueObject.create(
            fixture.workDayStart.plusDay(), longTime / 2
        );

        // Act
        await assignTaskToSchedule({
            time: DateIntervalValueObject.create(fixture.workDayStart, longTime)
        });

        // Assert
        fake.schedules.wasSaved({
            id: fixture.schedule.id,
            items: [
                {employee: fixture.programmer, time: firstPart},
                {employee: fixture.programmer, time: secondPart}
            ]
        });
    });

    it("should reject long duration if it intersected with task", async () => {
        // Arrange
        await assignTaskToSchedule({
            time: DateIntervalValueObject.create(
                fixture.workDayStart.plusDay(),
                4
            )
        });
        const longTime = WORK_DAY_DURATION * 3;
        const longInterval = DateIntervalValueObject.create(
            fixture.workDayStart,
            longTime
        );

        // Act, assert
        await strict.rejects(
            assignTaskToSchedule({ time: longInterval }),
            BusyEmployeeDomainError
        );
    });

    async function assignTaskToSchedule(dto: Partial<AssignTaskToScheduleDto> = {}) {
        const assignTaskToSchedule = new AssignTaskToScheduleUseCase(
            fake.schedules,
            fake.tasks,
            fake.employees
        );
        await assignTaskToSchedule.execute({
            employeeId: fixture.programmer.id,
            taskId: fixture.task.id,
            time: fixture.wholeDay,
            ...dto
        });
    }

});