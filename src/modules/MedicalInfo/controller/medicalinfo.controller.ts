import { Body, Controller, Post, Request } from "@nestjs/common";
import { CreateMedicalInfoDto } from "../dto/create.medicalinfo.dto";
import { MedicalInfoServices } from "../services/medicalinfo.service";
import { Prisma } from "@prisma/client";

@Controller('/medical')
export class MedicalInfoController{

    constructor(private medicalInfoService:MedicalInfoServices){}

    @Post()
    async addMediaclInfo(@Request() req,@Body() medical:any){
        return await this.medicalInfoService.addMedicalInfo(req.user.sub,medical)
    }
}