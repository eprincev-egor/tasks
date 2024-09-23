import { UpdateEmployeeUseCase } from "../UpdateEmployeeUseCase";
import { UpdateEmployeeDto } from "../dto";
import {
    LowercaseEmployeeNameDomainError,
    NonLatinEmployeeNameDomainError,
    RequiredNameInChangesDomainError,
    UnknownEmployeeIdDomainError
} from "../../model/error";
import { FakeEmployeeInfrastructure } from "./FakeEmployeeInfrastructure";
import { EmployeeFixture } from "./EmployeeFixture";
import { strict } from "assert";

describe("UpdateEmployeeUseCae", () => {

    let fake: FakeEmployeeInfrastructure;
    let fixture: EmployeeFixture;
    beforeEach(() => {
        fake = new FakeEmployeeInfrastructure();
        fixture = new EmployeeFixture();

        fake.employees.set(fixture.bob);
    });

    it("should reject unknown employee", async () => {
        await strict.rejects(
            updateEmployee({ id: "unknown" }),
            UnknownEmployeeIdDomainError
        );
    });

    it("should save new employee name", async () => {
        await updateEmployee({
            changes: {name: "New Name"}
        });

        fake.employees.wasSaved({
            id: fixture.bob.id,
            name: "New Name"
        });
    });

    it("should reject changes without name", async () => {
        await strict.rejects(
            updateEmployee({changes: {}}),
            RequiredNameInChangesDomainError
        );
    });

    it("should reject name with cyrillic symbols", async () => {
        await strict.rejects(
            updateEmployee({changes: {name: "Генадий Букин"}}),
            NonLatinEmployeeNameDomainError
        );
    });

    it("should reject name if words starts with lowercase symbol", async () => {
        await strict.rejects(
            updateEmployee({changes: {name: "oliver twist"}}),
            LowercaseEmployeeNameDomainError
        );
    });

    async function updateEmployee(partialDto: Partial<UpdateEmployeeDto>) {
        const updateEmployee = new UpdateEmployeeUseCase(fake.employees);
        const dto = new UpdateEmployeeDto({
            id: fixture.bob.id,
            changes: {name: "Some Name"},
            ...partialDto
        });
        await updateEmployee.execute(dto);
    }
});