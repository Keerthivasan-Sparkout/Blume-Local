import { Module } from "@nestjs/common";
import { ProductController } from "./controller/product.controller";
import { ProductServices } from "./service/product.service";
import { PrismaModule } from "src/common/prisma/prisma.module";

@Module({
    imports:[PrismaModule],
    controllers: [ProductController],
    providers: [ProductServices]
})
export class ProductModule { }