import { configDotenv } from "dotenv";
import {Client} from "pg";
import { migrate } from "../migrate";
import { main } from "../main";
import { TypeormTaskRepository } from "../../task/repository/typeorm";
import { DataSource } from "typeorm";
import { TaskModel } from "../../task/model";
import { TypeormEmployeeRepository } from "../../employee/repository/typeorm";
import { EmployeeModel } from "../../employee/model";
import { strict } from "assert";

describe("integration tests", () => {

    let pg: Client;
    let orm: DataSource;
    let appPort: number;
    let employees: TypeormEmployeeRepository;
    let tasks: TypeormTaskRepository;
    before(async () => {
        configDotenv({ path: ".env-test.ini" });
        appPort = Number(process.env.APP_PORT);
        pg = new Client({
            host: process.env.POSTGRES_HOST || "localhost",
            port: Number(process.env.POSTGRES_PORT) || 5432,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE
        });
        await pg.connect();

        await main();
    });

    beforeEach(async () => {
        await pg.query("drop schema public cascade");
        await pg.query("create schema public");
        orm = await migrate();

        employees = new TypeormEmployeeRepository(orm.getRepository(EmployeeModel));
        tasks = new TypeormTaskRepository(orm.getRepository(TaskModel));
    });

    it("should create employee", async () => {
        // Arrange
        const employeeName = "Oliver Twist";

        // Act
        await PUT("/employees", { name: employeeName });

        // Assert
        const createdEmployee = await employees.findOneByName(employeeName);
        strict.ok(createdEmployee);
    });

    it("should create task", async () => {
        // Arrange
        const manager = EmployeeModel.create("Bob Manager");
        const taskKey = "LW-1001";
        await employees.save(manager);

        // Act
        await PUT("/tasks", {
            key: taskKey,
            title: "Some Task",
            description: "Add feature",
            authorId: manager.id
        });

        // Assert
        const createdTask = await tasks.findOneByKey(taskKey);
        strict.ok(createdTask);
    });

    async function PUT(url: string, body: any) {
        await fetch(`http://localhost:${appPort}${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
});