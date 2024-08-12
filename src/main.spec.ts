import { configDotenv } from "dotenv";
import {Client} from "pg";
import { migrate } from "./migrate";
import { main } from "./main";
import { TypeormEmployeeRepository } from "./repository/typeorm";
import { strict } from "assert";
import { DataSource } from "typeorm";
import { EmployeeModel } from "./model";

describe("integration tests", () => {

    let pg: Client;
    let orm: DataSource;
    let appPort: number;
    let employees: TypeormEmployeeRepository;
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