import { HttpDriver } from "../../../common/driver/http/interface";
import { EmployeeViewModel } from "../model";

export class AllEmployeesPageController {

    constructor(
        private http: HttpDriver
    ) {}

    async onCreateEmployee(newRow: Record<string, any>) {
        await this.http.put("/employees", newRow);
    }

    async onRowUpdate(employee: EmployeeViewModel, changes: Partial<EmployeeViewModel>) {
        await this.http.patch(`/employees/${employee.id}`, changes);
    }
}