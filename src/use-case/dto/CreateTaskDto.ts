import { IsNotEmpty, Length } from "class-validator";
import { PickProperties } from "../../model";

export class CreateTaskDto {

    @IsNotEmpty()
    public key!: string;

    @IsNotEmpty()
    public title!: string;

    @Length(0, 10_000)
    public description?: string;

    @IsNotEmpty()
    public authorId!: string;

    constructor(params: PickProperties<CreateTaskDto>) {
        Object.assign(this, params);
    }
}