import { DateValueObject, UnknownEmployeeIdDomainError } from "../../model";
import { CreateTaskUseCase } from "../CreateTaskUseCase";
import { CreateTaskDto } from "../dto";
import { CommonFixture, createFake, createFixture, FakeContext } from "./common.fixture";
import { strict } from "assert";

describe("CreateTaskUseCase", () => {

    let fake: FakeContext;
    let fixture: CommonFixture;
    beforeEach(() => {
        fake = createFake();
        fixture = createFixture();

        fake.employees.set(fixture.manager);
    });

    it("should create task with correct title", async () => {
        await createTask({ title: "Correct title" });

        fake.tasks.wasSaved({
            title: "Correct title"
        });
    });

    it("should create task with correct author", async () => {
        await createTask({ authorId: fixture.manager.id });

        fake.tasks.wasSaved({
            author: fixture.manager
        });
    });

    it("should reject unknown author", async () => {
        await strict.rejects(
            createTask({ authorId: "unknown" }),
            UnknownEmployeeIdDomainError
        );
    });

    it("should create task with current date in creationDate", async () => {
        const now = DateValueObject.now();

        await createTask();

        const savedTask = fake.tasks.getLast()!;
        strict.ok(
            savedTask.creationDate.greaterThan(now) ||
            savedTask.creationDate.equals(now)
        );
    });

    it("should create task with correct key", async () => {
        await createTask({ key: "LW-4000" });

        fake.tasks.wasSaved({
            key: "LW-4000"
        });
    });

    it("should create task with correct description", async () => {
        await createTask({ description: "Test description" });

        fake.tasks.wasSaved({
            description: "Test description"
        });
    });

    async function createTask(dtoParams: Partial<CreateTaskDto> = {}) {
        const createTask = new CreateTaskUseCase(
            fake.employees,
            fake.tasks
        );
        const dto = new CreateTaskDto({
            title: "New task",
            description: "Add feature",
            authorId: fixture.manager.id,
            key: "LW-1001",
            ...dtoParams
        });
        await createTask.execute(dto);
    }
});