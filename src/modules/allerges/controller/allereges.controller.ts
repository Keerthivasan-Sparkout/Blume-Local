import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { AllergesService } from "../service/allerges.service";

@Controller("/allerges")
export class AllergesController{

    constructor(private allergesServices:AllergesService){}

    @Post('/:sub')
    createAllerges(@Body() data:any, @Param('sub') sub:string){
        return this.allergesServices.createAllerges(sub,data)
    }

    @Patch('/:sub')
    deleteAllerges(@Body() data:any, @Param('sub') sub:string){
        return this.allergesServices.deleteAllerges(sub,data)
    }
}