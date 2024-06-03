import { CreateMissedSchedulesUseCase } from "../CreateMissedSchedulesUseCase";
import { DateValueObject, ScheduleModel } from "../../model";
import { FakeContext, createFake } from "./CreateMissedSchedulesUseCase.fixture";

describe("CreateMissedSchedulesUseCase", () => {

    let createMissedSchedules: CreateMissedSchedulesUseCase;
    let fake: FakeContext;
    const now = DateValueObject.now();
    beforeEach(() => {
        fake = createFake();
        createMissedSchedules = new CreateMissedSchedulesUseCase(
            fake.schedules
        );
    });

    it("should create new schedule on current month", async () => {
        await createMissedSchedules.execute(now);

        fake.schedules.wasSaved({
            startDate: now.toMonthStart(),
            finishDate: now.toMonthEnd()
        });
    });

    it("should not create new schedule if already exists", async () => {
        const existentSchedule = ScheduleModel.createForMonth(now);
        fake.schedules.set(existentSchedule);

        await createMissedSchedules.execute(now);

        fake.schedules.wasNotSaved({ startDate: now.toMonthStart() });
    });

    it("should create 12 schedules for whole year", async () => {
        const january = now.toYearStart();

        await createMissedSchedules.execute(january);

        let month = january;
        for (let i = 0; i < 12; i++) {
            fake.schedules.wasSaved({
                startDate: month,
                finishDate: month.toMonthEnd()
            });
            month = month.plusMonth();
        }
    });

    it("should create schedules for each month starting from the current", async () => {
        const june = new DateValueObject(new Date("2024-06-01T00:00:00.0"));

        await createMissedSchedules.execute(june);

        const mayInNextYear = new DateValueObject(new Date("2025-05-01T00:00:00.0"));
        fake.schedules.wasSaved({
            startDate: mayInNextYear,
            finishDate: mayInNextYear.toMonthEnd()
        });
    });

    it("should create schedule with correct 29 february date", async () => {
        const february2024 = new DateValueObject(new Date("2024-02-01T00:00:00.0"));

        await createMissedSchedules.execute(february2024);

        fake.schedules.wasSaved({
            startDate: february2024,
            finishDate: new DateValueObject(new Date("2024-02-29T23:59:59.999"))
        });
    });

});