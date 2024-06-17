import { AssignTaskToScheduleDto, AssignTaskToScheduleUseCase } from "../AssignTaskToScheduleUseCase";
import { CommonFixture, FakeContext, createFake, createFixture, now } from "./common.fixture";
import { UnknownEmployeeIdDomainError } from "../../model/error";
import { UnknownTaskIdDomainError } from "../../model/error/UnknownTaskIdDomainError";
import { MissedScheduleDomainError } from "../../model/error/MissedScheduleDomainError";
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
                date: now.plusMonth()
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

    async function assignTaskToSchedule(dto: Partial<AssignTaskToScheduleDto> = {}) {
        const assignTaskToSchedule = new AssignTaskToScheduleUseCase(
            fake.schedules,
            fake.tasks,
            fake.employers
        );
        await assignTaskToSchedule.execute({
            employeeId: fixture.employee.id,
            taskId: fixture.task.id,
            date: now,
            ...dto
        });
    }

});