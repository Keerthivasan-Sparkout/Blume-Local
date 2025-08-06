import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AllergesService } from "../service/allerges.service";
import { ResponseUtil } from "src/common/utils/response.utils";
import { AuthGuard } from "@nestjs/passport";

@Controller("/allerges")
@UseGuards(AuthGuard('jwt'))
export class AllergesController{

    constructor(private allergesServices:AllergesService){}

    @Post()
    async createAllerges(@Body() data:any, @Request() req){
        const result=await this.allergesServices.createAllerges(req.user.sub,data)
        return ResponseUtil.success("Allerge as updated",result)
    }

    @Get()
    async getAllerges(@Request() req){
        const result= await this.allergesServices.readAllerges(req.user.sub)
        return ResponseUtil.success("Allerges",result)
    }

    @Patch()
    async deleteAllerges(@Body() data:any,@Request() req){
        const result =await this.allergesServices.deleteAllerges(req.user.sub,data)
        return ResponseUtil.success("Allereg has deleted",result)
    }
}