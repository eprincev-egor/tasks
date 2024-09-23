import { PickProperties } from "../../../common/utils";
import { EmployeeModel } from "../../model";
import { RequiredNameInChangesDomainError } from "../../model/error";

export class UpdateEmployeeDto {
    id!: string;
    changes!: Partial<EmployeeModel>;
    constructor(params: PickProperties<UpdateEmployeeDto>) {
        Object.assign(this, params);
    }

    validate() {
        if ( !this.changes.name )
            throw new RequiredNameInChangesDomainError(this.changes);
    }
}