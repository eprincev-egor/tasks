import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "../common/controller/middleware";
import { CreateTaskUseCase } from "../task/use-case";
import { TaskModel } from "../task/model";
import { TypeormTaskRepository } from "../task/repository/typeorm";
import { TypeormEmployeeRepository } from "../employee/repository/typeorm";
import { CreateEmployeeUseCase } from "../employee/use-case";
import { EmployeeModel } from "../employee/model";
import { migrate } from "./migrate";
import { MainModule } from "./MainModule";
import { EmployeeModule } from "../employee/controller";
import { TaskModule } from "../task/controller";

export async function main() {
    const db = await migrate();

    const employees = new TypeormEmployeeRepository(
        db.getRepository(EmployeeModel)
    );
    const tasks = new TypeormTaskRepository(
        db.getRepository(TaskModel)
    );

    EmployeeModule.createEmployee = new CreateEmployeeUseCase(employees);
    TaskModule.createTask = new CreateTaskUseCase(employees, tasks);

    const server = await NestFactory.create(MainModule);
    server.useGlobalFilters(new GlobalExceptionFilter());
    server.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true
    }));

    const appPort = Number(process.env.APP_PORT) || 8080;
    await server.listen(appPort);
}
