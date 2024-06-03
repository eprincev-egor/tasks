import { BaseFakeRepository } from "./BaseFakeRepository";
import { EmployeeRepository } from "../interface";
import { EmployeeModel } from "../../model";

export class FakeEmployeeRepository
    extends BaseFakeRepository<EmployeeModel>
    implements EmployeeRepository {

    async findOne(id: string): Promise<EmployeeModel | undefined> {
        return this.getBy((model) => model.id === id);
    }
}