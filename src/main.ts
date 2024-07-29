import { DataSource } from "typeorm";
import { EmployeeModel, ScheduleItemModel, ScheduleModel, TaskModel } from "./model";

async function main() {
    const db = new DataSource({
        type: "postgres",
        host: process.env.POSTGRES_HOST || "localhost",
        port: Number(process.env.POSTGRES_PORT) || 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [
            EmployeeModel,
            TaskModel,
            ScheduleItemModel,
            ScheduleModel
        ],
        entitySkipConstructor: true
    });
    await db.initialize();
    await db.synchronize();
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});