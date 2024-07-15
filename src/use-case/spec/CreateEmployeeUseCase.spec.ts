import { CreateEmployeeUseCase } from "../CreateEmployeeUseCase";
import { createFake, FakeContext } from "./common.fixture";
import { LowercaseEmployeeNameDomainError, NonLatinEmployeeNameDomainError } from "../../model/error";
import { strict } from "assert";

describe("CreateEmployeeUseCase", () => {

    let fake: FakeContext;
    beforeEach(() => {
        fake = createFake();
    });

    it("should create employee", async () => {
        await createEmployee("Oliver Twist");

        fake.employers.wasSaved({
            name: "Oliver Twist"
        });
    });

    it("should reject name with cyrillic symbols", async () => {
        await strict.rejects(
            createEmployee("Генадий Букин"),
            NonLatinEmployeeNameDomainError
        );
    });

    it("should reject name if words starts with lowercase symbol", async () => {
        await strict.rejects(
            createEmployee("oliver twist"),
            LowercaseEmployeeNameDomainError
        );
    });

    it("should accept employee name with -", async () => {
        await createEmployee("Ivan Mamin-Sibiryak");

        fake.employers.wasSaved({
            name: "Ivan Mamin-Sibiryak"
        });
    });

    async function createEmployee(name: string) {
        const createEmployee = new CreateEmployeeUseCase(fake.employers);
        await createEmployee.execute({ name });
    }
});