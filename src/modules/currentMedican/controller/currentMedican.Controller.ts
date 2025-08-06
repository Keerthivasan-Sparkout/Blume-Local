import { Body, Controller, Get, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { CurrentMedicanServices } from "../service/currentMedican.service";
import { CreateCurrentMedicanDto } from "../dto/create.currentMedican.dto";
import { ResponseUtil } from "src/common/utils/response.utils";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('/current-medican')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CurrentMedicanController{

    constructor(private currentMedicanService:CurrentMedicanServices){}

    @Post()
    async createCurrentMedican(@Body() medican:CreateCurrentMedicanDto,@Request() req){
       const result=await this.currentMedicanService.creatCurrentMedican(req.user.sub,medican) 
       return ResponseUtil.success("Current Medican has Updated", result)
    }

    @Get()
    async fetchCurrentMedican(@Request() req){
         const result=await this.currentMedicanService.fetchCurrentMedican(req.user.sub) 
       return ResponseUtil.success("Current Medican ", result)
    }

    @Patch()
    async DeleteCurrentMedican(@Body() medican:CreateCurrentMedicanDto,@Request() req){
        const result=await this.currentMedicanService.deleteCurrentMedican(req.user.sub,medican) 
       return ResponseUtil.success("Current Medican has Updated", result)
    }
}