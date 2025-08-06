import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { MedicalConditionController } from "./controller/medicalCondition.controller";
import { MedicalConditionService } from "./service/medicalCondition.service";
import { AuthModules } from "../auth/auth.module";

@Module({
    imports:[PrismaModule],
    controllers:[MedicalConditionController],
    providers:[MedicalConditionService]
})
export class MedicalConditionModule{}