import { BaseFakeRepository } from "../../../common/repository/fake";
import { EmployeeModel } from "../../model";
import { EmployeeRepository } from "../interface";

export class FakeEmployeeRepository
    extends BaseFakeRepository<EmployeeModel>
    implements EmployeeRepository {

    async findOne(id: string): Promise<EmployeeModel | undefined> {
        return this.getBy((model) => model.id === id);
    }

    async findOneByName(name: string): Promise<EmployeeModel | undefined> {
        return this.getBy((model) => model.name === name);
    }
}