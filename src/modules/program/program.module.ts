import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { ProgramController } from "./controller/program.controller";
import { ProgramService } from "./service/program.service";

@Module({
    imports:[PrismaModule],
    controllers:[ProgramController],
    providers:[ProgramService]
})
export class ProgramModule{}