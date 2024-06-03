import { strict } from "assert";
import { AssignTaskToScheduleUseCase } from "../AssignTaskToScheduleUseCase";
import { FakeContext, createFake } from "./common.fixture";
import {DateValueObject, EmployeeModel, TaskModel} from "../../model";
import { UnknownEmployeeIdDomainError } from "../../model/error";
import {UnknownTaskIdDomainError} from "../../model/error/UnknownTaskIdDomainError";
import {MissedScheduleDomainError} from "../../model/error/MissedScheduleDomainError";

describe.only("AssignTaskToScheduleUseCase", () => {

    let assignTaskToSchedule: AssignTaskToScheduleUseCase;
    let fake: FakeContext;
    beforeEach(() => {
        fake = createFake();
        assignTaskToSchedule = new AssignTaskToScheduleUseCase(
            fake.schedules,
            fake.tasks,
            fake.employers
        );
    });

    it("should reject unknown employee", async () => {
        const task = TaskModel.create()
        fake.tasks.set(task)

        await strict.rejects(
            assignTaskToSchedule.execute({
                employeeId: "unknown",
                taskId: task.id,
                date: DateValueObject.now()
            }),
            UnknownEmployeeIdDomainError
        );
    });

    it("should reject unknown task", async () => {
        const employee = EmployeeModel.create()
        fake.employers.set(employee)

        await strict.rejects(
            assignTaskToSchedule.execute({
                employeeId: employee.id,
                taskId: "unknown",
                date: DateValueObject.now()
            }),
            UnknownTaskIdDomainError
        );
    });

    it("should reject task if not exist schedule", async () => {
        const task = TaskModel.create()
        const employee = EmployeeModel.create()
        fake.employers.set(employee)
        fake.tasks.set(task)

        await strict.rejects(
            assignTaskToSchedule.execute({
                employeeId: employee.id,
                taskId: task.id,
                date: DateValueObject.now()
            }),
            MissedScheduleDomainError
        );
    })
});