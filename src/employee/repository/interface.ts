import { EmployeeModel } from "../model";

export interface EmployeeRepository {
    findMany(select: SelectEmployeeParams): Promise<EmployeeModel[]>;
    findOneByName(name: string): Promise<EmployeeModel | undefined>;
    findOne(id: string): Promise<EmployeeModel | undefined>;
    save(employee: EmployeeModel): Promise<void>;
}

export interface SelectEmployeeParams {
    limit: number;
}