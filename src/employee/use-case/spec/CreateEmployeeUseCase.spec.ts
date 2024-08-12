import { CreateEmployeeUseCase } from "../CreateEmployeeUseCase";
import { LowercaseEmployeeNameDomainError, NonLatinEmployeeNameDomainError } from "../../model/error";
import { FakeEmployeeInfrastructure } from "./FakeEmployeeInfrastructure";
import { strict } from "assert";

describe("CreateEmployeeUseCase", () => {

    let fake: FakeEmployeeInfrastructure;
    beforeEach(() => {
        fake = new FakeEmployeeInfrastructure();
    });

    it("should create employee", async () => {
        await createEmployee("Oliver Twist");

        fake.employees.wasSaved({
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

        fake.employees.wasSaved({
            name: "Ivan Mamin-Sibiryak"
        });
    });

    async function createEmployee(name: string) {
        const createEmployee = new CreateEmployeeUseCase(fake.employees);
        await createEmployee.execute({ name });
    }
});