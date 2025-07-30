import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { OrderController } from "./controller/order.controller";
import { OrderServices } from "./service/order.services";

@Module({
    imports:[PrismaModule],
    controllers:[OrderController],
    providers:[OrderServices]
})
export class OrderModule{}