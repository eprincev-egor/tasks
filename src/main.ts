import { EmployeeModel } from "./model";
import { NestFactory } from "@nestjs/core";
import { EmployeeModule } from "./controller";
import { CreateEmployeeUseCase } from "./use-case";
import { TypeormEmployeeRepository } from "./repository/typeorm";
import { GlobalExceptionFilter } from "./controller/middleware";
import { ValidationPipe } from "@nestjs/common";
import { migrate } from "./migrate";

export async function main() {
    const db = await migrate();

    const employees = new TypeormEmployeeRepository(
        db.getRepository(EmployeeModel)
    );

    EmployeeModule.createEmployee = new CreateEmployeeUseCase(employees);

    const server = await NestFactory.create(EmployeeModule);
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
