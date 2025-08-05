import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { InvoiceController } from "./controller/invoice.controller";
import { InvoiceService } from "./service/invoice.service";

@Module({
    imports:[PrismaModule],
    controllers:[InvoiceController],
    providers:[InvoiceService]
})
export class InvoiceModule{}