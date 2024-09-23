import { Column, Entity, PrimaryColumn } from "typeorm";
import { LowercaseEmployeeNameDomainError, NonLatinEmployeeNameDomainError } from "./error";
import { PickProperties, uuid } from "../../common/utils";

export type EmployeeParams = PickProperties<EmployeeModel>;

@Entity("employees")
export class EmployeeModel {

    static create(name: string) {
        return new EmployeeModel({
            id: uuid(),
            name
        });
    }

    @PrimaryColumn()
    readonly id!: string;

    @Column({ nullable: false })
    public name!: string;

    constructor(params: EmployeeParams) {
        validateName(params.name);
        Object.assign(this, params);
    }

    setName(newName: string) {
        validateName(newName);
        this.name = newName;
    }

    equals(other: EmployeeModel) {
        return this.id === other.id;
    }
}

function validateName(name: string) {
    const isOnlyLatinCharsInName = /^[ a-z-]+$/i.test(name);
    if ( !isOnlyLatinCharsInName )
        throw new NonLatinEmployeeNameDomainError(name);

    const everyWordStartsWithUppercase = name.split(" ").every(word =>
        /^[A-Z]((-[A-Z])?[a-z]*)+$/.test(word)
    );
    if ( !everyWordStartsWithUppercase )
        throw new LowercaseEmployeeNameDomainError(name);
}