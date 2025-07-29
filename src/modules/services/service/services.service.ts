import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class ServicesService{

    constructor(private prisma:PrismaService){ }

    async createServices(data:Prisma.ServicesCreateInput){
        const getService=await this.prisma.services.findUnique({where:{name:data.name}})
        if(getService){
            return getService;
        }
        return await this.prisma.services.create({data})
    }

    async getServices(name:string){
        await this.prisma.services.findUnique({where:{name}})
    }

    async updateService(data:Prisma.ServicesUpdateInput,name:string){
         const getService=await this.prisma.services.findUnique({where:{name}})
        if(!getService){
            throw new UnauthorizedException("Service not found")
        }
       return await this.prisma.services.update({where:{id:getService.id},data})
    }

    async deleteService(name:string){
         const getService=await this.prisma.services.findUnique({where:{name}})
        if(!getService){
            return "Service not found"
        }
       return await this.prisma.services.delete({where:{id:getService.id}})
    }

}