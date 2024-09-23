import { NestFactory, Reflector } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "../common/controller/middleware";
import { CreateTaskUseCase } from "../task/use-case";
import { TaskModel } from "../task/model";
import { TypeormTaskRepository } from "../task/repository/typeorm";
import { TypeormEmployeeRepository } from "../employee/repository/typeorm";
import { CreateEmployeeUseCase, UpdateEmployeeUseCase } from "../employee/use-case";
import { EmployeeModel } from "../employee/model";
import { migrate } from "./migrate";
import { MainModule } from "./MainModule";
import { EmployeeModule } from "../employee/controller";
import { TaskModule } from "../task/controller";
import { AuthModule } from "../auth/controller";
import { GlobalAuthGuard } from "../auth/controller/middleware";
import cookieParser from "cookie-parser";
import { AuthClient } from "@gsoft/auth";

export async function main() {
    const db = await migrate();

    const employees = new TypeormEmployeeRepository(
        db.getRepository(EmployeeModel)
    );
    const tasks = new TypeormTaskRepository(
        db.getRepository(TaskModel)
    );

    AuthModule.authClient = AuthClient.create({
        url: process.env.GSOFT_AUTH_URL!,
        aesKey: process.env.GSOFT_AUTH_AES_KEY!,
        rsaPublicKey: process.env.GSOFT_AUTH_RSA_PUBLIC_KEY!
    });
    EmployeeModule.employees = employees;
    EmployeeModule.createEmployee = new CreateEmployeeUseCase(employees);
    EmployeeModule.updateEmployee = new UpdateEmployeeUseCase(employees);
    TaskModule.createTask = new CreateTaskUseCase(employees, tasks);

    const server = await NestFactory.create(MainModule);
    server.useGlobalFilters(new GlobalExceptionFilter());
    server.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true
    }));

    const reflector = server.get(Reflector);
    server.useGlobalGuards(new GlobalAuthGuard(AuthModule.authClient, reflector));
    server.use(cookieParser());

    const appPort = Number(process.env.APP_PORT) || 8080;
    await server.listen(appPort);
}
