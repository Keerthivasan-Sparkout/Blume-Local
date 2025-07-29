import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { ServicesController } from "./controller/services.controller";
import { ServicesService } from "./service/services.service";

@Module({
    imports:[PrismaModule],
    controllers:[ServicesController],
    providers:[ServicesService]
})
export class ServicesModule{}