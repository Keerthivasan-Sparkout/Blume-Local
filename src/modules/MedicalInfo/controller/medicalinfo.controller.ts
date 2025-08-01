import { Body, Controller, Param, Patch, Post, Request } from "@nestjs/common";
import { MedicalInfoServices } from "../services/medicalinfo.service";
import { Prisma } from "@prisma/client";

@Controller('/medical')
export class MedicalInfoController{

    constructor(private medicalInfoService:MedicalInfoServices){}

    // @Post("/:sub")
    // async addMediaclInfo(@Param('sub') sub:string,@Body() medical:any){
    //     return await this.medicalInfoService.addMedicalInfo(medical,sub)
    // }


    @Patch("/medicalinfo/:sub")
    async addMedicalInfo(@Body() data:any,@Param('sub') sub:string){
        return await this.medicalInfoService.addMedicalInfo(data,sub)
    }

     @Patch("/alerge/:sub")
    async addAlerge(@Body() data:{ id?: number, name: string, description: string },@Param('sub') sub:string){
        return await this.medicalInfoService.addAlerges(data,sub)
    }

     @Patch("/medicalcondition/:sub")
    async addMedicalCondition(@Body() data:any,@Param('sub') sub:string){
        return await this.medicalInfoService.addMediclaCondition(data,sub)
    }

     @Patch("/currentmedican/:sub")
    async addCurrentMedicans(@Body() data:any,@Param('sub') sub:string){
        console.log(sub)
        return await this.medicalInfoService.addCurrentMedican(data,sub)
    }
}