import { BaseTypeormRepository } from "./BaseTypeormRepository";
import { EmployeeRepository } from "../interface";
import { EmployeeModel } from "../../model";

export class TypeormEmployeeRepository
    extends BaseTypeormRepository<EmployeeModel>
    implements EmployeeRepository {

    async findOne(id: string): Promise<EmployeeModel | undefined> {
        return await this.findOneWhere({ id });
    }
}