import { BaseFakeRepository } from "../../../common/repository/fake";
import { EmployeeModel } from "../../model";
import { EmployeeRepository, SelectEmployeeParams } from "../interface";

export class FakeEmployeeRepository
    extends BaseFakeRepository<EmployeeModel>
    implements EmployeeRepository {

    async findMany(select: SelectEmployeeParams): Promise<EmployeeModel[]> {
        return this.getAll().slice(0, select.limit);
    }

    async findOne(id: string): Promise<EmployeeModel | undefined> {
        return this.getBy(model => model.id === id);
    }

    async findOneByName(name: string): Promise<EmployeeModel | undefined> {
        return this.getBy(model => model.name === name);
    }
}