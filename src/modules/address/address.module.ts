import { Module } from "@nestjs/common";
import { AddressController } from "./controller/address.controller.dto";
import { AdddressServices } from "./service/address.services";
import { PrismaModule } from "src/common/prisma/prisma.module";

@Module({
    imports:[PrismaModule],
    controllers:[AddressController],
    providers:[AdddressServices]
})
export class AddressModule{}