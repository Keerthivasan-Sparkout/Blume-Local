import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { AllergesController } from "./controller/allereges.controller";
import { AllergesService } from "./service/allerges.service";

@Module({
    imports:[PrismaModule],
    controllers:[AllergesController],
    providers:[AllergesService]
})
export class AllergesModule{}