import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProgramService } from "../service/program.service";
import { ResponseUtil } from "src/common/utils/response.utils";

@Controller("/program")
export class ProgramController{

    constructor(private programServices:ProgramService){}

    @Post()
    createPrograms(@Body() program:any){
        const result=this.programServices.createPrograms(program)
        return ResponseUtil.success("Program Created successfully ",result)
    }

    @Get("/:name")
    getPrograms(@Param('name') name:string){
        const result=this.programServices.getPrograms(name)
        return ResponseUtil.success("Fetch Program successfully ",result)
    }

     @Patch()
    updatePrograms(@Body() program:any){
        const result=this.programServices.updatePrograms(program,program.name)
        return ResponseUtil.success("Program Updated successfully ",result)
    }

    @Delete("/:name")
    deletePrograms(@Param('name') name:string){
        const result=this.programServices.deleteProgram(name)
        return ResponseUtil.success("Program Deleted successfully ",result)
    }
}