import { Body, Controller, Param, Patch, Post, Request } from "@nestjs/common";
import { MedicalInfoServices } from "../services/medicalinfo.service";
import { Prisma } from "@prisma/client";
import { ResponseUtil } from "src/common/utils/response.utils";
import { EditMedicanModel } from "../dto/edit.allerges.dto";

@Controller('/medical')
export class MedicalInfoController {

    constructor(private medicalInfoService: MedicalInfoServices) { }

  
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

    @Patch("/deleteMedican/:sub")
    async deleteCurrentMedican(@Body() data: EditMedicanModel, @Param('sub') sub: string) {
        const result = await this.medicalInfoService.deleteCurrentMedican(sub, data)
        return ResponseUtil.success("Deleted Current Medicans", result)
    }

     @Patch("/editMedican/:sub")
    async EditCurrentMedican(@Body() data: EditMedicanModel, @Param('sub') sub: string) {
        const result = await this.medicalInfoService.editCurrentMedican(sub, data)
        return ResponseUtil.success("Current Medicans Updated", result)
    }
}