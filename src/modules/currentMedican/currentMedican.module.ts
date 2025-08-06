import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { CurrentMedicanController } from "./controller/currentMedican.Controller";
import { CurrentMedicanServices } from "./service/currentMedican.service";

@Module({
    imports:[PrismaModule],
    controllers:[CurrentMedicanController],
    providers:[CurrentMedicanServices]
})
export class CurrentMedicanModule{}