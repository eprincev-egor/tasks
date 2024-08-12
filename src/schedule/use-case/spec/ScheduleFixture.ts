import { DateIntervalValueObject, DateValueObject, WORK_DAY_DURATION } from "../../../common/model";
import { EmployeeModel } from "../../../employee/model";
import { TaskModel } from "../../../task/model";
import { ScheduleModel } from "../../model";

export class ScheduleFixture {
    now = DateValueObject.now();
    workDayStart = this.now.toWorkDayStart();
    wholeDay = DateIntervalValueObject.create(
        this.now.toWorkDayStart(), WORK_DAY_DURATION
    );

    manager = EmployeeModel.create("Bob Manager");

    task = TaskModel.create({
        title: "Some Task",
        key: "LW-1001",
        author: this.manager,
        description: "Add feature"
    });

    programmer = EmployeeModel.create("Oliver Twist");
    programmer2 = EmployeeModel.create("Mark Twain");


    schedule = ScheduleModel.createForMonth(this.now);
}