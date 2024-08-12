import { IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {

    @IsNotEmpty()
    public name!: string;

}