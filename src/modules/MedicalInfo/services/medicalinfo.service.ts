import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class MedicalInfoServices{

    constructor(private prisma:PrismaService){}

    async addMedicalInfo(sub,info:Prisma.MedicalInfoCreateInput){
        const getUser=await this.prisma.user.findUnique({where:{sub}})
        if(!getUser){
            return "user not found"
        }
        return await this.prisma.medicalInfo.create({data:{...info,user:{connect:{id:getUser.id}}}})
    }

    async addAlerge(data:{name:string,description:string},sub:string){
        const getUser=await this.prisma.user.findUnique({where:{sub}})
        if(!getUser){
            return "user not found"
        }
        const getMedical=await this.prisma.medicalInfo.findUnique({where:{userId:getUser.id}})
        if(!getMedical){
            return "Fill your medical details"
        }
        const alerge = getMedical.algerge as {id:number,name:string,description:string}[]
        
    }

}