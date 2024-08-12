import { EmployeeModel } from "../model";

export interface EmployeeRepository {
    findOneByName(name: string): Promise<EmployeeModel | undefined>;
    findOne(id: string): Promise<EmployeeModel | undefined>;
    save(employee: EmployeeModel): Promise<void>;
}
