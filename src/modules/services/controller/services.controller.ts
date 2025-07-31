import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ServicesService } from "../service/services.service";
import { CreateServiceDto } from "../dto/create.servuce.dto";
import { ResponseUtil } from "src/common/utils/response.utils";

@Controller("/services")
export class ServicesController {

    constructor(private servicesService: ServicesService) { }

    @Get()
    async getAllServices() {
        const result = await this.servicesService.getAllServices()
        return ResponseUtil.success("Fetch All Service successfully ", result)
    }

    @Post()
    createServices(@Body() data: CreateServiceDto) {
        const result = this.servicesService.createServices(data)
        return ResponseUtil.success("Service Created successfully ", result)
    }

    @Get("/:name")
    getServices(@Param('name') name: string) {
        const result = this.servicesService.getServices(name)
        return ResponseUtil.success("Fetch Service successfully ", result)
    }

    

    @Patch()
    updateServices(@Body() data: CreateServiceDto) {
        const result = this.servicesService.updateService(data, data.name)
        return ResponseUtil.success("Service Updated successfully ", result)
    }

    @Delete("/:name")
    deleteServices(@Param('name') name:string){
        const result = this.servicesService.deleteService(name)
        return ResponseUtil.success("Service Deleted successfully ", result)
    }

}