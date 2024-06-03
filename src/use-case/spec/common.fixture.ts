import { FakeScheduleRepository } from "../../repository/fake";

export interface FakeContext {
    schedules: FakeScheduleRepository;
}

export function createFake(): FakeContext {
    return {
        schedules: new FakeScheduleRepository()
    };
}