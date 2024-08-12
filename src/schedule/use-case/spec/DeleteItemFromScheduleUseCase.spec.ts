import { DeleteItemFromScheduleUseCase } from "../DeleteItemFromScheduleUseCase";
import { ScheduleItemModel, ScheduleModel } from "../../model";
import { UnknownScheduleItemIdDomainError, UnknownScheduleIdDomainError } from "../../model/error";
import { FakeScheduleInfrastructure } from "./FakeScheduleInfrastructure";
import { ScheduleFixture } from "./ScheduleFixture";
import { strict } from "assert";

describe("DeleteItemFromScheduleUseCase", () => {

    let fake: FakeScheduleInfrastructure;
    let fixture: ScheduleFixture;
    beforeEach(() => {
        fake = new FakeScheduleInfrastructure();
        fixture = new ScheduleFixture();

        fake.schedules.set(fixture.schedule);
    });

    it("should reject unknown schedule", async () => {
        await strict.rejects(
            deleteItemFromSchedule({
                scheduleId: "unknown",
                itemId: "unknown"
            }),
            UnknownScheduleIdDomainError
        );
    });

    it("should reject unknown item", async () => {
        await strict.rejects(
            deleteItemFromSchedule({itemId: "unknown"}),
            UnknownScheduleItemIdDomainError
        );
    });

    it("should delete item", async () => {
        // Arrange
        fixture.schedule.assignTask({
            employee: fixture.programmer,
            task: fixture.task,
            time: fixture.wholeDay
        });
        fake.schedules.set(fixture.schedule);
        const item = fixture.schedule.items[0];

        // Act
        await deleteItemFromSchedule({itemId: item.id});

        // Assert
        fake.schedules.wasSaved({
            id: fixture.schedule.id,
            items: []
        });
    });

    async function deleteItemFromSchedule(dto: {
        scheduleId?: ScheduleModel["id"];
        itemId: ScheduleItemModel["id"];
    }) {
        const deleteItemFromSchedule = new DeleteItemFromScheduleUseCase(
            fake.schedules
        );
        await deleteItemFromSchedule.execute({
            scheduleId: fixture.schedule.id,
            ...dto
        });
    }
});