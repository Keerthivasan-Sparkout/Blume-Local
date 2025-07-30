import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { TaskController } from "./controller/task.controller";
import { TaskServices } from "./service/task.service";

@Module({
    imports:[PrismaModule],
    controllers:[TaskController],
    providers:[TaskServices]
})
export class TaskModule{ }