import { BaseTypeormRepository } from "../../../common/repository/typeorm";
import { EmployeeRepository, SelectEmployeeParams } from "../interface";
import { EmployeeModel } from "../../model";

export class TypeormEmployeeRepository
    extends BaseTypeormRepository<EmployeeModel>
    implements EmployeeRepository {

    async findMany(select: SelectEmployeeParams): Promise<EmployeeModel[]> {
        return await this.orm.find({
            take: select.limit
        });
    }

    async findOne(id: string): Promise<EmployeeModel | undefined> {
        return await this.findOneWhere({ id });
    }

    async findOneByName(name: string): Promise<EmployeeModel | undefined> {
        return await this.findOneWhere({ name });
    }
}