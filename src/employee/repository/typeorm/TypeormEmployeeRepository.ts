import { BaseTypeormRepository } from "../../../common/repository/typeorm";
import { EmployeeRepository } from "../interface";
import { EmployeeModel } from "../../model";

export class TypeormEmployeeRepository
    extends BaseTypeormRepository<EmployeeModel>
    implements EmployeeRepository {

    async findOne(id: string): Promise<EmployeeModel | undefined> {
        return await this.findOneWhere({ id });
    }

    async findOneByName(name: string): Promise<EmployeeModel | undefined> {
        return await this.findOneWhere({ name });
    }
}