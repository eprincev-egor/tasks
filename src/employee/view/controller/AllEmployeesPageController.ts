export class AllEmployeesPageController {
    async onCreateEmployee(row: Record<string, any>) {
        await fetch("/employees", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(row)
        });
    }
}