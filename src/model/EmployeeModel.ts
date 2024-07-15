import { LowercaseEmployeeNameDomainError, NonLatinEmployeeNameDomainError } from "./error";
import {PickProperties, uuid} from "./utils";

export type EmployeeParams = PickProperties<EmployeeModel>;

export class EmployeeModel {

    static create(name: string) {
        return new EmployeeModel({
            id: uuid(),
            name
        });
    }

    readonly id!: string;
    readonly name!: string;
    constructor(params: EmployeeParams) {
        Object.assign(this, params);

        const isOnlyLatinCharsInName = /^[ a-z-]+$/i.test(params.name);
        if ( !isOnlyLatinCharsInName )
            throw new NonLatinEmployeeNameDomainError(params.name);

        const everyWordStartsWithUppercase = params.name.split(" ").every((word) =>
            /^[A-Z]((-[A-Z])?[a-z]*)+$/.test(word)
        );
        if ( !everyWordStartsWithUppercase )
            throw new LowercaseEmployeeNameDomainError(params.name);
    }

    equals(other: EmployeeModel) {
        return this.id === other.id;
    }
}