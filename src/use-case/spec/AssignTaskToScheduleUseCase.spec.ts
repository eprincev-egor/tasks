import { strict } from "assert";
import { AssignTaskToScheduleUseCase } from "../AssignTaskToScheduleUseCase";
import { FakeContext, createFake } from "./common.fixture";
import { DateValueObject } from "../../model";
import { UnknownEmployeeIdDomainError } from "../../model/error";

describe.only("AssignTaskToScheduleUseCase", () => {

    let assignTaskToSchedule: AssignTaskToScheduleUseCase;
    let fake: FakeContext;
    beforeEach(() => {
        fake = createFake();
        assignTaskToSchedule = new AssignTaskToScheduleUseCase(
            fake.schedules
        );
    });

    it("should reject unknown employee", async () => {
        await strict.rejects(
            assignTaskToSchedule.execute({
                employeeId: "unknown",
                taskId: "unknown",
                date: DateValueObject.now()
            }),
            UnknownEmployeeIdDomainError
        );
    });

});