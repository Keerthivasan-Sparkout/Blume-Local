import { Body, Controller, Get, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { MedicalConditionService } from "../service/medicalCondition.service";
import { ResponseUtil } from "src/common/utils/response.utils";
import { createMedicalConditionDto } from "../dto/create.medicalCondition";
import { AuthGuard } from "@nestjs/passport";

@Controller("/medical-condtion")
@UseGuards(AuthGuard('jwt'))
export class MedicalConditionController{

    constructor(private medicalConditionService:MedicalConditionService){}

    @Post()
   async createMedicalCondition(@Body() conditions:createMedicalConditionDto,@Request() req){
        const result = await this.medicalConditionService.createMedicalCondition(req.user.sub,conditions)
        return ResponseUtil.success("Medical Condition as updated",result)
    }

    @Get()
    async fetchMedicalCondition(@Request() req){
        const result = await this.medicalConditionService.fetchMedicalCondition(req.user.sub)
        return ResponseUtil.success("Medical Condition",result)
    }

    @Patch()
    async deleteMedicalCondition(@Body() conditions:createMedicalConditionDto,@Request() req){
        const result=await this.medicalConditionService.deleteMedicalCondition(req.user.sub,conditions)
        return ResponseUtil.success("Medical Condition as updated",result)
    }

}