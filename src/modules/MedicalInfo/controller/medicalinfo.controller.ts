import { Body, Controller, Param, Patch, Post, Request } from "@nestjs/common";
import { MedicalInfoServices } from "../services/medicalinfo.service";
import { Prisma } from "@prisma/client";
import { ResponseUtil } from "src/common/utils/response.utils";
import { EditAllergeModel } from "../dto/edit.allerges.dto";

@Controller('/medical')
export class MedicalInfoController {

    constructor(private medicalInfoService: MedicalInfoServices) { }

    // @Post("/:sub")
    // async addMediaclInfo(@Param('sub') sub:string,@Body() medical:any){
    //     return await this.medicalInfoService.addMedicalInfo(medical,sub)
    // }


    @Patch("/medicalinfo/:sub")
    async addMedicalInfo(@Body() data: any, @Param('sub') sub: string) {
        const result = await this.medicalInfoService.addMedicalInfo(data, sub)
        return ResponseUtil.success("Updated Medical Info", result)
    }

    @Patch("/alerge/:sub")
    async addAlerge(@Body() data: { id?: number, name: string, description: string }, @Param('sub') sub: string) {
        const result = await this.medicalInfoService.addAlerges(data, sub)
        return ResponseUtil.success("Allerges Added Successfully", result)

    }

    @Patch("/medicalcondition/:sub")
    async addMedicalCondition(@Body() data: any, @Param('sub') sub: string) {
        const result = await this.medicalInfoService.addMediclaCondition(data, sub)
        return ResponseUtil.success("Updated Medical Conditions", result)

    }

    @Patch("/currentmedican/:sub")
    async addCurrentMedicans(@Body() data: any, @Param('sub') sub: string) {
        const result = await this.medicalInfoService.addCurrentMedican(data, sub)
        return ResponseUtil.success("Updated Current Medical Info", result)
    }

    @Patch("/editAllerge/:sub")
    async editAllerges(@Body() data: EditAllergeModel, @Param('sub') sub: string) {
        const result = await this.medicalInfoService.editAllerges(sub, data)
        return ResponseUtil.success("Updated Current Medical Info", result)
    }

    @Patch("/deleteAllerge/:sub")
    async deleteAllerges(@Body() data: EditAllergeModel, @Param('sub') sub: string) {
        const result = await this.medicalInfoService.deleteAllerge(sub, data)
        return ResponseUtil.success("Updated Current Medical Info", result)
    }
}