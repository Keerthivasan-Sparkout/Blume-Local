import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { MedicalInfoController } from "./controller/medicalinfo.controller";
import { MedicalInfoServices } from "./services/medicalinfo.service";

@Module({
    imports:[PrismaModule],
    controllers:[MedicalInfoController],
    providers:[MedicalInfoServices]
})
export class MedicalInfoModule{}