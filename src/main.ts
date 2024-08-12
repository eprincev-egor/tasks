import { EmployeeModel, TaskModel } from "./model";
import { NestFactory } from "@nestjs/core";
import { TaskModule } from "./controller";
import { CreateEmployeeUseCase, CreateTaskUseCase } from "./use-case";
import { TypeormEmployeeRepository, TypeormTaskRepository } from "./repository/typeorm";
import { GlobalExceptionFilter } from "./controller/middleware";
import { ValidationPipe } from "@nestjs/common";
import { migrate } from "./migrate";

export async function main() {
    const db = await migrate();

    const employees = new TypeormEmployeeRepository(
        db.getRepository(EmployeeModel)
    );
    const tasks = new TypeormTaskRepository(
        db.getRepository(TaskModel)
    );

    TaskModule.createEmployee = new CreateEmployeeUseCase(employees);
    TaskModule.createTask = new CreateTaskUseCase(employees, tasks);

    const server = await NestFactory.create(TaskModule);
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
