import { configDotenv } from "dotenv";
import {Client} from "pg";
import { migrate } from "../migrate";
import { main } from "../main";
import { TypeormTaskRepository } from "../../task/repository/typeorm";
import { DataSource } from "typeorm";
import { TaskModel } from "../../task/model";
import { TypeormEmployeeRepository } from "../../employee/repository/typeorm";
import { EmployeeModel } from "../../employee/model";
import { MainFixture } from "./main.fixture";
import { strict } from "assert";

describe("integration tests", () => {

    let pg: Client;
    let orm: DataSource;
    let appPort: number;
    let employees: TypeormEmployeeRepository;
    let tasks: TypeormTaskRepository;
    let fixture: MainFixture;
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

        fixture = new MainFixture();
    });

    it("should create employee", async () => {
        // Act
        await PUT("/employees", { name: fixture.manager.name });

        // Assert
        const createdEmployee = await employees.findOneByName(fixture.manager.name);
        strict.ok(createdEmployee);
    });

    it("should create task", async () => {
        // Arrange
        await employees.save(fixture.manager);

        // Act
        await PUT("/tasks", {
            key: fixture.task.key,
            title: fixture.task.title,
            description: fixture.task.description,
            authorId: fixture.task.author.id
        });

        // Assert
        const createdTask = await tasks.findOneByKey(fixture.task.key);
        strict.ok(createdTask);
    });

    async function PUT(url: string, body: any) {
        await fetch(`http://localhost:${appPort}${url}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    }
});