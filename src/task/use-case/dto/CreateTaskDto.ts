import { IsNotEmpty, Length } from "class-validator";
import { TaskModel } from "../../model";
import { PickProperties } from "../../../common/utils";
import { EmployeeModel } from "../../../employee/model";

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

    createTask(author: EmployeeModel) {
        return TaskModel.create({
            key: this.key,
            title: this.title,
            description: this.description,
            author
        });
    }
}